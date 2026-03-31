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

// ── Helpers de extracción de propiedades Notion ───────────────────────────────

function getTitle(prop) {
    if (!prop) return '';
    return prop.title?.[0]?.plain_text || '';
}

function getRichText(prop) {
    if (!prop) return '';
    return prop.rich_text?.[0]?.plain_text || '';
}

function getSelect(prop) {
    if (!prop) return '';
    return prop.select?.name || '';
}

function getMultiSelect(prop) {
    if (!prop) return [];
    return (prop.multi_select || []).map(s => s.name);
}

function getNumber(prop) {
    if (!prop) return null;
    return prop.number ?? null;
}

function getDate(prop) {
    if (!prop) return '';
    return prop.date?.start || '';
}

function getUrl(prop) {
    if (!prop) return '';
    return prop.url || '';
}

function getEmail(prop) {
    if (!prop) return '';
    return prop.email || '';
}

function getPhone(prop) {
    if (!prop) return '';
    return prop.phone_number || '';
}

// ── Mapeo completo de columnas reales de Notion ───────────────────────────────
function mapPage(page) {
    const p = page.properties || {};

    return {
        id:                page.id,
        notionUrl:         page.url,
        // Columnas principales
        businessName:      getTitle(p['Nombre Negocio']),
        status:            getSelect(p['Estado']),
        sector:            getSelect(p['Tipo']),
        website:           getUrl(p['Website']),
        email:             getEmail(p['Email']),
        phone:             getPhone(p['Teléfono']),
        price:             getNumber(p['Precio €']),
        painPoints:        getRichText(p['Pain Points']),
        solution:          getRichText(p['Solución CRIAL']),
        contactDate:       getDate(p['Fecha Contacto']),
        nextFollowUp:      getDate(p['Próximo Seguimiento']),
        location:          getRichText(p['Ubicación']),
        googleRating:      getNumber(p['Rating Google']),
        numReviews:        getNumber(p['Num Reviews']),
    };
}

// ── API pública ───────────────────────────────────────────────────────────────

async function getLeads() {
    const notion = getClient();
    const dbId = getDatabaseId();

    const response = await notion.databases.query({
        database_id: dbId,
        sorts: [{ timestamp: 'created_time', direction: 'descending' }],
        page_size: 100
    });

    return response.results.map(mapPage);
}

async function updateLeadStatus(pageId, status) {
    const notion = getClient();

    await notion.pages.update({
        page_id: pageId,
        properties: {
            'Estado': { select: { name: status } }
        }
    });

    return { success: true, pageId, status };
}

async function createLead({ businessName, sector, websiteUrl, status = 'Nuevo', email, phone, location }) {
    const notion = getClient();
    const dbId = getDatabaseId();

    const properties = {
        'Nombre Negocio': { title: [{ text: { content: businessName || '' } }] },
        'Estado':         { select: { name: status } },
    };

    if (sector)     properties['Tipo']     = { select: { name: sector } };
    if (websiteUrl) properties['Website']  = { url: websiteUrl };
    if (email)      properties['Email']    = { email };
    if (phone)      properties['Teléfono'] = { phone_number: phone };
    if (location)   properties['Ubicación'] = { rich_text: [{ text: { content: location } }] };

    const response = await notion.pages.create({
        parent: { database_id: dbId },
        properties
    });

    return mapPage(response);
}

module.exports = { getLeads, updateLeadStatus, createLead };
