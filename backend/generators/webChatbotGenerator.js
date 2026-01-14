// ============================================
// GENERADOR DE WEB CHATBOT
// Crea un widget de chat embebible para sitios web con IA
// ============================================

const fs = require('fs');
const path = require('path');

class WebChatbotGenerator {
    constructor(config) {
        this.config = {
            businessName: config.businessName || 'Mi Negocio',
            industry: config.industry || 'general',
            websiteUrl: config.websiteUrl || 'https://example.com',
            primaryColor: config.primaryColor || '#6366f1',
            personality: config.personality || 'profesional y amigable',
            features: config.features || [],
            language: config.language || 'español'
        };
        this.outputDir = config.outputDir || './generated-web-chatbot';
    }

    generate() {
        console.log('🌐 Generando Web Chatbot...');
        
        this.createProjectStructure();
        this.generateEnvFile();
        this.generatePackageJson();
        this.generateBackend();
        this.generateChatWidget();
        this.generateEmbedCode();
        this.generateAdminPanel();
        this.generateReadme();
        
        console.log('✅ Web Chatbot generado exitosamente en:', this.outputDir);
        console.log('\n📋 Próximos pasos:');
        console.log('1. cd ' + this.outputDir);
        console.log('2. npm install');
        console.log('3. Configurar .env');
        console.log('4. npm start');
        console.log('5. Copiar código embed al sitio del cliente');
    }

