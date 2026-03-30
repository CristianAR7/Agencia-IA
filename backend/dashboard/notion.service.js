// Notion integration — requires NOTION_API_KEY and NOTION_DATABASE_ID env vars

let NotionClient;
try {
    NotionClient = require('@notionhq/client').Client;
} catch {
    NotionClient = null;
}

function getClient() {
    if (!NotionClient) throw new Error('Instala @notionhq/client: npm install @notionhq/client en backend/');
    if (!process.env.NOTION_API_KEY) throw new Error('NOTION_API_KEY no configurada');
    return new NotionClient({ auth: process.env.NOTION_API_KEY });
}

function getDatabaseId() {
    if (!process.env.NOTION_DATABASE_ID) throw new Error('NOTION_DATABASE_ID no configurada');
    return process.env.NOTION_DATABASE_ID;
}

// Map Notion page to our lead format
function mapPage(page) {
    const props = page.properties || {};
    const getText = (p) => p?.title?.[0]?.plain_text || p?.rich_text?.[0]?.plain_text || '';
    const getSelect = (p) => p?.select?.name || '';
    const getDate = (p) => p?.date?.start || p?.created_time || '';

    return {
        id: page.id,
        name: getText(props['Nombre'] || props['Name'] || props['name'] || Object.values(props).find(p => p.type === 'title')),
        status: getSelect(props['Estado'] || props['Status'] || props['estado'] || props['status']),
        sector: getText(props['Sector'] || props['sector'] || props['Industria'] || {}),
        url: getText(props['URL'] || props['Web'] || props['url'] || {}),
        date: getDate(props['Fecha'] || props['Date'] || {}),
        notionUrl: page.url
    };
}

async function getLeads() {
    const notion = getClient();
    const dbId = getDatabaseId();

    const response = await notion.databases.query({
        database_id: dbId,
        sorts: [{ timestamp: 'created_time', direction: 'descending' }],
        page_size: 50
    });

    return response.results.map(mapPage);
}

async function updateLeadStatus(pageId, status) {
    const notion = getClient();

    // Try common status property names
    const statusPropName = ['Estado', 'Status', 'estado', 'status'].find(n => n) || 'Status';

    await notion.pages.update({
        page_id: pageId,
        properties: {
            [statusPropName]: { select: { name: status } }
        }
    });

    return { success: true, pageId, status };
}

async function createLead({ businessName, sector, websiteUrl, status = 'Nuevo' }) {
    const notion = getClient();
    const dbId = getDatabaseId();

    const response = await notion.pages.create({
        parent: { database_id: dbId },
        properties: {
            'Nombre': { title: [{ text: { content: businessName } }] },
            'Sector':  { rich_text: [{ text: { content: sector || '' } }] },
            'URL':     { rich_text: [{ text: { content: websiteUrl || '' } }] },
            'Estado':  { select: { name: status } }
        }
    });

    return mapPage(response);
}

module.exports = { getLeads, updateLeadStatus, createLead };
