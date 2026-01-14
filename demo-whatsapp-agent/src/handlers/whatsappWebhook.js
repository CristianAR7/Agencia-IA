const twilio = require('twilio');
const aiEngine = require('../ai/engine');
const contextManager = require('../ai/contextManager');
const actionsHandler = require('../handlers/actionsHandler');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function handleWhatsAppMessage(req, res) {
    try {
        const incomingMessage = req.body.Body;
        const from = req.body.From;
        const senderName = req.body.ProfileName || 'Usuario';

        console.log(`📩 Mensaje de ${senderName}: ${incomingMessage}`);

        // Obtener contexto de la conversación
        const context = await contextManager.getContext(from);

        // Procesar con IA
        const aiResponse = await aiEngine.processMessage({
            message: incomingMessage,
            from: from,
            senderName: senderName,
            context: context
        });

        // Ejecutar acciones si es necesario
        if (aiResponse.actions && aiResponse.actions.length > 0) {
            await actionsHandler.execute(aiResponse.actions, { from, senderName });
        }

        // Actualizar contexto
        await contextManager.updateContext(from, {
            lastMessage: incomingMessage,
            lastResponse: aiResponse.text,
            timestamp: new Date()
        });

        // Enviar respuesta por WhatsApp
        await client.messages.create({
            body: aiResponse.text,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: from
        });

        console.log(`✅ Respuesta enviada a ${senderName}`);

        res.status(200).send('OK');

    } catch (error) {
        console.error('❌ Error processing WhatsApp message:', error);
        res.status(500).send('Error');
    }
}

module.exports = handleWhatsAppMessage;