    createProjectStructure() {
        const dirs = [
            this.outputDir,
            `${this.outputDir}/backend`,
            `${this.outputDir}/backend/routes`,
            `${this.outputDir}/backend/services`,
            `${this.outputDir}/widget`,
            `${this.outputDir}/admin`,
            `${this.outputDir}/public`
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    generateEnvFile() {
        const envContent = `# AI Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key
AI_MODEL=claude-sonnet-4-5-20250929

# Application
PORT=3000
ALLOWED_ORIGINS=${this.config.websiteUrl}

# Business Configuration
BUSINESS_NAME=${this.config.businessName}
BUSINESS_INDUSTRY=${this.config.industry}
PRIMARY_COLOR=${this.config.primaryColor}
`;
        
        fs.writeFileSync(`${this.outputDir}/.env.example`, envContent);
    }

    generatePackageJson() {
        const packageJson = {
            name: `web-chatbot-${this.config.businessName.toLowerCase().replace(/\s+/g, '-')}`,
            version: '1.0.0',
            description: `Web Chatbot AI para ${this.config.businessName}`,
            main: 'backend/server.js',
            scripts: {
                start: 'node backend/server.js',
                dev: 'nodemon backend/server.js'
            },
            dependencies: {
                'express': '^4.18.2',
                '@anthropic-ai/sdk': '^0.20.0',
                'dotenv': '^16.3.1',
                'cors': '^2.8.5',
                'uuid': '^9.0.1',
                'express-rate-limit': '^7.1.5'
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

    generateBackend() {
        const serverCode = `require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite de requests por ventana
});

// CORS configurado para el dominio del cliente
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    credentials: true
}));

app.use(express.json());
app.use(limiter);

// Servir archivos estáticos (widget)
app.use('/widget', express.static('widget'));
app.use('/public', express.static('public'));

// Routes
app.use('/api/chat', chatRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'online',
        service: 'Web Chatbot - ${this.config.businessName}',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(\`🌐 Web Chatbot running on port \${PORT}\`);
    console.log(\`📱 Business: ${this.config.businessName}\`);
    console.log(\`🔌 Widget URL: http://localhost:\${PORT}/widget/chatbot.js\`);
});
`;
        
        fs.writeFileSync(`${this.outputDir}/backend/server.js`, serverCode);

        // Chat Routes
        const chatRoutesCode = `const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const sessionManager = require('../services/sessionManager');

// Endpoint para enviar mensajes
router.post('/message', async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Obtener o crear sesión
        const session = await sessionManager.getSession(sessionId);

        // Procesar mensaje con IA
        const response = await aiService.processMessage({
            message,
            sessionId: session.id,
            history: session.history
        });

        // Actualizar historial
        await sessionManager.updateSession(session.id, {
            message,
            response: response.text
        });

        res.json({
            response: response.text,
            sessionId: session.id,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Error processing message' });
    }
});

// Endpoint para iniciar nueva sesión
router.post('/session/new', async (req, res) => {
    try {
        const session = await sessionManager.createSession();
        res.json({
            sessionId: session.id,
            welcomeMessage: \`¡Hola! Soy el asistente virtual de ${this.config.businessName}. ¿En qué puedo ayudarte?\`
        });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Error creating session' });
    }
});

module.exports = router;
`;
        
        fs.writeFileSync(`${this.outputDir}/backend/routes/chat.js`, chatRoutesCode);

        // AI Service
        const aiServiceCode = `const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const BUSINESS_CONTEXT = \`
Eres un asistente virtual para ${this.config.businessName}.
Industria: ${this.config.industry}
Personalidad: ${this.config.personality}
Idioma: ${this.config.language}

Tu trabajo es ayudar a los visitantes del sitio web:
${this.config.features.includes('lead-qualification') ? '- Calificar leads y recopilar información de contacto' : ''}
${this.config.features.includes('customer-support') ? '- Responder preguntas frecuentes' : ''}
${this.config.features.includes('appointment-booking') ? '- Ayudar a agendar citas' : ''}
${this.config.features.includes('product-info') ? '- Proporcionar información sobre productos/servicios' : ''}

Mantén respuestas concisas (2-3 frases máximo).
Sé natural y conversacional.
Si no sabes algo, sé honesto y ofrece conectar con un humano.
\`;

async function processMessage({ message, sessionId, history }) {
    try {
        // Construir mensajes para la API
        const messages = [
            {
                role: 'user',
                content: \`Contexto: \${BUSINESS_CONTEXT}

Historial de conversación:
\${history.slice(-6).map(h => \`\${h.role}: \${h.message}\`).join('\\n')}

Usuario: \${message}

Responde de manera útil y concisa.\`
            }
        ];

        const response = await anthropic.messages.create({
            model: process.env.AI_MODEL || 'claude-sonnet-4-5-20250929',
            max_tokens: 500,
            messages: messages
        });

        return {
            text: response.content[0].text,
            sessionId: sessionId
        };

    } catch (error) {
        console.error('Error in AI processing:', error);
        return {
            text: 'Disculpa, estoy teniendo problemas técnicos. ¿Podrías intentar de nuevo?',
            sessionId: sessionId
        };
    }
}

module.exports = {
    processMessage
};
`;
        
        fs.writeFileSync(`${this.outputDir}/backend/services/aiService.js`, aiServiceCode);

        // Session Manager
        const sessionManagerCode = `const { v4: uuidv4 } = require('uuid');

// En producción, usar Redis o base de datos
const sessions = new Map();

async function createSession() {
    const sessionId = uuidv4();
    const session = {
        id: sessionId,
        history: [],
        createdAt: new Date(),
        lastActivity: new Date()
    };
    
    sessions.set(sessionId, session);
    
    // Limpiar sesiones viejas (más de 1 hora)
    cleanOldSessions();
    
    return session;
}

async function getSession(sessionId) {
    if (!sessionId || !sessions.has(sessionId)) {
        return await createSession();
    }
    
    const session = sessions.get(sessionId);
    session.lastActivity = new Date();
    return session;
}

async function updateSession(sessionId, data) {
    const session = await getSession(sessionId);
    
    session.history.push({
        role: 'user',
        message: data.message,
        timestamp: new Date()
    });
    
    session.history.push({
        role: 'assistant',
        message: data.response,
        timestamp: new Date()
    });
    
    // Mantener solo últimos 20 mensajes
    if (session.history.length > 20) {
        session.history = session.history.slice(-20);
    }
    
    session.lastActivity = new Date();
    sessions.set(sessionId, session);
    
    return session;
}

function cleanOldSessions() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    for (const [sessionId, session] of sessions.entries()) {
        if (session.lastActivity < oneHourAgo) {
            sessions.delete(sessionId);
        }
    }
}

module.exports = {
    createSession,
    getSession,
    updateSession
};
`;
        
        fs.writeFileSync(`${this.outputDir}/backend/services/sessionManager.js`, sessionManagerCode);
    }

    generateChatWidget() {
        const widgetCode = `// Web Chatbot Widget - ${this.config.businessName}
(function() {
    const API_URL = 'http://localhost:3000/api/chat'; // Cambiar en producción
    const PRIMARY_COLOR = '${this.config.primaryColor}';
    let sessionId = null;
    let isOpen = false;

    // Estilos del widget
    const styles = \`
        #chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        #chatbot-button {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: \${PRIMARY_COLOR};
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }

        #chatbot-button:hover {
            transform: scale(1.1);
        }

        #chatbot-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 380px;
            height: 600px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            overflow: hidden;
        }

        #chatbot-window.open {
            display: flex;
        }

        #chatbot-header {
            background: \${PRIMARY_COLOR};
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #chatbot-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f7f7f7;
        }

        .message {
            margin-bottom: 12px;
            display: flex;
        }

        .message.user {
            justify-content: flex-end;
        }

        .message-content {
            max-width: 70%;
            padding: 12px 16px;
            border-radius: 18px;
            word-wrap: break-word;
        }

        .message.user .message-content {
            background: \${PRIMARY_COLOR};
            color: white;
        }

        .message.bot .message-content {
            background: white;
            color: #333;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        #chatbot-input-area {
            padding: 16px;
            background: white;
            border-top: 1px solid #e0e0e0;
            display: flex;
            gap: 8px;
        }

        #chatbot-input {
            flex: 1;
            padding: 12px;
            border: 1px solid #e0e0e0;
            border-radius: 24px;
            outline: none;
        }

        #chatbot-send {
            padding: 12px 20px;
            background: \${PRIMARY_COLOR};
            color: white;
            border: none;
            border-radius: 24px;
            cursor: pointer;
        }

        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px;
        }

        .typing-indicator span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #999;
            animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
        }
    \`;

    // Inyectar estilos
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Crear HTML del widget
    const widgetHTML = \`
        <div id="chatbot-container">
            <button id="chatbot-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
            <div id="chatbot-window">
                <div id="chatbot-header">
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">${this.config.businessName}</div>
                        <div style="font-size: 12px; opacity: 0.9;">Asistente Virtual</div>
                    </div>
                    <button id="chatbot-close" style="background: none; border: none; color: white; cursor: pointer; font-size: 24px;">&times;</button>
                </div>
                <div id="chatbot-messages"></div>
                <div id="chatbot-input-area">
                    <input type="text" id="chatbot-input" placeholder="Escribe tu mensaje..." />
                    <button id="chatbot-send">Enviar</button>
                </div>
            </div>
        </div>
    \`;

    // Insertar widget en la página
    document.addEventListener('DOMContentLoaded', function() {
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
        initializeChatbot();
    });

    function initializeChatbot() {
        const button = document.getElementById('chatbot-button');
        const closeBtn = document.getElementById('chatbot-close');
        const window = document.getElementById('chatbot-window');
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');

        button.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        // Iniciar sesión
        startSession();
    }

    async function startSession() {
        try {
            const response = await fetch(\`\${API_URL}/session/new\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            sessionId = data.sessionId;
            addMessage('bot', data.welcomeMessage);
        } catch (error) {
            console.error('Error starting session:', error);
        }
    }

    function toggleChat() {
        isOpen = !isOpen;
        const window = document.getElementById('chatbot-window');
        window.classList.toggle('open', isOpen);
    }

    async function sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        addMessage('user', message);
        input.value = '';

        showTypingIndicator();

        try {
            const response = await fetch(\`\${API_URL}/message\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, sessionId })
            });

            const data = await response.json();
            hideTypingIndicator();
            addMessage('bot', data.response);
            
        } catch (error) {
            hideTypingIndicator();
            addMessage('bot', 'Lo siento, hubo un error. Por favor intenta de nuevo.');
            console.error('Error sending message:', error);
        }
    }

    function addMessage(type, text) {
        const messagesDiv = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = \`message \${type}\`;
        messageDiv.innerHTML = \`<div class="message-content">\${text}</div>\`;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function showTypingIndicator() {
        const messagesDiv = document.getElementById('chatbot-messages');
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'message bot';
        indicator.innerHTML = \`
            <div class="message-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        \`;
        messagesDiv.appendChild(indicator);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }
})();
`;
        
        fs.writeFileSync(`${this.outputDir}/widget/chatbot.js`, widgetCode);
    }

    generateEmbedCode() {
        const embedCode = `<!-- Web Chatbot - ${this.config.businessName} -->
<!-- Copiar y pegar antes del cierre del tag </body> -->

<script src="http://localhost:3000/widget/chatbot.js"></script>

<!-- 
IMPORTANTE: 
En producción, cambiar localhost:3000 por tu dominio real.
Ejemplo: https://tu-dominio.com/widget/chatbot.js
-->`;
        
        fs.writeFileSync(`${this.outputDir}/EMBED-CODE.html`, embedCode);
    }

    generateAdminPanel() {
        // Panel de administración básico (para futuras versiones)
        const adminHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel - ${this.config.businessName} Chatbot</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Panel de Administración - Chatbot</h1>
        
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Estadísticas</h2>
            <div class="grid grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded">
                    <div class="text-2xl font-bold text-blue-600">0</div>
                    <div class="text-sm text-gray-600">Conversaciones Hoy</div>
                </div>
                <div class="bg-green-50 p-4 rounded">
                    <div class="text-2xl font-bold text-green-600">0</div>
                    <div class="text-sm text-gray-600">Mensajes Totales</div>
                </div>
                <div class="bg-purple-50 p-4 rounded">
                    <div class="text-2xl font-bold text-purple-600">0</div>
                    <div class="text-sm text-gray-600">Sesiones Activas</div>
                </div>
            </div>
        </div>

        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p class="font-semibold">🚧 En Desarrollo</p>
            <p class="text-sm">Panel de administración completo próximamente con:</p>
            <ul class="list-disc list-inside text-sm mt-2">
                <li>Analytics detallados</li>
                <li>Historial de conversaciones</li>
                <li>Configuración del bot</li>
                <li>Reportes y exportación</li>
            </ul>
        </div>
    </div>
</body>
</html>`;
        
        fs.writeFileSync(`${this.outputDir}/admin/index.html`, adminHTML);
    }

    generateReadme() {
        const readmeContent = `# Web Chatbot - ${this.config.businessName}

Widget de chat con IA para sitio web, completamente funcional.

## 🚀 Instalación Rápida

\`\`\`bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables
cp .env.example .env
# Editar .env con tus credenciales

# 3. Iniciar servidor
npm start
\`\`\`

## 📋 Integración en Sitio Web

### Opción 1: Script Directo
Agregar antes del cierre de \`</body>\`:

\`\`\`html
<script src="http://tu-servidor.com:3000/widget/chatbot.js"></script>
\`\`\`

### Opción 2: Código Completo
Ver archivo \`EMBED-CODE.html\` para el código completo.

## ⚙️ Configuración

### Variables de Entorno
- \`ANTHROPIC_API_KEY\`: Tu API key de Claude
- \`ALLOWED_ORIGINS\`: Dominios permitidos (separados por coma)
- \`PRIMARY_COLOR\`: Color principal del widget (hex)

### Personalización del Widget

Editar \`widget/chatbot.js\`:
- Colores y estilos (línea 8-120)
- Textos y mensajes (línea 280)
- Comportamiento (función \`sendMessage\`)

### Personalización de la IA

Editar \`backend/services/aiService.js\`:
- Personalidad del bot (BUSINESS_CONTEXT)
- Respuestas y lógica
- Integración con otros servicios

## 📊 Características

${this.config.features.map(f => `- ${f}`).join('\n')}

## 🔧 Próximas Mejoras

- [ ] Panel de administración completo
- [ ] Analytics en tiempo real
- [ ] Exportar conversaciones
- [ ] Respuestas predefinidas
- [ ] Integración con CRM
- [ ] Soporte multi-idioma

## 💰 Costo de Operación

Estimado para 1,000 conversaciones/mes:
- Claude API: ~€20-30
- Hosting: €5-10 (Railway/Render)
- Total: €25-40/mes

## 📞 Soporte

Widget generado por AI Solution Generator
`;
        
        fs.writeFileSync(`${this.outputDir}/README.md`, readmeContent);
    }
}

// Uso del generador
if (require.main === module) {
    const generator = new WebChatbotGenerator({
        businessName: 'TechStore',
        industry: 'ecommerce',
        websiteUrl: 'https://techstore.com',
        primaryColor: '#6366f1',
        personality: 'amigable, conocedor de tecnología y proactivo',
        features: ['product-info', 'customer-support', 'lead-qualification'],
        language: 'español',
        outputDir: './generated-web-chatbot'
    });

    generator.generate();
}

module.exports = WebChatbotGenerator;
