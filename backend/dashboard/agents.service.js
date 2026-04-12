const Anthropic = require('@anthropic-ai/sdk');
const archiver = require('archiver');

function safeParseJSON(raw) {
  // 1. Limpiar markdown code blocks
  let text = raw
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/gi, '')
    .trim();

  // 2. Intentar parseo directo
  try { return JSON.parse(text); } catch {}

  // 3. Extraer bloque JSON con regex
  const match = text.match(/\{[\s\S]*\}/);
  if (match) { try { return JSON.parse(match[0]); } catch {} }

  // 4. Limpiar caracteres problemáticos
  try {
    const cleaned = text
      .replace(/[\x00-\x1F\x7F]/g, ' ')
      .replace(/,\s*([}\]])/g, '$1')
      .match(/\{[\s\S]*\}/)?.[0];
    if (cleaned) return JSON.parse(cleaned);
  } catch {}

  return null;
}

async function generateWhatsApp(profile) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
        model: process.env.AI_MODEL || 'claude-sonnet-4-6',
        max_tokens: 3000,
        messages: [{
            role: 'user',
            content: `Eres experto en WhatsApp Business API. Genera configuración completa para:
${JSON.stringify(profile, null, 2)}

Responde ÚNICAMENTE con JSON válido, sin texto antes ni después, sin markdown, sin bloques de código.
Estructura exacta:
{
  "agent_name": "nombre del agente (ej: Asistente de NombreNegocio)",
  "personality": "descripción de personalidad, tono y estilo comunicativo",
  "system_prompt": "prompt COMPLETO de sistema para Claude (mínimo 300 palabras): incluye rol, servicios del negocio, cómo responder, qué NO decir, cómo calificar leads, cuándo derivar a humano",
  "welcome_message": "mensaje de bienvenida exacto al iniciar conversación",
  "quick_replies": [
    {"id": "1", "title": "Pedir cita", "payload": "CITA"},
    {"id": "2", "title": "Ver servicios", "payload": "SERVICIOS"},
    {"id": "3", "title": "Precios", "payload": "PRECIOS"},
    {"id": "4", "title": "Hablar con persona", "payload": "HUMANO"}
  ],
  "flows": {
    "appointment": ["Paso 1: preguntar nombre", "Paso 2: fecha y hora", "Paso 3: confirmar"],
    "faq": { "pregunta frecuente 1": "respuesta", "pregunta frecuente 2": "respuesta" },
    "escalation_triggers": ["cuando el cliente está molesto", "cuando pide hablar con responsable"]
  },
  "twilio_setup": {
    "webhook_url_format": "https://TU_DOMINIO/webhooks/whatsapp",
    "required_env_vars": ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_NUMBER", "ANTHROPIC_API_KEY"],
    "deployment_steps": ["Paso 1", "Paso 2", "Paso 3"]
  }
}`
        }]
    });
    const text = msg.content[0].text;
    console.log('[agents] RAW RESPONSE:', text.substring(0, 500));
    const result = safeParseJSON(text);
    if (!result) throw new Error('WhatsApp: respuesta JSON no válida de Claude');
    return result;
}

async function generateChatbot(profile) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
        model: process.env.AI_MODEL || 'claude-sonnet-4-6',
        max_tokens: 3500,
        messages: [{
            role: 'user',
            content: `Eres experto en chatbots web embebibles. Genera configuración completa para:
${JSON.stringify(profile, null, 2)}

Responde ÚNICAMENTE con JSON válido, sin texto antes ni después, sin markdown, sin bloques de código.
Estructura exacta:
{
  "agent_name": "nombre del bot",
  "avatar_emoji": "emoji representativo",
  "color_primary": "#2563eb",
  "color_secondary": "#1e40af",
  "system_prompt": "prompt COMPLETO de sistema para Claude (mínimo 300 palabras)",
  "welcome_message": "mensaje inicial al abrir el chat",
  "suggested_questions": ["pregunta 1", "pregunta 2", "pregunta 3", "pregunta 4"],
  "embed_snippet": "<!-- WIDGET CRIAL CHATBOT -->\\n<div id=\\"crial-chat-widget\\"></div>\\n<script>\\n(function() {\\n  const config = {\\n    businessName: \\"NombreNegocio\\",\\n    agentName: \\"NombreBot\\",\\n    primaryColor: \\"#2563eb\\",\\n    apiEndpoint: \\"https://TU_BACKEND/api/widget-chat\\",\\n    welcomeMessage: \\"Hola, ¿en qué puedo ayudarte?\\"\\n  };\\n  const btn = document.createElement(\\'button\\');\\n  btn.id = \\'crial-open\\';\\n  btn.style.cssText = \\'position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:\\' + config.primaryColor + \\';border:none;cursor:pointer;z-index:9999;font-size:24px;color:white;box-shadow:0 4px 16px rgba(0,0,0,0.3)\\';\\n  btn.innerHTML = \\'💬\\';\\n  document.body.appendChild(btn);\\n  // Full widget implementation at /dashboard/assets/widget.js\\n})();\\n</script>",
  "backend_endpoint": "/api/widget-chat",
  "rate_limit": "20 req/hora por IP"
}`
        }]
    });
    const result = safeParseJSON(msg.content[0].text);
    if (!result) throw new Error('Chatbot: respuesta JSON no válida de Claude');
    return result;
}

