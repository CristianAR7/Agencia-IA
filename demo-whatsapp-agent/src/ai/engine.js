const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const BUSINESS_CONTEXT = `
Eres un asistente de IA para Clínica Dental Sonrisa.
Industria: salud
Personalidad: profesional, empático y eficiente
Idioma: español

Tu trabajo es ayudar a los clientes de manera eficiente, responder sus preguntas,
agendar citas,
calificar leads,
dar soporte al cliente,
y proporcionar una experiencia excepcional.

Mantén las respuestas concisas y útiles. Si no sabes algo, sé honesto.
`;

async function processMessage({ message, from, senderName, context }) {
    try {
        // Construir historial de conversación
        const conversationHistory = context.history || [];
        
        const messages = [
            {
                role: 'user',
                content: `Contexto: ${BUSINESS_CONTEXT}

Usuario: ${senderName}
Mensaje: ${message}

${conversationHistory.length > 0 ? 'Historial reciente:\n' + conversationHistory.slice(-5).map(h => `- ${h.role}: ${h.content}`).join('\n') : ''}

Responde de manera natural y útil.`
            }
        ];

        const response = await anthropic.messages.create({
            model: process.env.AI_MODEL || 'claude-sonnet-4-5-20250929',
            max_tokens: 1000,
            messages: messages
        });

        const aiText = response.content[0].text;

        // Detectar intenciones y acciones
        const actions = detectActions(aiText, message);

        return {
            text: aiText,
            actions: actions
        };

    } catch (error) {
        console.error('Error in AI processing:', error);
        return {
            text: 'Disculpa, estoy teniendo problemas técnicos. ¿Podrías repetir tu mensaje?',
            actions: []
        };
    }
}

function detectActions(aiResponse, userMessage) {
    const actions = [];
    
    // Detectar si quiere agendar cita
    if (userMessage.toLowerCase().includes('agendar') || 
        userMessage.toLowerCase().includes('cita') ||
        userMessage.toLowerCase().includes('reserva')) {
        actions.push({ type: 'schedule_appointment', data: { message: userMessage } });
    }

    // Detectar si es un lead calificado
    if (userMessage.toLowerCase().includes('precio') || 
        userMessage.toLowerCase().includes('contratar')) {
        actions.push({ type: 'qualify_lead', data: { interest: 'high' } });
    }

    return actions;
}

module.exports = {
    processMessage
};
