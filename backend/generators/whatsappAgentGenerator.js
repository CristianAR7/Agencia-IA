// ============================================
// GENERADOR DE WHATSAPP AGENT
// Este script genera TODO el código necesario para un agente de WhatsApp funcional
// ============================================

const fs = require('fs');
const path = require('path');

class WhatsAppAgentGenerator {
    constructor(config) {
        this.config = {
            businessName: config.businessName || 'Mi Negocio',
            industry: config.industry || 'general',
            features: config.features || [],
            personality: config.personality || 'profesional y amigable',
            language: config.language || 'español'
        };
        this.outputDir = config.outputDir || './generated-whatsapp-agent';
    }

    // Genera estructura completa del proyecto
    generate() {
        console.log('🚀 Generando WhatsApp Agent...');
        
        this.createProjectStructure();
        this.generateEnvFile();
        this.generatePackageJson();
        this.generateMainServer();
        this.generateWebhookHandler();
        this.generateAIEngine();
        this.generateContextManager();
        this.generateActionsHandler();
        this.generateReadme();
        
        console.log('✅ WhatsApp Agent generado exitosamente en:', this.outputDir);
        console.log('\n📋 Próximos pasos:');
        console.log('1. cd ' + this.outputDir);
        console.log('2. npm install');
        console.log('3. Configurar las variables en .env');
        console.log('4. npm start');
    }

