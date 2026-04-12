const Anthropic = require('@anthropic-ai/sdk');
const fs        = require('fs');
const path      = require('path');

const DEMOS_DIR = path.join(__dirname, '../dashboard-frontend/demos');

// Ensure demos directory exists
if (!fs.existsSync(DEMOS_DIR)) {
    fs.mkdirSync(DEMOS_DIR, { recursive: true });
}

async function generateDemo({ clientId, businessName, sector, services, targetCustomer, colors, phone, email, website }) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const colorHint = colors
        ? `Colores de marca: ${colors}`
        : `Usa una paleta profesional adaptada al sector "${sector}".`;

    const prompt = `Genera una landing page profesional completa en un único fichero HTML para el siguiente negocio.

Negocio: ${businessName}
Sector: ${sector}
Servicios: ${services || 'no especificados'}
Cliente objetivo: ${targetCustomer || 'no especificado'}
${phone   ? `Teléfono: ${phone}`   : ''}
${email   ? `Email: ${email}`      : ''}
${website ? `Web actual: ${website}` : ''}
${colorHint}

Requisitos OBLIGATORIOS:
- HTML + CSS + JS en un ÚNICO fichero, sin dependencias externas salvo Google Fonts
- Diseño moderno, mobile-first, responsive
- Secciones: Hero con CTA, Servicios (cards), Sobre nosotros, Contacto con formulario
- Formulario de contacto funcional en frontend (muestra mensaje de éxito con JS)
- Animaciones sutiles con CSS (fade-in, hover effects)
- Footer con datos de contacto y año actual
- Sin imágenes externas — usa gradientes CSS para los elementos visuales
- Código limpio, sin comentarios excesivos

Devuelve ÚNICAMENTE el código HTML completo. Sin explicaciones, sin markdown, sin bloques de código. El primer carácter debe ser <!DOCTYPE y el último >.`;

    const msg = await anthropic.messages.create({
        model:      process.env.AI_MODEL || 'claude-sonnet-4-6',
        max_tokens: 8000,
        messages:   [{ role: 'user', content: prompt }]
    });

    let html = msg.content[0].text.trim();

    // Strip markdown code fences if Claude wrapped it
    html = html.replace(/^```(?:html)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

    // Ensure it starts with <!DOCTYPE
    if (!html.toLowerCase().startsWith('<!doctype')) {
        const start = html.search(/<(!DOCTYPE|html)/i);
        if (start > 0) html = html.slice(start);
    }

    // Save to disk
    const filename = `${clientId}.html`;
    const filepath = path.join(DEMOS_DIR, filename);
    fs.writeFileSync(filepath, html, 'utf8');

    return {
        clientId,
        filename,
        url:  `/dashboard/demos/${filename}`,
        size: html.length,
    };
}

function demoExists(clientId) {
    return fs.existsSync(path.join(DEMOS_DIR, `${clientId}.html`));
}

function getDemoHtml(clientId) {
    const filepath = path.join(DEMOS_DIR, `${clientId}.html`);
    if (!fs.existsSync(filepath)) return null;
    return fs.readFileSync(filepath, 'utf8');
}

module.exports = { generateDemo, demoExists, getDemoHtml };
