const nodemailer  = require('nodemailer');
const Anthropic   = require('@anthropic-ai/sdk');

// ── Transporter ───────────────────────────────────────────────────────────────

function getTransporter() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD)
        throw new Error('EMAIL_USER y EMAIL_PASSWORD no configurados');

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
}

// ── Draft generation ──────────────────────────────────────────────────────────

async function generateDraft({ businessName, sector, painPoints, solution, recipientName }) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const prompt = `Eres un consultor de ventas de CRIAL Solutions, agencia de IA española.
Escribe un email de cold outreach profesional en español para el siguiente negocio.

Negocio: ${businessName}
Sector: ${sector || 'no especificado'}
Problemas detectados: ${painPoints || 'no especificados'}
Solución propuesta: ${solution || 'implementación de agentes IA'}
${recipientName ? `Nombre contacto: ${recipientName}` : ''}

Requisitos:
- Máximo 150 palabras en el cuerpo
- Tono profesional pero cercano, no agresivo ni spam
- Menciona un problema concreto del sector y cómo CRIAL lo resuelve
- Incluye una llamada a la acción clara (llamada de 15 min o demo)
- Firma como: Cristian Alcaina — CRIAL Solutions | crial.solutions

Devuelve ÚNICAMENTE un objeto JSON con esta estructura exacta, sin texto extra:
{
  "subject": "asunto del email (max 60 chars)",
  "body": "cuerpo completo del email listo para enviar"
}`;

    const msg = await anthropic.messages.create({
        model: process.env.AI_MODEL || 'claude-sonnet-4-6',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }]
    });

    const text = msg.content[0].text.trim();

    // Parse JSON (same safeParseJSON pattern)
    try { return JSON.parse(text); } catch {}
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
        try { return JSON.parse(match[0]); } catch {}
    }

    // Fallback if JSON parse fails
    return {
        subject: `Cómo la IA puede ayudar a ${businessName}`,
        body: text
    };
}

// ── Send email ────────────────────────────────────────────────────────────────

async function sendEmail({ to, subject, body, replyTo }) {
    if (!to)      throw new Error('Destinatario (to) es obligatorio');
    if (!subject) throw new Error('Asunto es obligatorio');
    if (!body)    throw new Error('Cuerpo del email es obligatorio');

    const transporter = getTransporter();
    const from = `CRIAL Solutions <${process.env.EMAIL_USER}>`;

    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text: body,
        html: body.replace(/\n/g, '<br>'),
        ...(replyTo && { replyTo })
    });

    return { success: true, messageId: info.messageId, to };
}

module.exports = { generateDraft, sendEmail };
