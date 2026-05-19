require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// ============================================
// EL CEREBRO - Analizador de Soluciones con IA
// ============================================

async function analyzeSolutionWithAI(clientData) {
    const prompt = `
Eres un arquitecto de soluciones de IA especializado en crear agentes inteligentes.

Cliente: ${clientData.businessName}
Industria: ${clientData.industry}
Descripción: ${clientData.businessDescription}

Soluciones solicitadas: ${clientData.solutionTypes.join(', ')}
Objetivos: ${clientData.goals.join(', ')}
Volumen esperado: ${clientData.volume}
Presupuesto: ${clientData.budget}
Info adicional: ${clientData.additionalInfo}

GENERA una propuesta técnica completa que incluya:

1. Stack tecnológico recomendado (APIs, frameworks, servicios)
2. Arquitectura detallada (cómo se conectan los componentes)
3. Lista de componentes a desarrollar
4. APIs y servicios externos necesarios
5. Tiempo estimado de implementación
6. Costo mensual estimado de operación
7. Próximos pasos concretos

Sé específico, técnico pero claro. Da nombres reales de servicios y tecnologías.
`;

    // Aquí iría la llamada real a Claude API
    // Por ahora, simularemos la respuesta
    const response = await simulateAIAnalysis(clientData);
    
    return response;
}

function simulateAIAnalysis(data) {
    // Esta función simula el análisis. En producción, llamarías a Claude API
    
    const hasWhatsApp = data.solutionTypes.includes('whatsapp-agent');
    const hasVoice = data.solutionTypes.includes('voice-agent');
    const hasWebChat = data.solutionTypes.includes('web-chatbot');
    const hasLanding = data.solutionTypes.includes('landing-page');

    // Determinar stack basado en necesidades
    let recommendedStack = [];
    let apis = [];
    let components = [];
    let estimatedCost = 0;
    
    // Backend base
    recommendedStack.push('Node.js + Express (Backend)');
    recommendedStack.push('React/Next.js (Frontend)');
    
    // Análisis por tipo de solución
    if (hasWhatsApp) {
        apis.push('Twilio WhatsApp API - Envío y recepción de mensajes');
        apis.push('Claude API / GPT-4 - Procesamiento de lenguaje natural');
        apis.push('Supabase / Firebase - Base de datos de conversaciones');
        components.push('Webhook Handler para WhatsApp');
        components.push('Sistema de gestión de contexto de conversación');
        components.push('Motor de respuestas con IA');
        estimatedCost += 300;
        
        if (data.goals.includes('appointment-booking')) {
            apis.push('Google Calendar API / Calendly - Agendamiento');
            components.push('Integración de calendario');
            estimatedCost += 100;
        }
    }

    if (hasVoice) {
        apis.push('Vapi.ai o Bland.ai - Motor de voz con IA');
        apis.push('ElevenLabs - Síntesis de voz natural');
        apis.push('Twilio Voice - Gestión de llamadas');
        components.push('Sistema de IVR inteligente');
        components.push('Grabación y transcripción de llamadas');
        components.push('Analytics de sentimiento');
        estimatedCost += 800;
    }

    if (hasWebChat) {
        components.push('Widget de chat embebible');
        components.push('Sistema de ticketing');
        estimatedCost += 150;
    }

    if (hasLanding) {
        components.push('Landing page con formulario inteligente');
        components.push('Sistema de captura de leads');
        estimatedCost += 200;
    }

    // CRM y Analytics
    if (data.goals.includes('lead-qualification') || data.goals.includes('sales')) {
        apis.push('CRM (HubSpot / Pipedrive / Custom)');
        components.push('Sistema de scoring de leads');
        estimatedCost += 150;
    }

    // Base de datos
    recommendedStack.push('PostgreSQL / Supabase - Base de datos principal');
    recommendedStack.push('Redis - Caché y sesiones');

    // Deploy
    recommendedStack.push('Vercel / Railway - Hosting backend');
    recommendedStack.push('Cloudflare - CDN y protección');

    // Tiempo estimado
    let weeksEstimate = 2;
    if (hasVoice) weeksEstimate += 2;
    if (hasWhatsApp) weeksEstimate += 1;
    if (hasLanding) weeksEstimate += 1;

    const architecture = `
┌─────────────────────────────────────────┐
│         USUARIO / CLIENTE               │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼──────┐    ┌────▼──────┐
│ WhatsApp │    │   Web     │
│  Channel │    │  Channel  │
└───┬──────┘    └────┬──────┘
    │                │
    └────────┬───────┘
             │
    ┌────────▼────────┐
    │  API Gateway    │
    │  (Rate Limit,   │
    │   Auth, Logs)   │
    └────────┬────────┘
             │
    ┌────────▼────────┐
    │  Message Router │
    │  (Distribuye    │
    │   por tipo)     │
    └─────┬──────┬────┘
          │      │
    ┌─────▼──┐ ┌▼─────────┐
    │ Claude │ │  Vector  │
    │  API   │ │  Store   │
    │ (LLM)  │ │ (Memoria)│
    └─────┬──┘ └──────────┘
          │
    ┌─────▼──────────┐
    │  Action Engine │
    │ (Ejecuta       │
    │  acciones)     │
    └─────┬──────────┘
          │
    ┌─────▼──────┬─────────┬─────────┐
    │            │         │         │
┌───▼───┐  ┌────▼───┐ ┌───▼────┐ ┌──▼───┐
│  CRM  │  │Calendar│ │Database│ │Notify│
└───────┘  └────────┘ └────────┘ └──────┘
    `;

    const nextSteps = [
        'Configurar cuentas de APIs necesarias (Twilio, Claude, etc.)',
        'Crear repositorio de GitHub y configurar CI/CD',
        'Implementar webhook handler y sistema de mensajería',
        'Entrenar y configurar el agente de IA con tu información de negocio',
        'Realizar pruebas exhaustivas con casos reales',
        'Deploy a producción y monitoreo',
        'Iterar basado en métricas y feedback'
    ];

    return {
        recommendedStack: recommendedStack.join(' | '),
        architecture: architecture,
        components: components,
        apis: apis,
        estimatedTime: `${weeksEstimate} semanas (MVP funcional)`,
        estimatedCost: `€${estimatedCost}/mes (costos de APIs y servicios)`,
        nextSteps: nextSteps
    };
}

