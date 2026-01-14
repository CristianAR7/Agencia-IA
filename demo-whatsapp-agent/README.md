# WhatsApp AI Agent - Clínica Dental Sonrisa

Agente de IA para WhatsApp completamente funcional generado automáticamente.

## 🚀 Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 3. Iniciar el servidor
npm start
```

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
```bash
ngrok http 3000
```
- Configurar URL en Twilio: https://tu-url.ngrok.io/webhook/whatsapp

## 🏗️ Arquitectura

```
WhatsApp → Twilio → Webhook → AI Engine → Actions → Response
                                    ↓
                              Context Manager
```

## ✨ Características

- appointment-booking
- customer-support
- lead-qualification

## 🔧 Personalización

### Modificar Personalidad del Agente
Editar `src/ai/engine.js` - BUSINESS_CONTEXT

### Agregar Nuevas Acciones
1. Agregar caso en `src/handlers/actionsHandler.js`
2. Implementar lógica de la acción
3. Actualizar `detectActions()` en `src/ai/engine.js`

## 📊 Próximas Mejoras

- [ ] Base de datos real (PostgreSQL/Supabase)
- [ ] Dashboard de analytics
- [ ] Integración con CRM
- [ ] Soporte multiidioma
- [ ] Sistema de plantillas de respuestas

## 🤝 Soporte

Generado por AI Solution Generator
