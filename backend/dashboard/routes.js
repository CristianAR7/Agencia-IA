const express  = require('express');
const router   = express.Router();
const pipeline = require('./pipeline.service');
const agents   = require('./agents.service');
const chat     = require('./chat.service');
const db       = require('./db');

// Init DB tables on first load
db.init().catch(err => console.error('[dashboard] DB init error:', err.message));

// Skills disponibles
const AVAILABLE_SKILLS = [
    { name: 'marketingskills/page-cro',          category: 'marketing',  desc: 'Optimización de conversión (CRO)' },
    { name: 'marketingskills/seo-audit',          category: 'marketing',  desc: 'Auditoría SEO completa' },
    { name: 'marketingskills/content-strategy',   category: 'marketing',  desc: 'Estrategia de contenido' },
    { name: 'marketingskills/competitor-alternatives', category: 'marketing', desc: 'Análisis de competidores' },
    { name: 'marketingskills/cold-email',         category: 'marketing',  desc: 'Cold email y outreach' },
    { name: 'marketingskills/copywriting',        category: 'marketing',  desc: 'Copywriting persuasivo' },
    { name: 'ui-ux-pro-max',                      category: 'diseño',     desc: 'Estilos UI, paletas, tipografías' },
    { name: 'superclaude',                        category: 'agentes',    desc: '30 comandos + 20 agentes especializados' },
    { name: 'agency-agents',                      category: 'agentes',    desc: '156 agentes de agencia' },
    { name: 'claude-banana',                      category: 'imágenes',   desc: 'Prompts para generación de imágenes' },
];

router.get('/skills', (req, res) => res.json(AVAILABLE_SKILLS));

// ── PIPELINE ─────────────────────────────────────────────────────────────────

router.post('/pipeline/analyze', async (req, res) => {
    const { businessName, sector, websiteUrl, notes } = req.body;
    if (!businessName?.trim() || !sector?.trim()) {
        return res.status(400).json({ error: 'businessName y sector son obligatorios' });
    }
    try {
        const result = await pipeline.runPipeline(businessName.trim(), sector.trim(), websiteUrl?.trim(), notes?.trim());
        res.json(result);
    } catch (err) {
        console.error('[pipeline] error:', err.message);
        res.status(500).json({ error: 'Error en el análisis: ' + err.message });
    }
});

router.get('/pipeline/clients', async (req, res) => {
    try {
        res.json(await db.getClients());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/pipeline/clients/:id', async (req, res) => {
    try {
        const c = await db.getClient(req.params.id);
        if (!c) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(c);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── AGENTS ───────────────────────────────────────────────────────────────────

router.post('/agents/generate', async (req, res) => {
    const { clientId, businessProfile } = req.body;
    if (!businessProfile) {
        return res.status(400).json({ error: 'businessProfile es obligatorio' });
    }
    try {
        const configs = await agents.generateAll(businessProfile);
        if (clientId) {
            await db.saveAgents(clientId, configs);
        }
        res.json({ configs, saved: !!clientId });
    } catch (err) {
        console.error('[agents] error:', err.message);
        res.status(500).json({ error: 'Error generando agentes: ' + err.message });
    }
});

router.get('/agents/:clientId', async (req, res) => {
    try {
        const a = await db.getAgents(req.params.clientId);
        if (!a) return res.status(404).json({ error: 'Sin agentes para este cliente' });
        res.json(a);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/agents/download', async (req, res) => {
    const { businessName, configs } = req.body;
    if (!businessName || !configs) {
        return res.status(400).json({ error: 'businessName y configs son obligatorios' });
    }
    try {
        const zip  = await agents.buildZip(businessName, configs);
        const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${slug}-agentes-crial.zip"`);
        res.send(zip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── CHAT ─────────────────────────────────────────────────────────────────────

router.post('/chat', async (req, res) => {
    const { sessionId, message } = req.body;
    if (!message?.trim()) {
        return res.status(400).json({ error: 'message es obligatorio' });
    }
    try {
        const result = await chat.sendMessage(sessionId || null, message.trim());
        res.json(result);
    } catch (err) {
        console.error('[chat] error:', err.message);
        res.status(500).json({ error: 'Error en el chat: ' + err.message });
    }
});

router.get('/chat/sessions', async (req, res) => {
    try {
        res.json(await chat.getSessions());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/chat/:sessionId', async (req, res) => {
    try {
        res.json(await chat.getHistory(req.params.sessionId));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── NOTION ────────────────────────────────────────────────────────────────────
const notion = require('./notion.service');

router.get('/notion/leads', async (req, res) => {
    try {
        res.json(await notion.getLeads());
    } catch (err) {
        res.status(500).json({ error: err.message, configured: false });
    }
});

router.patch('/notion/leads/:id', async (req, res) => {
    try {
        const result = await notion.updateLeadStatus(req.params.id, req.body.status);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/notion/leads', async (req, res) => {
    try {
        const result = await notion.createLead(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
