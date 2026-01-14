// ============================================
// GENERADOR DE VOICE AGENT
// Sistema de llamadas con IA usando Vapi.ai o Twilio Voice
// ============================================

const fs = require('fs');
const path = require('path');

class VoiceAgentGenerator {
    constructor(config) {
        this.config = {
            businessName: config.businessName || 'Mi Negocio',
            industry: config.industry || 'general',
            voiceType: config.voiceType || 'female', // female/male
            language: config.language || 'es-ES',
            personality: config.personality || 'profesional y amigable',
            features: config.features || [],
            useCase: config.useCase || 'inbound' // inbound/outbound/both
        };
        this.outputDir = config.outputDir || './generated-voice-agent';
    }

    generate() {
        console.log('📞 Generando Voice Agent...');
        
        this.createProjectStructure();
        this.generateEnvFile();
        this.generatePackageJson();
        this.generateMainServer();
        this.generateVapiConfig();
        this.generateCallHandler();
        this.generateTranscriptionService();
        this.generateOutboundCaller();
        this.generateReadme();
        
        console.log('✅ Voice Agent generado exitosamente en:', this.outputDir);
        console.log('\n📋 Próximos pasos:');
        console.log('1. cd ' + this.outputDir);
        console.log('2. npm install');
        console.log('3. Configurar .env con credenciales de Vapi/Twilio');
        console.log('4. npm start');
        console.log('5. Configurar webhook en Vapi dashboard');
    }