    createProjectStructure() {
        const dirs = [
            this.outputDir,
            `${this.outputDir}/src`,
            `${this.outputDir}/src/handlers`,
            `${this.outputDir}/src/ai`,
            `${this.outputDir}/src/database`,
            `${this.outputDir}/src/utils`,
            `${this.outputDir}/config`
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    generateEnvFile() {
        const envContent = `# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# AI Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key
AI_MODEL=claude-sonnet-4-5-20250929

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/whatsapp_agent

# Application
PORT=3000
NODE_ENV=development

# Business Configuration
BUSINESS_NAME=${this.config.businessName}
BUSINESS_INDUSTRY=${this.config.industry}
`;
        
        fs.writeFileSync(`${this.outputDir}/.env.example`, envContent);
    }

    generatePackageJson() {
        const packageJson = {
            name: `whatsapp-agent-${this.config.businessName.toLowerCase().replace(/\s+/g, '-')}`,
            version: '1.0.0',
            description: `WhatsApp AI Agent para ${this.config.businessName}`,
            main: 'src/index.js',
            scripts: {
                start: 'node src/index.js',
                dev: 'nodemon src/index.js'
            },
            dependencies: {
                'express': '^4.18.2',
                'twilio': '^4.19.0',
                '@anthropic-ai/sdk': '^0.20.0',
                'dotenv': '^16.3.1',
                'pg': '^8.11.3',
                'body-parser': '^1.20.2'
            },
            devDependencies: {
                'nodemon': '^3.0.1'
            }
        };
        
        fs.writeFileSync(
            `${this.outputDir}/package.json`,
            JSON.stringify(packageJson, null, 2)
        );
    }

    generateMainServer() {
        const serverCode = `require('dotenv').config();
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
        service: 'WhatsApp AI Agent - ${this.config.businessName}',
        timestamp: new Date().toISOString()
    });
});

// WhatsApp webhook
app.post('/webhook/whatsapp', whatsappWebhook);

app.listen(PORT, () => {
    console.log(\`🤖 WhatsApp Agent running on port \${PORT}\`);
    console.log(\`📱 Business: ${this.config.businessName}\`);
    console.log(\`🔌 Webhook: http://localhost:\${PORT}/webhook/whatsapp\`);
});
`;
        
        fs.writeFileSync(`${this.outputDir}/src/index.js`, serverCode);
    }

    generateWebhookHandler() {
        const webhookCode = `const twilio = require('twilio');
const aiEngine = require('../ai/engine');
const contextManager = require('../ai/contextManager');
const actionsHandler = require('../handlers/actionsHandler');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function handleWhatsAppMessage(req, res) {
    try {
        const incomingMessage = req.body.Body;
        const from = req.body.From;
        const senderName = req.body.ProfileName || 'Usuario';

        console.log(\`📩 Mensaje de \${senderName}: \${incomingMessage}\`);

        // Obtener contexto de la conversación
        const context = await contextManager.getContext(from);

        // Procesar con IA
        const aiResponse = await aiEngine.processMessage({
            message: incomingMessage,
            from: from,
            senderName: senderName,
            context: context
        });

        // Ejecutar acciones si es necesario
        if (aiResponse.actions && aiResponse.actions.length > 0) {
            await actionsHandler.execute(aiResponse.actions, { from, senderName });
        }

        // Actualizar contexto
        await contextManager.updateContext(from, {
            lastMessage: incomingMessage,
            lastResponse: aiResponse.text,
            timestamp: new Date()
        });

        // Enviar respuesta por WhatsApp
        await client.messages.create({
            body: aiResponse.text,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: from
        });

        console.log(\`✅ Respuesta enviada a \${senderName}\`);

        res.status(200).send('OK');

    } catch (error) {
        console.error('❌ Error processing WhatsApp message:', error);
        res.status(500).send('Error');
    }
}

module.exports = handleWhatsAppMessage;
`;
        
        fs.writeFileSync(
            `${this.outputDir}/src/handlers/whatsappWebhook.js`,
            webhookCode
        );
    }

    generateAIEngine() {
        const aiEngineCode = `const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const BUSINESS_CONTEXT = \`
Eres un asistente de IA para ${this.config.businessName}.
Industria: ${this.config.industry}
Personalidad: ${this.config.personality}
Idioma: ${this.config.language}

Tu trabajo es ayudar a los clientes de manera eficiente, responder sus preguntas,
${this.config.features.includes('appointment-booking') ? 'agendar citas,' : ''}
${this.config.features.includes('lead-qualification') ? 'calificar leads,' : ''}
${this.config.features.includes('customer-support') ? 'dar soporte al cliente,' : ''}
y proporcionar una experiencia excepcional.

Mantén las respuestas concisas y útiles. Si no sabes algo, sé honesto.
\`;

async function processMessage({ message, from, senderName, context }) {
    try {
        // Construir historial de conversación
        const conversationHistory = context.history || [];
        
        const messages = [
            {
                role: 'user',
                content: \`Contexto: \${BUSINESS_CONTEXT}

Usuario: \${senderName}
Mensaje: \${message}

\${conversationHistory.length > 0 ? 'Historial reciente:\\n' + conversationHistory.slice(-5).map(h => \`- \${h.role}: \${h.content}\`).join('\\n') : ''}

Responde de manera natural y útil.\`
            }
        ];

        const response = await anthropic.messages.create({
            model: process.env.AI_MODEL || 'claude-sonnet-4-5-20250929',
            max_tokens: 1000,
            messages: messages
        });

        const aiText = response.content[0].text;

        // Detectar intenciones y acciones
        const actions = detectActions(aiText, message);

        return {
            text: aiText,
            actions: actions
        };

    } catch (error) {
        console.error('Error in AI processing:', error);
        return {
            text: 'Disculpa, estoy teniendo problemas técnicos. ¿Podrías repetir tu mensaje?',
            actions: []
        };
    }
}

function detectActions(aiResponse, userMessage) {
    const actions = [];
    
    // Detectar si quiere agendar cita
    if (userMessage.toLowerCase().includes('agendar') || 
        userMessage.toLowerCase().includes('cita') ||
        userMessage.toLowerCase().includes('reserva')) {
        actions.push({ type: 'schedule_appointment', data: { message: userMessage } });
    }

    // Detectar si es un lead calificado
    if (userMessage.toLowerCase().includes('precio') || 
        userMessage.toLowerCase().includes('contratar')) {
        actions.push({ type: 'qualify_lead', data: { interest: 'high' } });
    }

    return actions;
}

module.exports = {
    processMessage
};
`;
        
        fs.writeFileSync(
            `${this.outputDir}/src/ai/engine.js`,
            aiEngineCode
        );
    }

    generateContextManager() {
        const contextCode = `// Sistema simple de gestión de contexto
// En producción, esto debería usar una base de datos real

const conversations = new Map();

async function getContext(userId) {
    if (!conversations.has(userId)) {
        conversations.set(userId, {
            history: [],
            userData: {},
            createdAt: new Date()
        });
    }
    return conversations.get(userId);
}

async function updateContext(userId, data) {
    const context = await getContext(userId);
    
    // Agregar al historial
    if (data.lastMessage) {
        context.history.push({
            role: 'user',
            content: data.lastMessage,
            timestamp: data.timestamp
        });
    }
    
    if (data.lastResponse) {
        context.history.push({
            role: 'assistant',
            content: data.lastResponse,
            timestamp: data.timestamp
        });
    }

    // Mantener solo últimos 20 mensajes
    if (context.history.length > 20) {
        context.history = context.history.slice(-20);
    }

    // Actualizar datos adicionales
    Object.assign(context.userData, data.userData || {});

    conversations.set(userId, context);
    return context;
}

async function clearContext(userId) {
    conversations.delete(userId);
}

module.exports = {
    getContext,
    updateContext,
    clearContext
};
`;
        
        fs.writeFileSync(
            `${this.outputDir}/src/ai/contextManager.js`,
            contextCode
        );
    }

    generateActionsHandler() {
        const actionsCode = `// Manejador de acciones del agente

async function execute(actions, context) {
    for (const action of actions) {
        console.log(\`⚡ Ejecutando acción: \${action.type}\`);
        
        switch (action.type) {
            case 'schedule_appointment':
                await scheduleAppointment(action.data, context);
                break;
            case 'qualify_lead':
                await qualifyLead(action.data, context);
                break;
            case 'send_notification':
                await sendNotification(action.data, context);
                break;
            default:
                console.log(\`⚠️  Acción desconocida: \${action.type}\`);
        }
    }
}

async function scheduleAppointment(data, context) {
    // TODO: Integrar con Google Calendar, Calendly, etc.
    console.log('📅 Agendando cita para:', context.senderName);
    console.log('Datos:', data);
}

async function qualifyLead(data, context) {
    // TODO: Guardar en CRM
    console.log('🎯 Lead calificado:', context.senderName);
    console.log('Nivel de interés:', data.interest);
}

async function sendNotification(data, context) {
    // TODO: Notificar al equipo
    console.log('🔔 Enviando notificación:', data.message);
}

module.exports = {
    execute
};
`;
        
        fs.writeFileSync(
            `${this.outputDir}/src/handlers/actionsHandler.js`,
            actionsCode
        );
    }

    generateReadme() {
        const readmeContent = `# WhatsApp AI Agent - ${this.config.businessName}

Agente de IA para WhatsApp completamente funcional generado automáticamente.

## 🚀 Instalación Rápida

\`\`\`bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 3. Iniciar el servidor
npm start
\`\`\`

## 📋 Requisitos Previos

### 1. Cuenta de Twilio
1. Crear cuenta en https://www.twilio.com
2. Activar WhatsApp Sandbox: https://www.twilio.com/console/sms/whatsapp/sandbox
3. Obtener credenciales (Account SID y Auth Token)

### 2. API de Claude
1. Obtener API key de Anthropic: https://console.anthropic.com
2. Agregar créditos a tu cuenta

### 3. Configurar Webhook
- Usar ngrok para desarrollo local:
\`\`\`bash
ngrok http 3000
\`\`\`
- Configurar URL en Twilio: https://tu-url.ngrok.io/webhook/whatsapp

## 🏗️ Arquitectura

\`\`\`
WhatsApp → Twilio → Webhook → AI Engine → Actions → Response
                                    ↓
                              Context Manager
\`\`\`

## ✨ Características

${this.config.features.map(f => `- ${f}`).join('\n')}

## 🔧 Personalización

### Modificar Personalidad del Agente
Editar \`src/ai/engine.js\` - BUSINESS_CONTEXT

### Agregar Nuevas Acciones
1. Agregar caso en \`src/handlers/actionsHandler.js\`
2. Implementar lógica de la acción
3. Actualizar \`detectActions()\` en \`src/ai/engine.js\`

## 📊 Próximas Mejoras

- [ ] Base de datos real (PostgreSQL/Supabase)
- [ ] Dashboard de analytics
- [ ] Integración con CRM
- [ ] Soporte multiidioma
- [ ] Sistema de plantillas de respuestas

## 🤝 Soporte

Generado por AI Solution Generator
`;
        
        fs.writeFileSync(`${this.outputDir}/README.md`, readmeContent);
    }
}

// ============================================
// Uso del generador
// ============================================

if (require.main === module) {
    const generator = new WhatsAppAgentGenerator({
        businessName: 'Clínica Dental Sonrisa',
        industry: 'salud',
        features: ['appointment-booking', 'customer-support', 'lead-qualification'],
        personality: 'profesional, empático y servicial',
        language: 'español',
        outputDir: './generated-whatsapp-agent'
    });

    generator.generate();
}

module.exports = WhatsAppAgentGenerator;