async function generateVoice(profile) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
        model: process.env.AI_MODEL || 'claude-sonnet-4-6',
        max_tokens: 3000,
        messages: [{
            role: 'user',
            content: `Eres experto en agentes de voz con IA. Genera configuración completa para:
${JSON.stringify(profile, null, 2)}

Responde ÚNICAMENTE con JSON válido, sin texto antes ni después, sin markdown, sin bloques de código.
Estructura exacta:
{
  "agent_name": "nombre del agente de voz",
  "voice_description": "descripción de la voz ideal: género, tono, velocidad, acento",
  "elevenlabs_voice": "nombre de voz ElevenLabs recomendada (Rachel / Antoni / Bella / Josh / Arnold)",
  "personality": "descripción de cómo habla: formal/informal, empático, eficiente",
  "system_prompt": "prompt COMPLETO de sistema para el agente de voz (mínimo 300 palabras): incluye cómo manejar silencios, interrupciones, confirmaciones, transferencias",
  "greeting_script": "script exacto al contestar la llamada",
  "call_flows": {
    "main": "script del menú principal hablado",
    "appointment": "script para reservar cita paso a paso",
    "info": "script para dar información de servicios",
    "transfer": "script para transferir a persona humana"
  },
  "vapi_config": {
    "model": "claude-sonnet-4-6",
    "voice_provider": "elevenlabs",
    "first_message": "primer mensaje al contestar (corto, máx 2 frases)",
    "end_call_phrases": ["hasta luego", "gracias por llamar", "que tenga un buen día"],
    "max_duration_seconds": 600,
    "background_sound": "office"
  },
  "deployment_steps": ["Paso 1: crear cuenta en Vapi.ai", "Paso 2: configurar asistente", "Paso 3: conectar número de teléfono"]
}`
        }]
    });
    const result = safeParseJSON(msg.content[0].text);
    if (!result) throw new Error('Voz: respuesta JSON no válida de Claude');
    return result;
}

async function generateAll(profile) {
    const [whatsapp, chatbot, voice] = await Promise.all([
        generateWhatsApp(profile),
        generateChatbot(profile),
        generateVoice(profile)
    ]);
    return { whatsapp, chatbot, voice };
}

function buildZip(businessName, configs) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        const zip = archiver('zip', { zlib: { level: 9 } });
        zip.on('data', c => chunks.push(c));
        zip.on('end', () => resolve(Buffer.concat(chunks)));
        zip.on('error', reject);

        const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // WhatsApp
        zip.append(JSON.stringify(configs.whatsapp, null, 2), { name: `${slug}/whatsapp/config.json` });
        zip.append(buildWhatsAppMd(configs.whatsapp), { name: `${slug}/whatsapp/README.md` });

        // Chatbot
        zip.append(JSON.stringify(configs.chatbot, null, 2), { name: `${slug}/chatbot/config.json` });
        zip.append(configs.chatbot?.embed_snippet || '<!-- embed snippet -->', { name: `${slug}/chatbot/widget-embed.html` });
        zip.append(buildChatbotMd(configs.chatbot), { name: `${slug}/chatbot/README.md` });

        // Voice
        zip.append(JSON.stringify(configs.voice, null, 2), { name: `${slug}/voice/config.json` });
        zip.append(buildVoiceMd(configs.voice), { name: `${slug}/voice/README.md` });

        // Master README
        zip.append(buildMasterMd(businessName, configs), { name: `${slug}/README.md` });

        zip.finalize();
    });
}

function buildMasterMd(businessName, c) {
    return `# Agentes IA — ${businessName}
Generado por CRIAL Solutions (crial.solutions)

## Contenido
- \`whatsapp/\` — Agente WhatsApp (${c.whatsapp?.agent_name || ''})
- \`chatbot/\` — Chatbot Web embebible (${c.chatbot?.agent_name || ''})
- \`voice/\` — Agente de Voz (${c.voice?.agent_name || ''})

## Siguiente paso
Contacta con CRIAL Solutions para el despliegue completo.
`;
}

function buildWhatsAppMd(c) {
    if (!c) return '# WhatsApp Agent\nConfig not available';
    return `# Agente WhatsApp — ${c.agent_name}

## Personalidad
${c.personality}

## Variables de entorno requeridas
${(c.twilio_setup?.required_env_vars || []).map(v => `\`${v}\``).join('\n')}

## Webhook URL
${c.twilio_setup?.webhook_url_format || 'https://TU_DOMINIO/webhooks/whatsapp'}

## Pasos de despliegue
${(c.twilio_setup?.deployment_steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}
`;
}

function buildChatbotMd(c) {
    if (!c) return '# Chatbot Web\nConfig not available';
    return `# Chatbot Web — ${c.agent_name}

## Integración
Copia \`widget-embed.html\` y pégalo antes de \`</body>\` en la web del cliente.

## Variables de entorno
\`ANTHROPIC_API_KEY\` — para el endpoint backend /api/widget-chat

## Límite de uso
${c.rate_limit || '20 req/hora por IP'}
`;
}

function buildVoiceMd(c) {
    if (!c) return '# Voice Agent\nConfig not available';
    return `# Agente de Voz — ${c.agent_name}

## Voz recomendada
${c.elevenlabs_voice} — ${c.voice_description}

## Script de bienvenida
"${c.greeting_script}"

## Pasos de despliegue
${(c.deployment_steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}
`;
}

module.exports = { generateAll, buildZip };
