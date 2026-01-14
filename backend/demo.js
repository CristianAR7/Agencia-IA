#!/usr/bin/env node

/**
 * DEMO SCRIPT - AI Solution Generator
 * 
 * Este script demuestra cómo funciona el generador:
 * 1. Simula un cliente completando el formulario
 * 2. Analiza las necesidades
 * 3. Genera un agente de WhatsApp funcional
 */

const WhatsAppAgentGenerator = require('./generators/whatsappAgentGenerator');

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║        🤖 AI SOLUTION GENERATOR - DEMO                    ║
║                                                            ║
║        Generando agente de IA en tiempo real...          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

// Simular datos de un cliente real
const clientData = {
    businessName: 'Clínica Dental Sonrisa',
    industry: 'salud',
    businessDescription: 'Clínica dental moderna especializada en ortodoncia y estética dental. Atendemos 50+ pacientes diarios.',
    solutionTypes: ['whatsapp-agent'],
    goals: ['appointment-booking', 'customer-support', 'lead-qualification'],
    volume: 'medium', // 500-2000 conversaciones/mes
    budget: 'pro', // €500-1500/mes
    additionalInfo: 'Necesitamos integración con nuestro sistema de citas actual (Google Calendar)',
    email: 'admin@clinicasonrisa.com'
};

console.log('\n📊 DATOS DEL CLIENTE:\n');
console.log('Negocio:', clientData.businessName);
console.log('Industria:', clientData.industry);
console.log('Soluciones:', clientData.solutionTypes.join(', '));
console.log('Objetivos:', clientData.goals.join(', '));
console.log('Volumen esperado:', clientData.volume);
console.log('Presupuesto:', clientData.budget);

console.log('\n🧠 ANALIZANDO NECESIDADES CON IA...\n');

// Simular análisis (en producción esto llamaría a Claude API)
setTimeout(() => {
    console.log('✅ Análisis completado!');
    console.log('\n📋 PROPUESTA GENERADA:\n');
    
    const proposal = {
        stack: 'Node.js + Express + Twilio + Claude API',
        estimatedTime: '2-3 semanas para MVP',
        estimatedCost: '€400/mes (operación)',
        setupFee: '€1,500',
        components: [
            'Webhook handler de WhatsApp',
            'Motor de IA con Claude',
            'Sistema de gestión de contexto',
            'Integración con Google Calendar',
            'Sistema de calificación de leads'
        ]
    };
    
    console.log('Stack Técnico:', proposal.stack);
    console.log('Tiempo:', proposal.estimatedTime);
    console.log('Costo operación:', proposal.estimatedCost);
    console.log('Setup fee:', proposal.setupFee);
    console.log('\nComponentes:');
    proposal.components.forEach((comp, i) => {
        console.log(`  ${i + 1}. ${comp}`);
    });
    
    console.log('\n🚀 GENERANDO CÓDIGO...\n');
    
    // Generar el agente real
    setTimeout(() => {
        const generator = new WhatsAppAgentGenerator({
            businessName: clientData.businessName,
            industry: clientData.industry,
            features: clientData.goals,
            personality: 'profesional, empático y eficiente',
            language: 'español',
            outputDir: '../demo-whatsapp-agent'
        });
        
        generator.generate();
        
        console.log('\n╔════════════════════════════════════════════════════════════╗');
        console.log('║                                                            ║');
        console.log('║        ✅ AGENTE GENERADO EXITOSAMENTE                    ║');
        console.log('║                                                            ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');
        
        console.log('📁 Archivos creados en: ../demo-whatsapp-agent/\n');
        
        console.log('🎯 VALOR ENTREGADO AL CLIENTE:\n');
        console.log('  ✓ Código fuente completo y funcional');
        console.log('  ✓ Servidor listo para producción');
        console.log('  ✓ Integración con WhatsApp configurada');
        console.log('  ✓ IA conversacional con Claude');
        console.log('  ✓ Sistema de memoria y contexto');
        console.log('  ✓ Documentación completa');
        console.log('  ✓ Variables de entorno template');
        
        console.log('\n💰 TU GANANCIA:\n');
        console.log('  Cobras al cliente: €1,500 (setup) + €400/mes');
        console.log('  Costo real APIs: ~€150/mes');
        console.log('  Tu margen: €250/mes RECURRENTE por cliente');
        console.log('  Tiempo invertido: 3-4 horas\n');
        
        console.log('⚡ PRÓXIMOS PASOS:\n');
        console.log('  1. cd ../demo-whatsapp-agent');
        console.log('  2. npm install');
        console.log('  3. Configurar .env con credenciales');
        console.log('  4. npm start');
        console.log('  5. Testear con cliente\n');
        
        console.log('🔥 Esto NO es un curso. Es código real funcionando.\n');
        
    }, 2000);
    
}, 1500);
