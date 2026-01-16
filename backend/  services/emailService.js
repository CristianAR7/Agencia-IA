// ============================================
// SERVICIO DE EMAIL - Notificaciones Automáticas
// ============================================

const nodemailer = require('nodemailer');

// Configurar transporter (usa tu email)
const transporter = nodemailer.createTransport({
    service: 'gmail', // O tu proveedor
    auth: {
        user: process.env.EMAIL_USER, // Tu email
        pass: process.env.EMAIL_PASSWORD // App password de Gmail
    }
});

// Email a TI cuando alguien completa el formulario
async function notifyNewLead(clientData, analysis) {
    const emailContent = `
🎉 NUEVO LEAD - AI Solution Generator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 INFORMACIÓN DEL CLIENTE:

Negocio: ${clientData.businessName}
Industria: ${clientData.industry}
Email: ${clientData.email}

Soluciones solicitadas:
${clientData.solutionTypes.map(s => `  • ${s}`).join('\n')}

Objetivos:
${clientData.goals.map(g => `  • ${g}`).join('\n')}

Volumen esperado: ${clientData.volume}
Presupuesto: ${clientData.budget}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 PROPUESTA GENERADA:

Setup Fee: €${analysis.estimatedCost.setup}
Mensual: €${analysis.estimatedCost.monthly}
Tiempo: ${analysis.estimatedTime}

Stack: ${analysis.techStack}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 INFO ADICIONAL:
${clientData.additionalInfo || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ PRÓXIMOS PASOS:
1. Contactar al cliente en menos de 1 hora
2. Confirmar interés y responder dudas
3. Enviar propuesta formal
4. Agendar demo si es necesario

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `🎯 Nuevo Lead: ${clientData.businessName} - €${analysis.estimatedCost.setup}`,
        text: emailContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado a admin');
        return true;
    } catch (error) {
        console.error('❌ Error enviando email a admin:', error);
        return false;
    }
}

// Email al CLIENTE con su propuesta
async function sendProposalToClient(clientData, analysis) {
    const emailContent = `
Hola ${clientData.businessName}!

Gracias por tu interés en automatizar tu negocio con IA.

He analizado tus necesidades y aquí está tu propuesta personalizada:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 TU SOLUCIÓN PERSONALIZADA

Soluciones incluidas:
${clientData.solutionTypes.map(s => `  ✓ ${s.replace('-', ' ').toUpperCase()}`).join('\n')}

Stack Tecnológico:
${analysis.techStack}

Tiempo de Implementación: ${analysis.estimatedTime}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 INVERSIÓN

Setup (Pago Único): €${analysis.estimatedCost.setup}
  ✓ Desarrollo completo
  ✓ Configuración de APIs
  ✓ Training del equipo
  ✓ 30 días de soporte

Operación Mensual: €${analysis.estimatedCost.monthly}
  ✓ Hosting y mantenimiento
  ✓ Costos de APIs
  ✓ Actualizaciones
  ✓ Soporte técnico

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ PRÓXIMOS PASOS

1. Responde este email para confirmar tu interés
2. Agendamos una demo de 20 minutos
3. Respondemos todas tus dudas
4. Comenzamos la implementación

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿Listo para automatizar tu ${clientData.industry} con IA?

Responde este email o contáctame directamente.

Saludos,
[Tu Nombre]
[Tu Agencia]
${process.env.ADMIN_EMAIL}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PD: Este email es válido por 30 días. Los precios y disponibilidad pueden cambiar.
`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: clientData.email,
        subject: `Tu Propuesta de IA para ${clientData.businessName} - €${analysis.estimatedCost.setup}`,
        text: emailContent,
        replyTo: process.env.ADMIN_EMAIL
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado a cliente:', clientData.email);
        return true;
    } catch (error) {
        console.error('❌ Error enviando email a cliente:', error);
        return false;
    }
}

// Webhook notification (Slack, Discord, etc.) - OPCIONAL
async function sendWebhookNotification(clientData, analysis) {
    if (!process.env.WEBHOOK_URL) return;

    const payload = {
        text: `🎯 Nuevo Lead: ${clientData.businessName}`,
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*Nuevo Lead - ${clientData.businessName}*\n\n💰 Setup: €${analysis.estimatedCost.setup}\n📧 ${clientData.email}\n🏭 ${clientData.industry}`
                }
            }
        ]
    };

    try {
        const fetch = (await import('node-fetch')).default;
        await fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        console.log('✅ Webhook enviado');
    } catch (error) {
        console.error('❌ Error enviando webhook:', error);
    }
}

module.exports = {
    notifyNewLead,
    sendProposalToClient,
    sendWebhookNotification
};
