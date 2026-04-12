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
        max_tokens: 4000,
        messages: [{
            role: 'user',
            content: `Eres experto en WhatsApp Business API. Genera configuración para:
${JSON.stringify(profile, null, 2)}

Responde ÚNICAMENTE con JSON válido, sin texto antes ni después, sin markdown, sin bloques de código.
{
  "agent_name": "Asistente de [NombreNegocio]",
  "personality": "máximo 100 palabras: tono, estilo, cómo se presenta",
  "system_prompt": "máximo 200 palabras: rol, servicios clave, cómo responder, cuándo derivar a humano",
  "welcome_message": "mensaje de bienvenida breve (1-2 frases)",
  "quick_replies": [
    {"id": "1", "title": "Pedir cita", "payload": "CITA"},
    {"id": "2", "title": "Ver servicios", "payload": "SERVICIOS"},
    {"id": "3", "title": "Precios", "payload": "PRECIOS"},
    {"id": "4", "title": "Hablar con persona", "payload": "HUMANO"}
  ],
  "flows": {
    "appointment": ["paso 1", "paso 2", "paso 3"],
    "faq": {"pregunta clave": "respuesta breve"},
    "escalation_triggers": ["trigger 1", "trigger 2"]
  },
  "twilio_setup": {
    "webhook_url_format": "https://TU_DOMINIO/webhooks/whatsapp",
    "required_env_vars": ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_WHATSAPP_NUMBER", "ANTHROPIC_API_KEY"],
    "deployment_steps": ["paso 1", "paso 2", "paso 3"]
  }
}`
        }]
    });
    const text = msg.content[0].text;
    console.log('[agents] RAW LENGTH:', text.length);
    console.log('[agents] PARSE RESULT:', safeParseJSON(text) ? 'OK' : 'FAIL');
    const result = safeParseJSON(text);
    if (!result) throw new Error('WhatsApp: respuesta JSON no válida de Claude');
    return result;
}

async function generateChatbot(profile) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
        model: process.env.AI_MODEL || 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{
            role: 'user',
            content: `Eres experto en chatbots web embebibles. Genera configuración para:
${JSON.stringify(profile, null, 2)}

Responde ÚNICAMENTE con JSON válido, sin texto antes ni después, sin markdown, sin bloques de código.
{
  "agent_name": "nombre del bot",
  "avatar_emoji": "emoji representativo",
  "color_primary": "#2563eb",
  "color_secondary": "#1e40af",
  "system_prompt": "máximo 200 palabras: rol, servicios clave, cómo responder, límites",
  "welcome_message": "mensaje inicial breve (1-2 frases)",
  "suggested_questions": ["pregunta 1", "pregunta 2", "pregunta 3", "pregunta 4"],
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
        max_tokens: 4000,
        messages: [{
            role: 'user',
            content: `Eres experto en agentes de voz con IA. Genera configuración para:
${JSON.stringify(profile, null, 2)}

Responde ÚNICAMENTE con JSON válido, sin texto antes ni después, sin markdown, sin bloques de código.
{
  "agent_name": "nombre del agente de voz",
  "voice_description": "descripción breve de la voz: género, tono, acento",
  "elevenlabs_voice": "Rachel",
  "personality": "máximo 100 palabras: cómo habla, tono, estilo",
  "system_prompt": "máximo 200 palabras: rol, servicios clave, cómo manejar silencios e interrupciones, cuándo transferir",
  "greeting_script": "script breve al contestar (1-2 frases)",
  "call_flows": {
    "main": "menú principal hablado (2-3 frases)",
    "appointment": "pasos para reservar cita (3 pasos breves)",
    "info": "cómo dar información de servicios (2-3 frases)",
    "transfer": "script para transferir a humano (1-2 frases)"
  },
  "vapi_config": {
    "model": "claude-sonnet-4-6",
    "voice_provider": "elevenlabs",
    "first_message": "primer mensaje al contestar (máx 2 frases)",
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
