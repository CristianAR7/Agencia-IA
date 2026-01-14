// ============================================
// GENERADOR UNIVERSAL - ORQUESTADOR MAESTRO
// Detecta necesidades y genera solución completa automáticamente
// ============================================

const WhatsAppAgentGenerator = require('./whatsappAgentGenerator');
const WebChatbotGenerator = require('./webChatbotGenerator');
const VoiceAgentGenerator = require('./voiceAgentGenerator');
const LandingPageGenerator = require('./landingPageGenerator');
const fs = require('fs');
const path = require('path');

class UniversalSolutionGenerator {
    constructor(clientData) {
        this.clientData = clientData;
        this.projectName = clientData.businessName.toLowerCase().replace(/\s+/g, '-');
        this.outputDir = `./generated-solution-${this.projectName}`;
        this.components = [];
    }

    async generate() {
        console.log('\n╔══════════════════════════════════════════════════════════╗');
        console.log('║                                                          ║');
        console.log('║       🚀 GENERADOR UNIVERSAL DE SOLUCIONES IA           ║');
        console.log('║                                                          ║');
        console.log('╚══════════════════════════════════════════════════════════╝\n');

        console.log(\`📊 Cliente: \${this.clientData.businessName}\`);
        console.log(\`🏭 Industria: \${this.clientData.industry}\`);
        console.log(\`🎯 Soluciones: \${this.clientData.solutionTypes.join(', ')}\`);
        console.log(\`💰 Presupuesto: \${this.clientData.budget}\n\`);

        // Paso 1: Analizar necesidades
        console.log('🧠 PASO 1: Analizando necesidades...');
        const analysis = await this.analyzeClientNeeds();
        
        // Paso 2: Crear estructura del proyecto
        console.log('📁 PASO 2: Creando estructura del proyecto...');
        this.createProjectStructure();
        
        // Paso 3: Generar componentes solicitados
        console.log('⚙️  PASO 3: Generando componentes...\n');
        await this.generateComponents();
        
        // Paso 4: Crear integración entre componentes
        console.log('\n🔗 PASO 4: Integrando componentes...');
        this.integrateComponents();
        
        // Paso 5: Generar documentación maestra
        console.log('📝 PASO 5: Generando documentación...');
        this.generateMasterDocumentation(analysis);
        
        // Paso 6: Generar propuesta comercial
        console.log('💼 PASO 6: Generando propuesta comercial...');
        this.generateCommercialProposal(analysis);

        console.log('\n╔══════════════════════════════════════════════════════════╗');
        console.log('║                                                          ║');
        console.log('║          ✅ SOLUCIÓN GENERADA EXITOSAMENTE              ║');
        console.log('║                                                          ║');
        console.log('╚══════════════════════════════════════════════════════════╝\n');

        this.printSummary(analysis);
    }

    async analyzeClientNeeds() {
        // Aquí iría llamada a Claude API para análisis profundo
        // Por ahora, análisis basado en reglas

        const analysis = {
            complexity: this.calculateComplexity(),
            estimatedTime: this.estimateTime(),
            estimatedCost: this.estimateCost(),
            techStack: this.determineTechStack(),
            recommendations: this.generateRecommendations()
        };

        return analysis;
    }

    calculateComplexity() {
        let score = 0;
        score += this.clientData.solutionTypes.length * 2;
        score += this.clientData.goals.length;
        
        if (this.clientData.volume === 'high' || this.clientData.volume === 'enterprise') {
            score += 2;
        }

        if (score <= 4) return 'low';
        if (score <= 8) return 'medium';
        return 'high';
    }

    estimateTime() {
        let weeks = 1;
        
        if (this.clientData.solutionTypes.includes('whatsapp-agent')) weeks += 1;
        if (this.clientData.solutionTypes.includes('voice-agent')) weeks += 2;
        if (this.clientData.solutionTypes.includes('web-chatbot')) weeks += 1;
        if (this.clientData.solutionTypes.includes('landing-page')) weeks += 0.5;

        return \`\${weeks}-\${weeks + 1} semanas\`;
    }

    estimateCost() {
        let setupFee = 0;
        let monthly = 0;

        // Costos por componente
        if (this.clientData.solutionTypes.includes('whatsapp-agent')) {
            setupFee += 1200;
            monthly += 250;
        }
        if (this.clientData.solutionTypes.includes('voice-agent')) {
            setupFee += 3000;
            monthly += 800;
        }
        if (this.clientData.solutionTypes.includes('web-chatbot')) {
            setupFee += 600;
            monthly += 150;
        }
        if (this.clientData.solutionTypes.includes('landing-page')) {
            setupFee += 400;
            monthly += 50;
        }

        // Descuento por bundle
        if (this.clientData.solutionTypes.length >= 3) {
            setupFee *= 0.85; // 15% descuento
        }

        return {
            setup: Math.round(setupFee),
            monthly: Math.round(monthly),
            annualSavings: Math.round(monthly * 12 * 0.1) // estimado
        };
    }

    determineTechStack() {
        const stack = {
            backend: ['Node.js', 'Express'],
            ai: ['Claude API (Anthropic)'],
            database: ['PostgreSQL/Supabase'],
            frontend: [],
            integrations: [],
            deployment: ['Vercel/Railway']
        };

        if (this.clientData.solutionTypes.includes('whatsapp-agent')) {
            stack.integrations.push('Twilio WhatsApp API');
        }
        if (this.clientData.solutionTypes.includes('voice-agent')) {
            stack.integrations.push('Vapi.ai', 'ElevenLabs TTS');
        }
        if (this.clientData.solutionTypes.includes('web-chatbot')) {
            stack.frontend.push('React', 'Tailwind CSS');
        }
        if (this.clientData.solutionTypes.includes('landing-page')) {
            stack.frontend.push('HTML5', 'CSS3', 'JavaScript');
        }

        if (this.clientData.goals.includes('appointment-booking')) {
            stack.integrations.push('Google Calendar API');
        }

        return stack;
    }

    generateRecommendations() {
        const recommendations = [];

        // Basado en industria
        if (this.clientData.industry === 'salud') {
            recommendations.push('Asegurar cumplimiento GDPR para datos médicos');
            recommendations.push('Incluir disclaimers médicos en conversaciones');
        }
        
        if (this.clientData.industry === 'ecommerce') {
            recommendations.push('Integrar con plataforma de pagos');
            recommendations.push('Sistema de seguimiento de pedidos');
        }

        // Basado en volumen
        if (this.clientData.volume === 'high' || this.clientData.volume === 'enterprise') {
            recommendations.push('Implementar Redis para caché');
            recommendations.push('Configurar auto-scaling');
            recommendations.push('Monitoreo 24/7 con alertas');
        }

        // Basado en objetivos
        if (this.clientData.goals.includes('lead-qualification')) {
            recommendations.push('Integrar con CRM (HubSpot/Pipedrive)');
            recommendations.push('Configurar scoring automático de leads');
        }

        return recommendations;
    }

    createProjectStructure() {
        const dirs = [
            this.outputDir,
            \`\${this.outputDir}/components\`,
            \`\${this.outputDir}/shared\`,
            \`\${this.outputDir}/docs\`,
            \`\${this.outputDir}/deployment\`
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    async generateComponents() {
        const componentDir = \`\${this.outputDir}/components\`;

        // WhatsApp Agent
        if (this.clientData.solutionTypes.includes('whatsapp-agent')) {
            console.log('  📱 Generando WhatsApp Agent...');
            const generator = new WhatsAppAgentGenerator({
                businessName: this.clientData.businessName,
                industry: this.clientData.industry,
                features: this.clientData.goals,
                personality: this.determinePersonality(),
                language: 'español',
                outputDir: \`\${componentDir}/whatsapp-agent\`
            });
            generator.generate();
            this.components.push('whatsapp-agent');
        }

        // Voice Agent
        if (this.clientData.solutionTypes.includes('voice-agent')) {
            console.log('  📞 Generando Voice Agent...');
            const generator = new VoiceAgentGenerator({
                businessName: this.clientData.businessName,
                industry: this.clientData.industry,
                voiceType: 'female',
                language: 'es-ES',
                personality: this.determinePersonality(),
                features: this.clientData.goals,
                useCase: 'both',
                outputDir: \`\${componentDir}/voice-agent\`
            });
            generator.generate();
            this.components.push('voice-agent');
        }

        // Web Chatbot
        if (this.clientData.solutionTypes.includes('web-chatbot')) {
            console.log('  💬 Generando Web Chatbot...');
            const generator = new WebChatbotGenerator({
                businessName: this.clientData.businessName,
                industry: this.clientData.industry,
                websiteUrl: 'https://example.com',
                primaryColor: '#6366f1',
                personality: this.determinePersonality(),
                features: this.clientData.goals,
                language: 'español',
                outputDir: \`\${componentDir}/web-chatbot\`
            });
            generator.generate();
            this.components.push('web-chatbot');
        }

        // Landing Page
        if (this.clientData.solutionTypes.includes('landing-page')) {
            console.log('  🎨 Generando Landing Page...');
            const generator = new LandingPageGenerator({
                businessName: this.clientData.businessName,
                industry: this.clientData.industry,
                offer: \`Automatiza tu \${this.clientData.industry} con IA\`,
                ctaText: 'Solicitar Demo',
                colors: {
                    primary: '#6366f1',
                    secondary: '#ec4899',
                    background: '#ffffff'
                },
                features: this.clientData.goals,
                includeChat: this.clientData.solutionTypes.includes('web-chatbot'),
                outputDir: \`\${componentDir}/landing-page\`
            });
            generator.generate();
            this.components.push('landing-page');
        }
    }

    determinePersonality() {
        const industryPersonalities = {
            'salud': 'profesional, empático y tranquilizador',
            'ecommerce': 'amigable, proactivo y orientado a ventas',
            'inmobiliaria': 'profesional, confiable y consultivo',
            'restaurante': 'cálido, eficiente y acogedor',
            'servicios': 'profesional, experto y orientado a soluciones',
            'educacion': 'paciente, claro y motivador',
            'fitness': 'energético, motivador y positivo'
        };

        return industryPersonalities[this.clientData.industry] || 'profesional y amigable';
    }

    integrateComponents() {
        // Crear archivo de configuración compartida
        const sharedConfig = {
            businessName: this.clientData.businessName,
            industry: this.clientData.industry,
            components: this.components,
            integrations: {
                database: 'postgresql://...',
                redis: 'redis://...',
                apis: {
                    anthropic: process.env.ANTHROPIC_API_KEY,
                    twilio: process.env.TWILIO_ACCOUNT_SID
                }
            }
        };

        fs.writeFileSync(
            \`\${this.outputDir}/shared/config.json\`,
            JSON.stringify(sharedConfig, null, 2)
        );

        // Crear script de setup conjunto
        const setupScript = \`#!/bin/bash

echo "🚀 Configurando todos los componentes..."

${this.components.map(comp => \`
echo "📦 Configurando \${comp}..."
cd components/\${comp}
cp .env.example .env
npm install
cd ../..
\`).join('')}

echo "✅ Setup completado!"
echo "📝 Ahora configura las variables en cada .env"
\`;

        fs.writeFileSync(\`\${this.outputDir}/setup-all.sh\`, setupScript);
        fs.chmodSync(\`\${this.outputDir}/setup-all.sh\`, '755');
    }

    generateMasterDocumentation(analysis) {
        const masterReadme = \`# ${this.clientData.businessName} - Solución AI Completa

## 🎯 Resumen Ejecutivo

Solución completa de agentes de IA para ${this.clientData.businessName}.

**Componentes incluidos:**
${this.components.map(c => \`- \${c}\`).join('\\n')}

**Stack Tecnológico:**
${Object.entries(analysis.techStack).map(([key, values]) => 
    \`**\${key}**: \${Array.isArray(values) ? values.join(', ') : values}\`
).join('\\n')}

## 📊 Análisis del Proyecto

- **Complejidad**: \${analysis.complexity}
- **Tiempo estimado**: \${analysis.estimatedTime}
- **Costo setup**: €\${analysis.estimatedCost.setup}
- **Costo mensual**: €\${analysis.estimatedCost.monthly}

## 🚀 Inicio Rápido

\`\`\`bash
# 1. Setup automático de todos los componentes
./setup-all.sh

# 2. Configurar variables de entorno
# Editar .env en cada componente

# 3. Iniciar componentes
cd components/[nombre-componente]
npm start
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
${this.projectName}/
├── components/
${this.components.map(c => \`│   ├── \${c}/\`).join('\\n')}
├── shared/
│   └── config.json
├── docs/
│   ├── PROPOSAL.md (Propuesta comercial)
│   ├── IMPLEMENTATION.md (Guía de implementación)
│   └── API.md (Documentación de APIs)
└── deployment/
    └── docker-compose.yml
\`\`\`

## 🔧 Configuración

### Variables de Entorno Compartidas

Todas se configuran en los archivos \`.env\` de cada componente:

\`\`\`env
# AI
ANTHROPIC_API_KEY=sk-ant-...

# Twilio (si aplica)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...

# Database
DATABASE_URL=postgresql://...
\`\`\`

## 📚 Componentes

${this.components.map(comp => \`
### \${comp}
Ver documentación en: \`components/\${comp}/README.md\`
\`).join('\\n')}

## 🎯 Objetivos del Negocio

${this.clientData.goals.map(goal => \`- \${goal}\`).join('\\n')}

## 💡 Recomendaciones

${analysis.recommendations.map(rec => \`- \${rec}\`).join('\\n')}

## 🚀 Roadmap de Implementación

### Semana 1
- Setup de infraestructura
- Configuración de APIs
- Deploy de componentes básicos

### Semana 2-${this.estimateTime().split('-')[1].split(' ')[0]}
- Testing exhaustivo
- Integración de componentes
- Training del equipo del cliente
- Deploy a producción

## 📞 Soporte

Para soporte técnico, contactar a [tu-email@example.com]

---

Solución generada por AI Solution Generator
Fecha: \${new Date().toLocaleDateString('es-ES')}
\`;

        fs.writeFileSync(\`\${this.outputDir}/README.md\`, masterReadme);
    }

    generateCommercialProposal(analysis) {
        const proposal = \`# PROPUESTA COMERCIAL
## ${this.clientData.businessName}

---

## 🎯 Resumen Ejecutivo

Propuesta para implementar solución completa de agentes de IA para automatizar y optimizar las operaciones de ${this.clientData.businessName}.

## 💼 Solución Propuesta

### Componentes a Implementar

${this.components.map((comp, i) => {
    const prices = {
        'whatsapp-agent': { setup: 1200, monthly: 250 },
        'voice-agent': { setup: 3000, monthly: 800 },
        'web-chatbot': { setup: 600, monthly: 150 },
        'landing-page': { setup: 400, monthly: 50 }
    };
    const price = prices[comp] || { setup: 500, monthly: 100 };
    return \`
\${i + 1}. **\${comp.replace('-', ' ').toUpperCase()}**
   - Setup: €\${price.setup}
   - Mensual: €\${price.monthly}
\`;
}).join('\\n')}

### Total Inversión

**Setup (Pago Único):** €${analysis.estimatedCost.setup}
- Incluye desarrollo completo
- Configuración de todas las APIs
- Training del equipo
- Soporte en lanzamiento

**Operación Mensual:** €${analysis.estimatedCost.monthly}
- Hosting y infraestructura
- Costos de APIs (Claude, Twilio, etc.)
- Mantenimiento y actualizaciones
- Soporte técnico

## 📊 ROI Estimado

### Ahorro de Tiempo
Si automatizamos 40 horas/mes de trabajo manual:
- Ahorro: €1,600/mes (asumiendo €40/hora)
- ROI: ${Math.round((1600 / analysis.estimatedCost.monthly) * 100)}% mensual

### Aumento en Conversión
Respuestas 24/7 + calificación automática:
- Estimado: +15-30% en conversión de leads
- Valor anual adicional: €${analysis.estimatedCost.annualSavings * 10}+

### Break-even
Recuperación de inversión inicial: ${Math.ceil(analysis.estimatedCost.setup / (1600 - analysis.estimatedCost.monthly))} meses

## ⏱️ Timeline

**Fase 1 (Semana 1-2):** Setup e infraestructura
**Fase 2 (Semana ${this.estimateTime().split('-')[0]}):** Desarrollo y testing
**Fase 3 (Semana ${this.estimateTime().split('-')[1].split(' ')[0]}):** Training y lanzamiento

**Total:** ${this.estimateTime()}

## ✅ Entregables

- Código fuente completo
- Documentación técnica
- Guías de usuario
- 2 sesiones de training
- 30 días de soporte post-lanzamiento
- Acceso a panel de administración

## 🎁 Garantías

- 14 días de garantía de satisfacción
- Soporte técnico incluido primer mes
- Actualizaciones de seguridad sin costo

## 📞 Próximos Pasos

1. Aprobación de propuesta
2. Firma de contrato
3. Pago del 50% inicial
4. Inicio del desarrollo
5. Pago del 50% restante al deployment

---

**Validez de la propuesta:** 30 días
**Fecha:** ${new Date().toLocaleDateString('es-ES')}

Para aceptar esta propuesta, responder a: [tu-email@example.com]
\`;

        fs.writeFileSync(\`\${this.outputDir}/docs/PROPOSAL.md\`, proposal);
    }

    printSummary(analysis) {
        console.log('📦 PROYECTO GENERADO:\n');
        console.log(\`📁 Ubicación: \${this.outputDir}\`);
        console.log(\`🔧 Componentes: \${this.components.length}\`);
        console.log(\`⏱️  Tiempo estimado: \${analysis.estimatedTime}\`);
        console.log(\`💰 Setup fee: €\${analysis.estimatedCost.setup}\`);
        console.log(\`💳 Mensual: €\${analysis.estimatedCost.monthly}\`);
        
        console.log('\\n📋 ARCHIVOS CLAVE:\\n');
        console.log('  📄 README.md - Documentación completa');
        console.log('  💼 docs/PROPOSAL.md - Propuesta comercial lista');
        console.log('  🔧 setup-all.sh - Script de instalación automática');
        console.log('  📊 shared/config.json - Configuración compartida');
        
        console.log('\\n🚀 SIGUIENTE PASO:\\n');
        console.log(\`  cd \${this.outputDir}\`);
        console.log('  ./setup-all.sh');
        console.log('  # Configurar .env en cada componente');
        console.log('  # ¡Listo para presentar al cliente!\\n');
    }
}

module.exports = UniversalSolutionGenerator;

// Si se ejecuta directamente
if (require.main === module) {
    // Ejemplo de uso
    const clientData = {
        businessName: 'Clínica Dental Sonrisa',
        industry: 'salud',
        businessDescription: 'Clínica dental especializada en ortodoncia',
        solutionTypes: ['whatsapp-agent', 'web-chatbot', 'landing-page'],
        goals: ['appointment-booking', 'customer-support', 'lead-qualification'],
        volume: 'medium',
        budget: 'pro',
        additionalInfo: 'Integración con Google Calendar necesaria',
        email: 'admin@clinicasonrisa.com'
    };

    const generator = new UniversalSolutionGenerator(clientData);
    generator.generate();
}
\`;

        fs.writeFileSync(`${this.outputDir}/docs/PROPOSAL.md`, proposal);
    }

    printSummary(analysis) {
        console.log('📦 PROYECTO GENERADO:\n');
        console.log(\`📁 Ubicación: \${this.outputDir}\`);
        console.log(\`🔧 Componentes: \${this.components.length}\`);
        console.log(\`⏱️  Tiempo estimado: \${analysis.estimatedTime}\`);
        console.log(\`💰 Setup fee: €\${analysis.estimatedCost.setup}\`);
        console.log(\`💳 Mensual: €\${analysis.estimatedCost.monthly}\`);
        
        console.log('\\n📋 ARCHIVOS CLAVE:\\n');
        console.log('  📄 README.md - Documentación completa');
        console.log('  💼 docs/PROPOSAL.md - Propuesta comercial lista');
        console.log('  🔧 setup-all.sh - Script de instalación automática');
        console.log('  📊 shared/config.json - Configuración compartida');
        
        console.log('\\n🚀 SIGUIENTE PASO:\\n');
        console.log(\`  cd \${this.outputDir}\`);
        console.log('  ./setup-all.sh');
        console.log('  # Configurar .env en cada componente');
        console.log('  # ¡Listo para presentar al cliente!\\n');
    }
}

module.exports = UniversalSolutionGenerator;

// Si se ejecuta directamente
if (require.main === module) {
    // Ejemplo de uso
    const clientData = {
        businessName: 'Clínica Dental Sonrisa',
        industry: 'salud',
        businessDescription: 'Clínica dental especializada en ortodoncia',
        solutionTypes: ['whatsapp-agent', 'web-chatbot', 'landing-page'],
        goals: ['appointment-booking', 'customer-support', 'lead-qualification'],
        volume: 'medium',
        budget: 'pro',
        additionalInfo: 'Integración con Google Calendar necesaria',
        email: 'admin@clinicasonrisa.com'
    };

    const generator = new UniversalSolutionGenerator(clientData);
    generator.generate();
}