    createProjectStructure() {
        const dirs = [
            this.outputDir,
            `${this.outputDir}/src`,
            `${this.outputDir}/src/handlers`,
            `${this.outputDir}/src/services`,
            `${this.outputDir}/src/config`,
            `${this.outputDir}/logs`,
            `${this.outputDir}/recordings`
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    generateEnvFile() {
        const envContent = `# Vapi.ai Configuration (Recomendado)
VAPI_API_KEY=your_vapi_api_key
VAPI_PHONE_NUMBER=your_vapi_phone_number
VAPI_ASSISTANT_ID=your_assistant_id

# Twilio Configuration (Alternativa)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# AI Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key
AI_MODEL=claude-sonnet-4-5-20250929

# ElevenLabs (Text-to-Speech)
ELEVENLABS_API_KEY=your_elevenlabs_key
ELEVENLABS_VOICE_ID=your_voice_id

# Application
PORT=3000
NODE_ENV=development

# Business Configuration
BUSINESS_NAME=${this.config.businessName}
BUSINESS_INDUSTRY=${this.config.industry}
VOICE_TYPE=${this.config.voiceType}
LANGUAGE=${this.config.language}
`;
        
        fs.writeFileSync(`${this.outputDir}/.env.example`, envContent);
    }

    generatePackageJson() {
        const packageJson = {
            name: `voice-agent-${this.config.businessName.toLowerCase().replace(/\s+/g, '-')}`,
            version: '1.0.0',
            description: `Voice AI Agent para ${this.config.businessName}`,
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
                'axios': '^1.6.0',
                'body-parser': '^1.20.2',
                'ws': '^8.14.2',
                'elevenlabs-node': '^1.0.0'
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
const callHandler = require('./handlers/callHandler');
const outboundCaller = require('./services/outboundCaller');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'online',
        service: 'Voice AI Agent - ${this.config.businessName}',
        timestamp: new Date().toISOString()
    });
});

// Webhook para llamadas entrantes (Vapi/Twilio)
app.post('/webhook/call', callHandler.handleInbound);

// Webhook para eventos de llamada
app.post('/webhook/events', callHandler.handleEvents);

// API para realizar llamadas salientes
app.post('/api/call/outbound', async (req, res) => {
    try {
        const { phoneNumber, context } = req.body;
        
        if (!phoneNumber) {
            return res.status(400).json({ error: 'Phone number required' });
        }

        const result = await outboundCaller.makeCall({
            to: phoneNumber,
            context: context || {}
        });

        res.json(result);
    } catch (error) {
        console.error('Error making outbound call:', error);
        res.status(500).json({ error: 'Failed to make call' });
    }
});

// Webhook para transcripciones
app.post('/webhook/transcription', callHandler.handleTranscription);

app.listen(PORT, () => {
    console.log(\`📞 Voice Agent running on port \${PORT}\`);
    console.log(\`🏢 Business: ${this.config.businessName}\`);
    console.log(\`🔊 Voice Type: ${this.config.voiceType}\`);
    console.log(\`🌍 Language: ${this.config.language}\`);
    console.log(\`🔌 Webhook: http://localhost:\${PORT}/webhook/call\`);
});
`;
        
        fs.writeFileSync(`${this.outputDir}/src/index.js`, serverCode);
    }

    generateVapiConfig() {
        const vapiConfigCode = `// Configuración del asistente de Vapi.ai

const VAPI_ASSISTANT_CONFIG = {
    name: "${this.config.businessName} Voice Agent",
    model: {
        provider: "anthropic",
        model: "claude-sonnet-4-5-20250929",
        systemPrompt: \`
Eres un asistente telefónico de IA para ${this.config.businessName}.

Industria: ${this.config.industry}
Personalidad: ${this.config.personality}
Idioma: ${this.config.language}

Tu trabajo en llamadas es:
${this.config.features.includes('appointment-booking') ? '- Agendar citas consultando disponibilidad' : ''}
${this.config.features.includes('lead-qualification') ? '- Calificar leads y recopilar información de contacto' : ''}
${this.config.features.includes('customer-support') ? '- Responder preguntas frecuentes de clientes' : ''}
${this.config.features.includes('sales') ? '- Presentar productos/servicios y cerrar ventas' : ''}

IMPORTANTE:
- Habla de manera natural y conversacional
- Escucha activamente - no interrumpas
- Sé breve - máximo 2-3 frases por respuesta
- Si no entiendes, pide aclaración educadamente
- Usa lenguaje simple y claro
- Confirma información importante repitiendo
\`
    },
    voice: {
        provider: "elevenlabs",
        voiceId: process.env.ELEVENLABS_VOICE_ID,
        language: "${this.config.language}",
        speed: 1.0,
        pitch: 1.0
    },
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "${this.config.language}",
        smartFormat: true
    },
    firstMessage: "¡Hola! Gracias por llamar a ${this.config.businessName}. ¿En qué puedo ayudarte hoy?",
    voicemailMessage: "Hola, has llamado a ${this.config.businessName}. Por favor deja tu mensaje después del tono.",
    endCallMessage: "Gracias por llamar a ${this.config.businessName}. ¡Que tengas un excelente día!",
    endCallPhrases: ["adiós", "hasta luego", "gracias adiós", "eso es todo"],
    recordingEnabled: true,
    analysisPlan: {
        summaryPrompt: "Genera un resumen breve de esta llamada incluyendo: propósito, resultado y próximos pasos.",
        structuredDataPrompt: "Extrae: nombre, teléfono, email, nivel de interés (alto/medio/bajo), próxima acción requerida."
    }
};

async function createVapiAssistant() {
    const axios = require('axios');
    
    try {
        const response = await axios.post(
            'https://api.vapi.ai/assistant',
            VAPI_ASSISTANT_CONFIG,
            {
                headers: {
                    'Authorization': \`Bearer \${process.env.VAPI_API_KEY}\`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Asistente Vapi creado:', response.data.id);
        console.log('⚠️  Guardar este ID en .env como VAPI_ASSISTANT_ID');
        
        return response.data;
    } catch (error) {
        console.error('❌ Error creating Vapi assistant:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = {
    VAPI_ASSISTANT_CONFIG,
    createVapiAssistant
};
`;
        
        fs.writeFileSync(`${this.outputDir}/src/config/vapiConfig.js`, vapiConfigCode);
    }

    generateCallHandler() {
        const callHandlerCode = `const transcriptionService = require('../services/transcriptionService');
const fs = require('fs');
const path = require('path');

// Almacenar llamadas activas (en producción usar Redis)
const activeCalls = new Map();

// Manejar llamadas entrantes
async function handleInbound(req, res) {
    try {
        const callId = req.body.call?.id || req.body.CallSid;
        const from = req.body.call?.from || req.body.From;
        
        console.log(\`📞 Llamada entrante de: \${from}\`);
        
        // Registrar llamada
        activeCalls.set(callId, {
            id: callId,
            from: from,
            startTime: new Date(),
            transcription: [],
            status: 'active'
        });

        // Para Vapi - no necesitas responder, Vapi maneja todo
        // Para Twilio - necesitas TwiML
        if (req.body.CallSid) {
            // Respuesta TwiML para Twilio
            const twiml = \`<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-ES">Hola, gracias por llamar a ${this.config.businessName}. Un momento por favor.</Say>
    <Redirect>/webhook/handle-conversation</Redirect>
</Response>\`;
            res.type('text/xml');
            res.send(twiml);
        } else {
            // Vapi maneja todo automáticamente
            res.json({ success: true });
        }

    } catch (error) {
        console.error('❌ Error handling inbound call:', error);
        res.status(500).json({ error: 'Error processing call' });
    }
}

// Manejar eventos de llamada
async function handleEvents(req, res) {
    try {
        const event = req.body;
        
        console.log('📊 Call event:', event.type);

        switch (event.type) {
            case 'call-started':
                console.log(\`✅ Llamada iniciada: \${event.call.id}\`);
                break;
                
            case 'call-ended':
                await handleCallEnd(event.call);
                break;
                
            case 'transcript':
                await handleTranscript(event);
                break;
                
            case 'speech-update':
                console.log(\`🗣️  Speech: \${event.speech.transcript}\`);
                break;
        }

        res.json({ success: true });
        
    } catch (error) {
        console.error('❌ Error handling event:', error);
        res.status(500).json({ error: 'Error processing event' });
    }
}

// Manejar fin de llamada
async function handleCallEnd(call) {
    try {
        console.log(\`📞 Llamada finalizada: \${call.id}\`);
        console.log(\`⏱️  Duración: \${call.duration} segundos\`);
        
        const callData = activeCalls.get(call.id);
        
        if (callData) {
            // Guardar grabación si está disponible
            if (call.recording) {
                await saveRecording(call);
            }

            // Guardar transcripción
            await saveTranscription(call.id, callData.transcription);

            // Análisis post-llamada
            await analyzeCall(call);

            // Limpiar de memoria
            activeCalls.delete(call.id);
        }

    } catch (error) {
        console.error('❌ Error handling call end:', error);
    }
}

// Manejar transcripción en tiempo real
async function handleTranscript(event) {
    try {
        const callId = event.call.id;
        const transcript = event.transcript;
        
        const callData = activeCalls.get(callId);
        if (callData) {
            callData.transcription.push({
                role: transcript.role, // user o assistant
                text: transcript.text,
                timestamp: new Date()
            });
        }

    } catch (error) {
        console.error('❌ Error handling transcript:', error);
    }
}

// Guardar grabación
async function saveRecording(call) {
    try {
        // TODO: Descargar y guardar archivo de audio
        const recordingPath = path.join(__dirname, '../../recordings', \`\${call.id}.mp3\`);
        console.log(\`💾 Grabación guardada: \${recordingPath}\`);
    } catch (error) {
        console.error('❌ Error saving recording:', error);
    }
}

// Guardar transcripción
async function saveTranscription(callId, transcription) {
    try {
        const filePath = path.join(__dirname, '../../logs', \`\${callId}_transcript.json\`);
        fs.writeFileSync(filePath, JSON.stringify(transcription, null, 2));
        console.log(\`📝 Transcripción guardada: \${filePath}\`);
    } catch (error) {
        console.error('❌ Error saving transcription:', error);
    }
}

// Analizar llamada
async function analyzeCall(call) {
    try {
        // TODO: Enviar a CRM, analytics, etc.
        console.log(\`📊 Análisis de llamada: \${call.id}\`);
        
        if (call.analysis) {
            console.log('Resumen:', call.analysis.summary);
            console.log('Datos estructurados:', call.analysis.structuredData);
            
            // Aquí puedes enviar a CRM, base de datos, etc.
        }
    } catch (error) {
        console.error('❌ Error analyzing call:', error);
    }
}

// Manejar transcripción final
async function handleTranscription(req, res) {
    try {
        const transcription = req.body;
        console.log('📝 Transcripción recibida:', transcription);
        
        // Guardar o procesar transcripción
        await transcriptionService.process(transcription);
        
        res.json({ success: true });
    } catch (error) {
        console.error('❌ Error handling transcription:', error);
        res.status(500).json({ error: 'Error processing transcription' });
    }
}

module.exports = {
    handleInbound,
    handleEvents,
    handleTranscription
};
`;
        
        fs.writeFileSync(`${this.outputDir}/src/handlers/callHandler.js`, callHandlerCode);
    }

    generateTranscriptionService() {
        const transcriptionCode = `// Servicio para procesar transcripciones

async function process(transcription) {
    try {
        console.log('📝 Procesando transcripción...');
        
        // Extraer información clave
        const insights = await extractInsights(transcription);
        
        // Guardar en base de datos
        await saveToDatabase(transcription, insights);
        
        // Enviar notificaciones si es necesario
        await sendNotifications(insights);
        
        return insights;
        
    } catch (error) {
        console.error('Error processing transcription:', error);
        throw error;
    }
}

async function extractInsights(transcription) {
    // TODO: Usar Claude para extraer:
    // - Intención del cliente
    // - Nivel de satisfacción
    // - Información de contacto
    // - Próximos pasos
    
    return {
        intent: 'unknown',
        sentiment: 'neutral',
        actionItems: []
    };
}

async function saveToDatabase(transcription, insights) {
    // TODO: Guardar en base de datos
    console.log('💾 Guardando en BD...');
}

async function sendNotifications(insights) {
    // TODO: Enviar emails, Slack, etc. si es necesario
    if (insights.highPriority) {
        console.log('🔔 Enviando notificación urgente...');
    }
}

module.exports = {
    process,
    extractInsights
};
`;
        
        fs.writeFileSync(`${this.outputDir}/src/services/transcriptionService.js`, transcriptionCode);
    }

    generateOutboundCaller() {
        const outboundCode = `const axios = require('axios');

// Realizar llamada saliente
async function makeCall({ to, context }) {
    try {
        console.log(\`📞 Realizando llamada a: \${to}\`);

        // Usando Vapi.ai
        if (process.env.VAPI_API_KEY) {
            return await makeVapiCall(to, context);
        }
        
        // Alternativa: Twilio
        if (process.env.TWILIO_ACCOUNT_SID) {
            return await makeTwilioCall(to, context);
        }

        throw new Error('No call provider configured');

    } catch (error) {
        console.error('❌ Error making call:', error);
        throw error;
    }
}

async function makeVapiCall(to, context) {
    try {
        const response = await axios.post(
            'https://api.vapi.ai/call',
            {
                assistantId: process.env.VAPI_ASSISTANT_ID,
                phoneNumber: to,
                metadata: context
            },
            {
                headers: {
                    'Authorization': \`Bearer \${process.env.VAPI_API_KEY}\`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(\`✅ Llamada iniciada: \${response.data.id}\`);
        return {
            success: true,
            callId: response.data.id,
            status: response.data.status
        };

    } catch (error) {
        console.error('❌ Error with Vapi call:', error.response?.data || error.message);
        throw error;
    }
}

async function makeTwilioCall(to, context) {
    const twilio = require('twilio');
    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    try {
        const call = await client.calls.create({
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER,
            url: \`\${process.env.BASE_URL}/webhook/call\`,
            statusCallback: \`\${process.env.BASE_URL}/webhook/status\`
        });

        console.log(\`✅ Llamada iniciada: \${call.sid}\`);
        return {
            success: true,
            callId: call.sid,
            status: call.status
        };

    } catch (error) {
        console.error('❌ Error with Twilio call:', error);
        throw error;
    }
}

// Hacer llamadas en lote
async function makeBulkCalls(phoneNumbers, context) {
    const results = [];
    
    for (const number of phoneNumbers) {
        try {
            const result = await makeCall({ to: number, context });
            results.push({ number, ...result });
            
            // Esperar entre llamadas para no saturar
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            results.push({ 
                number, 
                success: false, 
                error: error.message 
            });
        }
    }
    
    return results;
}

module.exports = {
    makeCall,
    makeBulkCalls
};
`;
        
        fs.writeFileSync(`${this.outputDir}/src/services/outboundCaller.js`, outboundCode);
    }

    generateReadme() {
        const readmeContent = `# Voice AI Agent - ${this.config.businessName}

Sistema completo de llamadas con IA usando Vapi.ai.

## 🚀 Instalación

\`\`\`bash
npm install
cp .env.example .env
# Configurar .env
npm start
\`\`\`

## 📋 Configuración

### 1. Cuenta Vapi.ai
1. Crear cuenta: https://vapi.ai
2. Obtener API Key
3. Crear asistente o usar script:
\`\`\`bash
node src/config/vapiConfig.js
\`\`\`

### 2. ElevenLabs (Voz)
1. Crear cuenta: https://elevenlabs.io
2. Elegir voz
3. Obtener API Key y Voice ID

### 3. Configurar Webhook
En Vapi dashboard:
- Server URL: \`https://tu-dominio.com/webhook/call\`
- Events URL: \`https://tu-dominio.com/webhook/events\`

## 🎯 Casos de Uso

### Llamadas Entrantes
El sistema responde automáticamente cuando alguien llama.

### Llamadas Salientes
\`\`\`bash
curl -X POST http://localhost:3000/api/call/outbound \\
  -H "Content-Type: application/json" \\
  -d '{"phoneNumber": "+1234567890", "context": {"campaign": "promo"}}'
\`\`\`

### Llamadas en Lote
Ver \`src/services/outboundCaller.js\` - función \`makeBulkCalls\`

## 📊 Características

${this.config.features.map(f => `- ${f}`).join('\n')}

## 🎤 Personalización de Voz

Editar \`src/config/vapiConfig.js\`:
- \`systemPrompt\`: Personalidad y comportamiento
- \`voice\`: Configuración de voz (velocidad, tono)
- \`firstMessage\`: Mensaje de bienvenida
- \`endCallPhrases\`: Frases para terminar llamada

## 💰 Costos

Estimado para 1,000 llamadas/mes (promedio 3 min cada una):
- Vapi.ai: ~€200-300 (incluye transcripción)
- ElevenLabs: ~€100-150 (TTS)
- Twilio (si usas): ~€50-100 (minutos)
- Total: €350-550/mes

**Precio al cliente: €2,000-5,000 setup + €800-1,500/mes**
**Tu margen: €250-950/mes RECURRENTE**

## 🚧 Próximas Mejoras

- [ ] Dashboard de llamadas en tiempo real
- [ ] Analytics y reportes
- [ ] Integración con CRM
- [ ] Campañas automatizadas
- [ ] A/B testing de scripts

## 📞 Soporte

Voice Agent generado por AI Solution Generator
`;
        
        fs.writeFileSync(`${this.outputDir}/README.md`, readmeContent);
    }
}

// Uso del generador
if (require.main === module) {
    const generator = new VoiceAgentGenerator({
        businessName: 'Clínica Dental',
        industry: 'salud',
        voiceType: 'female',
        language: 'es-ES',
        personality: 'profesional, cálida y empática',
        features: ['appointment-booking', 'customer-support', 'lead-qualification'],
        useCase: 'both',
        outputDir: './generated-voice-agent'
    });

    generator.generate();
}

module.exports = VoiceAgentGenerator;
