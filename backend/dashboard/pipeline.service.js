const axios = require('axios');
const cheerio = require('cheerio');
const Anthropic = require('@anthropic-ai/sdk');
const db = require('./db');

async function scrapeWebsite(url) {
    if (!url) return null;
    if (!url.startsWith('http')) url = 'https://' + url;

    try {
        const { data } = await axios.get(url, {
            timeout: 10000,
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CRIAL-Bot/1.0; +https://crial.solutions)' },
            maxContentLength: 2 * 1024 * 1024 // 2MB max
        });

        const $ = cheerio.load(data);
        $('script, style, nav, footer, noscript, iframe, svg').remove();

        const title       = $('title').text().trim();
        const description = $('meta[name="description"]').attr('content') || '';
        const h1s         = $('h1').map((_, el) => $(el).text().trim()).get().filter(Boolean);
        const h2s         = $('h2').map((_, el) => $(el).text().trim()).get().filter(Boolean).slice(0, 8);
        const paragraphs  = $('p').map((_, el) => $(el).text().trim()).get()
                              .filter(t => t.length > 40).slice(0, 10);

        const bodyText = $('body').text();
        const phones   = (bodyText.match(/(?:\+34|0034)?[\s.-]?[6789]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/g) || [])
                          .map(p => p.trim()).slice(0, 3);
        const emails   = (bodyText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [])
                          .filter(e => !/example|test|placeholder/i.test(e)).slice(0, 3);
        const ctas     = $('a, button').map((_, el) => $(el).text().trim()).get()
                          .filter(t => t.length > 2 && t.length < 60)
                          .filter(t => /contact|reserv|cita|pedido|comprar|llamar|whatsapp|email|pedir|agendar|solicitar/i.test(t))
                          .slice(0, 6);

        return { title, description, h1s, h2s, paragraphs, phones, emails, ctas, url, scraped: true };
    } catch (err) {
        return { url, scraped: false, error: err.message };
    }
}

function safeParseJSON(text) {
    // 1. Intentar parseo directo
    try { return JSON.parse(text); } catch {}

    // 2. Extraer bloque JSON con regex
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
        try { return JSON.parse(match[0]); } catch {}
    }

    // 3. Limpiar caracteres problemáticos y reintentar
    try {
        const cleaned = text
            .replace(/[\x00-\x1F\x7F]/g, ' ')
            .replace(/,\s*([}\]])/g, '$1')
            .match(/\{[\s\S]*\}/)?.[0];
        if (cleaned) return JSON.parse(cleaned);
    } catch {}

    return null;
}

async function analyzeWithClaude(businessName, sector, websiteUrl, notes, scraped) {
    const webCtx = scraped?.scraped
        ? `WEB SCRAPING (${scraped.url}):
Título: ${scraped.title}
Meta: ${scraped.description}
H1s: ${scraped.h1s.join(' | ')}
H2s: ${scraped.h2s.slice(0, 5).join(' | ')}
Contenido: ${scraped.paragraphs.slice(0, 5).join(' /// ')}
CTAs: ${scraped.ctas.join(', ')}
Contacto: ${[...scraped.phones, ...scraped.emails].join(', ')}`
        : websiteUrl
            ? `Web ${websiteUrl} no accesible para scraping (${scraped?.error || 'timeout'}).`
            : 'Sin web proporcionada.';

    const prompt = `Eres el sistema de análisis de CRIAL Solutions, agencia de IA española.

NEGOCIO:
- Nombre: ${businessName}
- Sector: ${sector}
- Notas: ${notes || 'Ninguna'}
${webCtx}

IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON. Sin texto antes ni después. Sin bloques de código markdown. Sin explicaciones. El primer carácter de tu respuesta debe ser { y el último }.

Estructura exacta:
{
  "executive_summary": "2-3 frases sobre el negocio y su oportunidad con IA",
  "business_profile": {
    "type": "tipo de negocio",
    "main_services": ["servicio1", "servicio2", "servicio3"],
    "target_customer": "perfil del cliente objetivo",
    "digital_presence_score": 6,
    "digital_presence_note": "valoración breve"
  },
  "pain_points": [
    { "issue": "problema", "impact": "impacto en negocio", "priority": "alta" }
  ],
  "opportunities": [
    { "area": "área", "description": "descripción", "ai_solution": "solución IA concreta" }
  ],
  "recommended_solutions": [
    { "type": "whatsapp-agent", "reason": "por qué", "expected_roi": "estimación", "priority": 1 }
  ],
  "proposal": {
    "package": "Professional",
    "setup_price": 2500,
    "monthly_price": 500,
    "setup_weeks": 2,
    "key_features": ["feature1", "feature2", "feature3"],
    "roi_justification": "cómo recupera la inversión en N meses"
  },
  "cro_score": {
    "overall": 6,
    "conversion": 5,
    "trust": 7,
    "ux": 6,
    "recommendations": ["mejora 1", "mejora 2", "mejora 3"]
  },
  "seo_score": {
    "overall": 5,
    "issues": ["problema 1", "problema 2"],
    "quick_wins": ["quick win 1", "quick win 2"]
  }
}`;

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
        model: process.env.AI_MODEL || 'claude-sonnet-4-6',
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }]
    });

    const text = msg.content[0].text.trim();
    const parsed = safeParseJSON(text);
    if (parsed) return parsed;

    console.error('[pipeline] JSON parse failed. Raw response:\n', text.slice(0, 500));
    return {
        _parseError: true,
        executive_summary: `Análisis generado para ${businessName}. Hubo un problema al procesar la respuesta — vuelve a intentarlo.`,
        business_profile: { type: '—', main_services: [], target_customer: '—', digital_presence_score: 0, digital_presence_note: '—' },
        pain_points: [],
        opportunities: [],
        recommended_solutions: [],
        proposal: { package: '—', setup_price: 0, monthly_price: 0, setup_weeks: 0, key_features: [], roi_justification: '—' },
        cro_score: { overall: 0, conversion: 0, trust: 0, ux: 0, recommendations: [] },
        seo_score: { overall: 0, issues: [], quick_wins: [] }
    };
}

async function runPipeline(businessName, sector, websiteUrl, notes) {
    const scraped = await scrapeWebsite(websiteUrl);
    const report  = await analyzeWithClaude(businessName, sector, websiteUrl, notes, scraped);
    const record  = await db.saveClient({ businessName, sector, websiteUrl, scrapedData: scraped, report });
    return { clientId: record.id, report, scraped };
}

module.exports = { runPipeline, scrapeWebsite };