// ============================================
// API ENDPOINTS
// ============================================

app.post('/api/analyze', async (req, res) => {
    try {
        const clientData = req.body;
        
        // Validación básica
        if (!clientData.businessName || !clientData.solutionTypes || clientData.solutionTypes.length === 0) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        // Analizar con IA
        const solution = await analyzeSolutionWithAI(clientData);

        // 📧 Sistema de emails desactivado temporalmente
        // Para activarlo más tarde:
        // 1. Crear archivo backend/services/emailService.js
        // 2. Configurar variables EMAIL_USER, EMAIL_PASSWORD, ADMIN_EMAIL
        // 3. Descomentar el código de abajo
        
        console.log('📋 Lead capturado:', {
            negocio: clientData.businessName,
            email: clientData.email,
            soluciones: clientData.solutionTypes,
            presupuesto: solution.estimatedCost
        });

        const lead = {
            id: Date.now(),
            ...clientData,
            solution: solution,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        await db.saveLead(lead);

        res.json(solution);

    } catch (error) {
        console.error('Error analyzing solution:', error);
        res.status(500).json({ error: 'Error al generar la solución' });
    }
});

// Endpoint para generar código completo (Generador Universal)
app.post('/api/generate-solution', async (req, res) => {
    try {
        const clientData = req.body;
        
        // Validación
        if (!clientData.businessName || !clientData.solutionTypes || clientData.solutionTypes.length === 0) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        console.log('🚀 Generando solución completa para:', clientData.businessName);

        // Usar el generador universal
        const UniversalGenerator = require('./generators/universalGenerator');
        const generator = new UniversalGenerator(clientData);
        
        // Generar solución
        await generator.generate();

        const projectName = clientData.businessName.toLowerCase().replace(/\s+/g, '-');
        const outputPath = `./generated-solution-${projectName}`;

        res.json({
            success: true,
            message: 'Solución generada exitosamente',
            projectPath: outputPath,
            components: generator.components,
            nextSteps: [
                `cd ${outputPath}`,
                './setup-all.sh',
                'Configurar variables en cada .env',
                'Revisar docs/PROPOSAL.md'
            ]
        });

    } catch (error) {
        console.error('Error generating solution:', error);
        res.status(500).json({ error: 'Error al generar la solución' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'AI Solution Generator' });
});

// ============================================
// ADMIN ENDPOINTS
// ============================================

app.get('/api/admin/leads', async (req, res) => {
    try {
        const leads = await db.getLeads();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener leads' });
    }
});

app.get('/api/admin/leads/:id', async (req, res) => {
    try {
        const lead = await db.getLead(req.params.id);
        if (!lead) return res.status(404).json({ error: 'Not found' });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener lead' });
    }
});

// Dashboard — montado antes del servidor, sin colisión con rutas existentes
app.use('/dashboard', require('express').static(path.join(__dirname, 'dashboard-frontend')));
app.use('/dashboard/api', require('./dashboard/routes'));

// Demo pages served separately so they're accessible at /dashboard/demos/:clientId.html
// (already covered by the static middleware above since demos/ is inside dashboard-frontend/)

// ============================================
// CHATBOT - Captura de leads con notificación WhatsApp
// ============================================

app.post('/api/chat/lead', async (req, res) => {
    try {
        const { 
            email, 
            phone, 
            businessName, 
            businessType, 
            needs, 
            selectedSolutions,
            firstMessage,
            messages 
        } = req.body;

        // Validar datos básicos
        if (!email || !phone || !businessName) {
            return res.status(400).json({ 
                success: false, 
                error: 'Faltan datos requeridos' 
            });
        }

        // Calcular precio orientativo
        const pricing = {
            'chatbot_web': { min: 800, max: 1500 },
            'whatsapp': { min: 1500, max: 2500 },
            'voz': { min: 2000, max: 3500 },
            'landing': { min: 1200, max: 2000 }
        };

        let minPrice = 0;
        let maxPrice = 0;
        
        if (selectedSolutions && selectedSolutions.length > 0) {
            selectedSolutions.forEach(sol => {
                if (pricing[sol]) {
                    minPrice += pricing[sol].min;
                    maxPrice += pricing[sol].max;
                }
            });
            
            // Descuento combo (15% si hay más de 1)
            if (selectedSolutions.length > 1) {
                minPrice = Math.round(minPrice * 0.85);
                maxPrice = Math.round(maxPrice * 0.85);
            }
        }

        const priceText = minPrice > 0 
            ? `${minPrice.toLocaleString()}€ - ${maxPrice.toLocaleString()}€`
            : 'Por definir';

        // Formatear soluciones
        const solutionNames = {
            'chatbot_web': 'Chatbot Web',
            'whatsapp': 'Agente WhatsApp',
            'voz': 'Agente de Voz',
            'landing': 'Landing Page'
        };

        const solutionsText = selectedSolutions && selectedSolutions.length > 0
            ? selectedSolutions.map(s => `- ${solutionNames[s] || s}`).join('\n')
            : 'No especificadas';

        // Hora actual
        const now = new Date();
        const hora = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Enviar WhatsApp con Twilio
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const whatsappFrom = process.env.TWILIO_WHATSAPP_NUMBER;
        const whatsappTo = process.env.TU_NUMERO_WHATSAPP;

        if (!accountSid || !authToken || !whatsappFrom || !whatsappTo) {
            console.error('❌ Credenciales de Twilio no configuradas');
            return res.status(500).json({ 
                success: false, 
                error: 'Credenciales de Twilio no configuradas' 
            });
        }

        const twilio = require('twilio');
        const client = twilio(accountSid, authToken);

        const messageBody = `🔔 NUEVO LEAD CHATBOT - CRIAL

👤 ${businessName}
🏢 Tipo: ${businessType}
📧 ${email}
📱 ${phone}

💬 Necesita:
${needs}

✅ Soluciones elegidas:
${solutionsText}

💰 Precio orientativo: ${priceText}

🕐 Hora: ${hora}

---
Ver dashboard: https://agencia-ia-production.up.railway.app/admin`;

        const message = await client.messages.create({
            from: `whatsapp:${whatsappFrom}`,
            to: `whatsapp:${whatsappTo}`,
            body: messageBody
        });

        console.log(`✅ WhatsApp enviado: ${message.sid}`);
        console.log(`📧 Lead: ${email} - ${businessName}`);

        // Guardar en base de datos (opcional)
        // await db.saveLead({ email, phone, businessName, ... });

        res.json({ 
            success: true, 
            message_sid: message.sid,
            lead_email: email 
        });

    } catch (error) {
        console.error('❌ Error capturando lead:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Health check para el endpoint de chat
app.get('/api/chat/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'chat',
        twilio_configured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
    });
});

const PORT = process.env.PORT || 3000;
db.init()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 AI Solution Generator Backend running on port ${PORT}`);
            console.log(`📊 Ready to analyze solutions!`);
        });
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err.message);
        process.exit(1);
    });

module.exports = app;
