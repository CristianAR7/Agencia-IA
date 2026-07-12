# CLAUDE.md — Agencia-IA (CRIAL Solutions)

## Propósito del Proyecto

Plataforma B2B de soluciones de IA para negocios locales. La web pública (crial.solutions) capta leads mediante chatbot y formulario; el backend los procesa, los guarda y notifica a Cristian por WhatsApp. Incluye además un sistema meta-generador que crea proyectos desplegables (agentes de WhatsApp, agentes de voz, chatbots web y landing pages) a partir de los datos del cliente.

**Modelo de negocio:** Setup €800–6,000 + recurrente €150–1,200/mes por cliente.

---

## Stack Tecnológico

### Frontend (web pública crial.solutions)
- **React 19 + Vite** — SPA en `src/` (NO es HTML vanilla; los .html sueltos de la raíz son legacy)
- **Tailwind CSS 3** (PostCSS, config en `tailwind.config.js` raíz) — `darkMode: 'class'` con toggle manual + View Transitions API
- **Iconos:** lucide-react (SVG inline; no usar emojis como iconos — se rompen en algunos Safari)
- **Analytics:** @vercel/analytics
- **Deploy:** Vercel
- **Diseño:** brutalista claro/oscuro — blanco/negro/azul eléctrico `#3b82f6`, bordes 2px, font-mono para labels

### Backend (`backend/`)
- **Node.js + Express** — deploy en Railway (`agencia-ia-production.up.railway.app`)
- **AI:** `@anthropic-ai/sdk` — Claude como motor LLM de los generadores
- **DB:** PostgreSQL vía `pg` (`backend/db.js`, tabla `leads` con JSONB)
- **Notificaciones:** Twilio WhatsApp (lead nuevo → WhatsApp a `TU_NUMERO_WHATSAPP`) + email (Nodemailer)
- **Voz:** Vapi.ai + ElevenLabs (opcional)

---

## Estructura de Carpetas

```
Agencia-IA/
├── index.html                    # Shell de Vite (raíz de la SPA)
├── src/
│   ├── main.jsx
│   ├── App.jsx                   # Toda la landing: Nav, Hero, CaseStudy, Demos,
│   │                             #   Features, Pricing, Contact, Footer, ThemeToggle
│   ├── index.css                 # Tailwind + dark mode + View Transitions
│   ├── components/
│   │   └── ChatWidget.jsx        # Chatbot de captación (flujo de pasos hardcodeado, no LLM)
│   └── pages/                    # aviso-legal, cookies, privacidad
├── public/                       # logo-firma.png, favicons
├── tailwind.config.js            # Config activa (la de src/ es legado)
│
├── backend/
│   ├── server.js                 # API Express (Railway)
│   ├── db.js                     # PostgreSQL (tabla leads)
│   ├── admin/                    # Dashboard de leads
│   ├── services/emailService.js
│   └── generators/               # Meta-generador de proyectos
│       ├── universalGenerator.js
│       ├── whatsappAgentGenerator.js
│       ├── webChatbotGenerator.js
│       ├── voiceAgentGenerator.js
│       └── landingPageGenerator.js
│
├── remotion-videos/              # Vídeos promocionales (Remotion)
└── Docs/ (README, GUIA-MAESTRA, DEPLOY, etc.)
```

**Legacy (no editar como si fuera la web actual):** los `.html` de la raíz y `frontend/` son la versión antigua pre-React.

---

## API Endpoints (backend/server.js)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/chat/lead` | **Endpoint de leads** — lo llaman el ChatWidget y el formulario de contacto. Guarda en DB + notifica por WhatsApp/email. NO tocar al hacer cambios visuales |
| `POST` | `/api/analyze` | Analiza necesidades del cliente, devuelve propuesta técnica |
| `POST` | `/api/generate-solution` | Genera proyecto completo con UniversalGenerator |
| `GET`  | `/api/admin/leads` | Lista de leads |
| `GET`  | `/api/admin/leads/:id` | Detalle de lead |
| `GET`  | `/health`, `/api/chat/health` | Health checks |

---

## Flujo de Leads (crítico — no romper)

```
1. Visitante entra en crial.solutions
2a. Chatbot (auto-abre a los 10s): flujo de pasos → problema, tipo de negocio,
    qué automatizar, email, teléfono, nombre del negocio → recomendación + precio
2b. O rellena el formulario de contacto (nombre, email, teléfono, solución, mensaje)
3. Ambos hacen POST → https://agencia-ia-production.up.railway.app/api/chat/lead
4. Backend guarda en PostgreSQL + envía WhatsApp a Cristian (Twilio) + email
5. Cristian contacta al lead en <24h
```

---

## Variables de Entorno (backend)

```env
PORT=3000
NODE_ENV=production
ANTHROPIC_API_KEY=
AI_MODEL=                    # usar modelo Claude vigente
DATABASE_URL=                # PostgreSQL (Railway)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=      # remitente
TU_NUMERO_WHATSAPP=          # destinatario de las notificaciones de lead
EMAIL_USER=
EMAIL_PASSWORD=
ADMIN_EMAIL=
VAPI_API_KEY=                # opcional
ELEVENLABS_API_KEY=          # opcional
```

---

## Desarrollo

```bash
npm install
npm run dev        # Vite en :5173
npm run build      # build de producción → dist/
```

- **Deploy frontend:** Vercel (desde el repo GitHub CristianAR7/Agencia-IA)
- **Deploy backend:** Railway (`backend/`)
- **Git:** hacer `git fetch` y partir de `origin/main` SIEMPRE — los clones locales suelen ir por detrás

---

## Convenciones

- JavaScript ES6+ con async/await, sin TypeScript
- Tailwind utility-first; toda clase de color lleva su variante `dark:`
- Iconos siempre lucide-react (nunca emojis como UI)
- Copy en castellano directo, sin jerga de consultor ("sectores", no "verticales")
- Validación en cliente (HTML5 + JS) y en el flujo del chatbot (email/teléfono)

---

## Notas Importantes

- El panel admin (`backend/admin/`) **no tiene autenticación** — no exponer sin protegerlo
- El ChatWidget usa un flujo de pasos hardcodeado en el cliente (case 0-8), no llama a ningún LLM desde el navegador
- `emailService.js` existe duplicado en raíz y en `backend/services/` — usar el de `backend/services/`
- Los generadores (`backend/generators/`) siguen el patrón `class XGenerator { generate() → { files, structure } }` con template literals extensos
