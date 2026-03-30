const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function init() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS dashboard_clients (
            id          SERIAL PRIMARY KEY,
            business_name TEXT NOT NULL,
            sector      TEXT,
            website_url TEXT,
            scraped_data JSONB,
            report      JSONB,
            created_at  TIMESTAMPTZ DEFAULT NOW()
        )
    `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS dashboard_agents (
            id          SERIAL PRIMARY KEY,
            client_id   INTEGER REFERENCES dashboard_clients(id) ON DELETE CASCADE,
            whatsapp_config JSONB,
            chatbot_config  JSONB,
            voice_config    JSONB,
            created_at  TIMESTAMPTZ DEFAULT NOW()
        )
    `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS dashboard_conversations (
            id          SERIAL PRIMARY KEY,
            session_id  TEXT NOT NULL,
            role        TEXT NOT NULL,
            content     TEXT NOT NULL,
            context     JSONB,
            created_at  TIMESTAMPTZ DEFAULT NOW()
        )
    `);
    await pool.query(
        `CREATE INDEX IF NOT EXISTS idx_conv_session ON dashboard_conversations(session_id, created_at)`
    );
}

// ── Clients ──────────────────────────────────────────────────────────────────

async function saveClient({ businessName, sector, websiteUrl, scrapedData, report }) {
    const r = await pool.query(
        `INSERT INTO dashboard_clients (business_name, sector, website_url, scraped_data, report)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [businessName, sector, websiteUrl || null, scrapedData || null, report]
    );
    return r.rows[0];
}

async function getClients() {
    const r = await pool.query(
        `SELECT id, business_name, sector, website_url, created_at,
                report->>'executive_summary' AS summary
         FROM dashboard_clients ORDER BY created_at DESC`
    );
    return r.rows;
}

async function getClient(id) {
    const r = await pool.query('SELECT * FROM dashboard_clients WHERE id = $1', [id]);
    return r.rows[0] || null;
}

// ── Agents ───────────────────────────────────────────────────────────────────

async function saveAgents(clientId, { whatsapp, chatbot, voice }) {
    const r = await pool.query(
        `INSERT INTO dashboard_agents (client_id, whatsapp_config, chatbot_config, voice_config)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [clientId, whatsapp, chatbot, voice]
    );
    return r.rows[0];
}

async function getAgents(clientId) {
    const r = await pool.query(
        `SELECT * FROM dashboard_agents WHERE client_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [clientId]
    );
    return r.rows[0] || null;
}

// ── Conversations ─────────────────────────────────────────────────────────────

async function saveMessage(sessionId, role, content) {
    const r = await pool.query(
        `INSERT INTO dashboard_conversations (session_id, role, content)
         VALUES ($1, $2, $3) RETURNING *`,
        [sessionId, role, content]
    );
    return r.rows[0];
}

async function getConversation(sessionId) {
    const r = await pool.query(
        `SELECT role, content FROM dashboard_conversations
         WHERE session_id = $1 ORDER BY created_at ASC`,
        [sessionId]
    );
    return r.rows;
}

async function getSessions() {
    const r = await pool.query(
        `SELECT session_id, MIN(created_at) AS started_at,
                COUNT(*) AS message_count,
                (SELECT content FROM dashboard_conversations c2
                 WHERE c2.session_id = c.session_id AND c2.role = 'user'
                 ORDER BY c2.created_at ASC LIMIT 1) AS first_message
         FROM dashboard_conversations c
         GROUP BY session_id ORDER BY started_at DESC LIMIT 20`
    );
    return r.rows;
}

module.exports = { init, saveClient, getClients, getClient, saveAgents, getAgents, saveMessage, getConversation, getSessions };
