require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const whatsappWebhook = require('./handlers/whatsappWebhook');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'online',
        service: 'WhatsApp AI Agent - Clínica Dental Sonrisa',
        timestamp: new Date().toISOString()
    });
});

// WhatsApp webhook
app.post('/webhook/whatsapp', whatsappWebhook);

app.listen(PORT, () => {
    console.log(`🤖 WhatsApp Agent running on port ${PORT}`);
    console.log(`📱 Business: Clínica Dental Sonrisa`);
    console.log(`🔌 Webhook: http://localhost:${PORT}/webhook/whatsapp`);
});
