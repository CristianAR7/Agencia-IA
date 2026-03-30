const Anthropic = require('@anthropic-ai/sdk');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const AVAILABLE_SKILLS = [
    { name: 'marketingskills/page-cro',          category: 'marketing',  desc: 'Optimización de conversión (CRO) de páginas web' },
    { name: 'marketingskills/seo-audit',          category: 'marketing',  desc: 'Auditoría SEO completa' },
    { name: 'marketingskills/content-strategy',   category: 'marketing',  desc: 'Estrategia de contenido' },
    { name: 'marketingskills/competitor-alternatives', category: 'marketing', desc: 'Análisis de competidores y alternativas' },
    { name: 'marketingskills/cold-email',         category: 'marketing',  desc: 'Secuencias de cold email' },
    { name: 'marketingskills/copywriting',        category: 'marketing',  desc: 'Copywriting persuasivo' },
    { name: 'marketingskills/pricing-strategy',   category: 'marketing',  desc: 'Estrategia de precios' },
    { name: 'ui-ux-pro-max',                      category: 'diseño',     desc: 'Base de datos de estilos UI, paletas de colores, tipografías, componentes' },
    { name: 'superclaude',                        category: 'agentes',    desc: '30 comandos especializados + 20 agentes para desarrollo de software' },
    { name: 'agency-agents',                      category: 'agentes',    desc: '156 agentes especializados para diferentes tareas de agencia' },
    { name: 'claude-banana',                      category: 'imágenes',   desc: 'Prompts optimizados para generación de imágenes con IA' },
];

const SYSTEM = `Eres el asistente de trabajo de Cristian Alcaina, fundador de CRIAL Solutions (crial.solutions).

QUIÉN ERES:
- Asistente estratégico de una agencia de IA española
- Conoces en detalle todos los proyectos activos de Cristian
- Eres directo, técnico y orientado a resultados
- Idioma por defecto: español

PROYECTOS ACTIVOS DE CRISTIAN:
1. **Agencia IA / CRIAL Solutions** — Agencia que implementa agentes de WhatsApp, voz y chatbots para negocios B2B españoles. Stack: Node.js/Express + PostgreSQL (Railway). Precios: €800-6,000 setup + €150-1,200/mes recurrente.
2. **Dronebook** — Marketplace de pilotos de drones para fotografía aérea. Stack: Python/Flask + PostgreSQL (Supabase). Monetización: comisión 15% vía Stripe Connect.
3. **ArrozConMiso** — Guía de viaje a Japón. HTML estático.

TUS CAPACIDADES:
- Analizar negocios y redactar propuestas comerciales
- Revisar y mejorar copy de ventas y cold emails
- Evaluar estrategias de marketing (CRO, SEO, contenido)
- Ayudar a priorizar el pipeline de clientes
- Generar scripts para agentes WhatsApp/Voz
- Redactar emails de seguimiento y cierre
- Responder preguntas técnicas sobre el stack

ESTILO:
- Respuestas concisas y estructuradas
- Usa listas cuando son más claras que párrafos
- Sé específico: da ejemplos concretos, precios reales, plazos realistas
- Si te piden algo largo (propuesta, email), dalo completo sin truncar

SKILLS DISPONIBLES EN TU ENTORNO LOCAL:
Cuando el usuario pregunte qué skill usar para una tarea, recomiéndale la más apropiada de esta lista.
Formato de recomendación: "Te recomiendo usar \`[nombre]\` ([categoría]) — [descripción]. Para usarla: /[nombre] en tu terminal con Claude Code."
${AVAILABLE_SKILLS.map(s => `- \`${s.name}\` (${s.category}): ${s.desc}`).join('\n')}

Si ninguna skill local aplica, sugiere buscar en https://skills.sh o https://github.com/VoltAgent/awesome-agent-skills`;

async function sendMessage(sessionId, userMessage) {
    if (!sessionId) sessionId = uuidv4();

    const history = await db.getConversation(sessionId);

    const messages = [
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage }
    ];

    const response = await anthropic.messages.create({
        model: process.env.AI_MODEL || 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: SYSTEM,
        messages
    });

    const reply = response.content[0].text;

    await db.saveMessage(sessionId, 'user', userMessage);
    await db.saveMessage(sessionId, 'assistant', reply);

    return { sessionId, reply, usage: response.usage };
}

async function getHistory(sessionId) {
    return db.getConversation(sessionId);
}

async function getSessions() {
    return db.getSessions();
}

module.exports = { sendMessage, getHistory, getSessions, newSession: () => uuidv4() };
