# CLAUDE.md — Agencia-IA (CRIAL Solutions)

## Propósito del Proyecto

Plataforma B2B meta-generadora de soluciones de IA para empresas. El sistema toma los datos de un cliente (sector, necesidad, presupuesto) y genera proyectos completos y desplegables: agentes de WhatsApp, agentes de voz, chatbots web, y landing pages.

**Modelo de negocio:** Setup €800–6,000 + recurrente €150–1,200/mes por cliente.

---

## Stack Tecnológico

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.x
- **AI:** `@anthropic-ai/sdk` 0.20 — Claude como motor LLM de todos los agentes
- **Email:** Nodemailer (Gmail SMTP)
- **Mensajería:** Twilio (WhatsApp + Voice)
- **Voz:** Vapi.ai + ElevenLabs
- **DB:** PostgreSQL / Supabase (configurado, no requerido en dev)
- **Cache:** Redis (opcional)
- **Dev:** nodemon

### Frontend
- HTML5 vanilla + JavaScript ES6+ (sin framework)
- **CSS:** Tailwind CSS (CDN)
- **Iconos:** Font Awesome 6.4.0 (CDN)
- **Diseño:** Dark theme con glass-morphism, gradients animados, Tailwind utility-first
- **Paleta:** Blue `#6366f1`/`#60a5fa`, Cyan `#06b6d4`, Purple `#a855f7`, Dark Slate `#0f172a`

---

## Estructura de Carpetas

```
Agencia-IA/
├── index.html                    # Sitio marketing CRIAL Solutions (página principal)
├── index-arroz-con-miso.html     # Variante temática Japón
├── politica-privacidad.html      # Legal
├── politica-cookies.html         # Legal
├── aviso-legal.html              # Legal
├── emailService.js               # Servicio email raíz
│
├── backend/
│   ├── server.js                 # API Express principal (puerto 3000)
│   ├── demo.js                   # Script de demostración/prueba
│   ├── package.json              # Dependencias backend
│   ├── admin/
│   │   └── index.html            # Dashboard de gestión de leads
│   ├── services/
│   │   └── emailService.js       # Notificaciones email
│   └── generators/               # Núcleo del sistema (3,551 líneas)
│       ├── universalGenerator.js # Orquestador maestro
│       ├── whatsappAgentGenerator.js
│       ├── webChatbotGenerator.js
│       ├── voiceAgentGenerator.js
│       └── landingPageGenerator.js
│
├── frontend/                     # Copia de páginas front para deploy separado
│   └── index.html, legal pages
│
├── demo-whatsapp-agent/          # Demo funcional de agente WhatsApp
│   └── src/
│       ├── index.js              # Servidor demo
│       ├── ai/engine.js          # Integración Claude API
│       ├── ai/contextManager.js  # Memoria conversacional
│       └── handlers/             # Webhooks Twilio
│
├── public/
│   └── logo-firma.png
│
├── Procfile                      # Heroku/Railway
├── railway.json                  # Config Railway.app
├── start.sh                      # Script de arranque
│
└── Docs/
    ├── START-HERE.md
    ├── README.md
    ├── GUIA-MAESTRA.md           # Guía técnica completa (20KB+)
    ├── GUIA-IMPLEMENTACION.md    # Sales playbook
    ├── ADMIN-PANEL-README.md
    ├── DEPLOY-RAILWAY.md
    ├── TESTING-COMPLETO.md
    └── PRUEBA-TU-APP.md
```

---

## API Endpoints (backend/server.js)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/analyze` | Analiza necesidades del cliente, devuelve propuesta técnica |
| `POST` | `/api/generate-solution` | Genera proyecto completo con UniversalGenerator |
| `GET`  | `/health` | Health check |
| `GET`  | `/api/admin/leads` | Lista todos los leads |
| `GET`  | `/api/admin/leads/:id` | Detalle de lead |

---

## Servicios Externos

| Servicio | Uso | Estado |
|----------|-----|--------|
| **Anthropic / Claude API** | LLM de todos los agentes | Activo |
| **Twilio** | WhatsApp + Voice | Sandbox configurado |
| **Vapi.ai** | Plataforma agentes de voz | Opcional |
| **ElevenLabs** | TTS para voz | Opcional |
| **Google Calendar** | Reserva de citas | Integración opcional |
| **HubSpot / Pipedrive** | CRM | Integración opcional |
| **Railway.app** | Deploy principal | Configurado |
| **Cloudflare** | CDN / protección | Opcional |

---

## Variables de Entorno Requeridas

```env
# Backend core
PORT=3000
NODE_ENV=development

# Claude / Anthropic
ANTHROPIC_API_KEY=
AI_MODEL=claude-sonnet-4-6   # Actualizar según modelo disponible

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=

# Email
EMAIL_USER=
EMAIL_PASSWORD=
ADMIN_EMAIL=

# Opcional
DATABASE_URL=
VAPI_API_KEY=
ELEVENLABS_API_KEY=
WEBHOOK_URL=               # Slack/Discord notifications
BUSINESS_NAME=
BUSINESS_INDUSTRY=
```

---

## Deploy

### Railway.app (principal)
- Config: `railway.json` — builder NIXPACKS
- Build: `npm install` | Start: `npm start`
- Restart automático en fallo (max 10 reintentos)

### Heroku (alternativo)
- Config: `Procfile` — `web: npm start`

### Frontend estático
- `index.html` y páginas legales pueden servirse como sitio estático en Netlify/Vercel
- El frontend llama al backend via `fetch()` al endpoint `/api/analyze`

---

## Flujo de Negocio

```
1. Cliente visita index.html
2. Rellena formulario (9 campos: sector, necesidad, presupuesto, etc.)
3. POST → /api/analyze → propuesta técnica personalizada
4. Si acepta → POST → /api/generate-solution
5. UniversalGenerator crea proyecto completo (archivos + documentación)
6. Cliente recibe código desplegable en Railway/Twilio
```

---

## Generadores — Patrones de Código

Todos los generadores siguen este patrón:

```javascript
class [Tipo]Generator {
  constructor(config) { this.config = config; }
  generate() { return { files: {...}, structure: [...] }; }
}
```

- Usan template literals extensos para generar código Node.js completo
- `universalGenerator.js` orquesta los demás según análisis de complejidad
- Output: proyectos listos para deploy con `package.json`, `.env.example`, handlers y README

---

## Convenciones de Desarrollo

- **JavaScript:** ES6+ con async/await, sin TypeScript
- **Estilo HTML/CSS:** Tailwind utility-first, dark theme obligatorio
- **Validación:** Solo en entrada de sistema (formularios HTML5 + JS en client-side)
- **Estado:** En memoria (`leads[]` array en `server.js`), sin persistencia activa en DB
- **CORS:** Habilitado globalmente en Express para desarrollo

---

## Notas Importantes

- El panel admin (`/backend/admin/index.html`) **no tiene autenticación** — no exponer en producción sin protegerlo
- Los leads se guardan en memoria: se pierden al reiniciar el servidor (DB desactivada en código)
- El modelo Claude configurado en `demo.js` es `claude-sonnet-4-5-20250929` — actualizar a modelos vigentes
- `emailService.js` existe duplicado en raíz y en `backend/services/` — usar el de `backend/services/`
