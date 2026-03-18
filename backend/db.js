const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function init() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS leads (
            id          BIGINT PRIMARY KEY,
            data        JSONB NOT NULL,
            status      TEXT NOT NULL DEFAULT 'pending',
            created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `);
}

async function saveLead(lead) {
    const { id, status, createdAt, ...rest } = lead;
    await pool.query(
        'INSERT INTO leads (id, data, status, created_at) VALUES ($1, $2, $3, $4)',
        [id, rest, status, createdAt]
    );
}

async function getLeads() {
    const result = await pool.query(
        'SELECT id, data, status, created_at FROM leads ORDER BY created_at DESC'
    );
    return result.rows.map(row => ({
        id: Number(row.id),
        ...row.data,
        status: row.status,
        createdAt: row.created_at
    }));
}

async function getLead(id) {
    const result = await pool.query(
        'SELECT id, data, status, created_at FROM leads WHERE id = $1',
        [id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return { id: Number(row.id), ...row.data, status: row.status, createdAt: row.created_at };
}

module.exports = { init, saveLead, getLeads, getLead };
