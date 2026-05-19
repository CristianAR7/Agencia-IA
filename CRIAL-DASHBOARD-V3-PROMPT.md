# CRIAL Agency Dashboard — Super Prompt v3

Trabajamos en la rama main del repo agencia-ia.
Existe rama backup-before-dashboard como respaldo.

---

## PASO 0 — LEE ANTES DE TOCAR NADA

1. Lee `backend/server.js` — rutas existentes
2. Lee `backend/dashboard/routes.js` — endpoints actuales
3. Lee `backend/dashboard/notion.service.js` — integración Notion actual
4. Lee `backend/dashboard/pipeline.service.js` — scraper actual
5. Lee `backend/dashboard-frontend/index.html` — UI actual del hub
6. Lee `~/Desktop/Projects/cristian-dev-setup/CLAUDE.md` — contexto global
7. Lista exactamente qué vas a crear/modificar y espera confirmación

---

## CONTEXTO

**Lo que ya existe y funciona — NO TOCAR:**
- Hub con lectura de leads desde Notion
- Generador de agentes (WhatsApp + Chatbot + Voz)
- Chat Hub con Claude API y memoria persistente
- Pipeline de análisis con scraping básico + informe

**Stack:**
- Backend: Node.js/Express en Railway (root: `backend/`)
- Frontend: HTML/CSS/JS vanilla en `backend/dashboard-frontend/`
- DB: PostgreSQL (Railway)
- APIs activas: Anthropic, Notion

---

## MÓDULOS A CONSTRUIR

### MÓDULO 1 — Sincronización bidireccional con Notion (PRIORIDAD 1)

**Qué hace:**
Actualizar leads en Notion directamente desde el dashboard sin salir de la plataforma.

**Implementación:**
- Ya existe `GET /dashboard/api/notion/leads` (lectura)
- Añadir `PATCH /dashboard/api/notion/leads/:id` completo:
  - Actualizar Estado, Próximo Seguimiento, Notas Research, Solución CRIAL, Precio €
- En `index.html` → cada lead tiene botón "Editar" que abre un modal inline
- Modal con campos editables: Estado (dropdown), Próximo Seguimiento (date), Notas, Precio
- Al guardar → llama al PATCH → actualiza Notion en tiempo real → feedback visual

**Columnas reales de Notion a sincronizar:**
```
Nombre Negocio, Estado, Tipo, Website, Email, Teléfono,
Precio €, Pain Points, Solución CRIAL, Fecha Contacto,
Próximo Seguimiento, Ubicación, Rating Google, Num Reviews
```

---

### MÓDULO 2 — Cold Emailing integrado (PRIORIDAD 2)

**Qué hace:**
Redactar y enviar emails directamente desde el dashboard sin salir de la plataforma.

**Implementación backend:**
- Nuevo fichero: `backend/dashboard/email.service.js`
- Usar Nodemailer (ya instalado) con SMTP configurable
- Variables de entorno: `EMAIL_USER`, `EMAIL_PASSWORD` (ya existen en Railway)
- Endpoints:
  - `POST /dashboard/api/email/send` → envía email
  - `POST /dashboard/api/email/draft` → Claude genera el borrador basado en el informe del lead

**Implementación frontend:**
- Botón "Enviar Email" en cada lead de la tabla Notion
- Al hacer click → modal con:
  - Para: (email del lead, pre-rellenado)
  - Asunto: (pre-rellenado con nombre del negocio)
  - Cuerpo: (Claude genera el borrador automáticamente con info del lead)
  - Botón "Regenerar borrador" y "Enviar"
- Confirmación visual al enviar

**Prompt para generar el borrador:**
Claude debe generar un email de cold outreach profesional en español basado en:
- Nombre del negocio y sector
- Pain points detectados
- Solución CRIAL propuesta
- Tono: profesional pero cercano, no agresivo
- Máximo 150 palabras

---

### MÓDULO 3 — Scraping profundo (PRIORIDAD 3)

**Qué hace:**
Enriquecer leads con datos de múltiples fuentes más allá de la web básica.

**Implementación:**
Actualizar `backend/dashboard/pipeline.service.js` — función `scrapeWebsite`:

**Fuentes a rastrear:**
1. Web del negocio → ya existe, mejorar extracción de emails y teléfonos con regex robusta
2. Google Maps → buscar por nombre + ubicación, extraer rating, reviews, horarios, teléfono
3. Redes sociales → buscar perfiles públicos:
   - Construir URLs probables: `facebook.com/nombreNegocio`, `instagram.com/nombreNegocio`
   - Verificar existencia con HEAD request
   - No scraping de contenido privado, solo verificar si existe perfil público

**Extracción de contactos:**
```js
// Regex robusta para emails
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Regex para teléfonos españoles y genéricos
const phoneRegex = /(\+34|0034)?[\s.-]?[6-9]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/g;
```

**Enriquecimiento con Google Maps API (opcional):**
- Si `GOOGLE_MAPS_API_KEY` existe en env → usar Places API
- Si no existe → hacer búsqueda básica con axios en maps.google.com

**Output enriquecido:**
```json
{
  "website": "...",
  "emails": ["..."],
  "phones": ["..."],
  "socialProfiles": {
    "facebook": "url o null",
    "instagram": "url o null",
    "linkedin": "url o null"
  },
  "googleMaps": {
    "rating": 4.2,
    "reviews": 128,
    "address": "...",
    "hours": "..."
  }
}
```

---

### MÓDULO 4 — Generador de webs demo en 30 segundos (PRIORIDAD 4)

**Qué hace:**
Generar una landing page funcional del negocio del cliente para usar como demo.

**Implementación backend:**
- Nuevo fichero: `backend/dashboard/webgen.service.js`
- Endpoint: `POST /dashboard/api/webgen/generate`
- Input: datos del cliente (nombre, sector, servicios, colores de marca si los hay)
- Claude genera el HTML completo de una landing page en un solo fichero
- Se guarda en `backend/dashboard-frontend/demos/[clientId].html`
- Se sirve en `/dashboard/demos/[clientId].html`

**Prompt para Claude:**
```
Genera una landing page profesional completa en un único fichero HTML 
para el negocio: [nombre], sector: [sector], servicios: [servicios].
Requisitos:
- HTML + CSS + JS en un solo fichero
- Diseño moderno, mobile-first
- Secciones: Hero, Servicios, Sobre nosotros, Contacto
- Colores adaptados al sector
- Formulario de contacto funcional (frontend only)
- Sin dependencias externas excepto Google Fonts
Devuelve ÚNICAMENTE el HTML completo, sin explicaciones.
```

**Frontend:**
- Botón "Generar web demo" en el módulo Pipeline (después de analizar el cliente)
- Loading animation mientras genera (5-15 segundos)
- Preview en iframe cuando termina
- Botón "Abrir demo" → nueva pestaña con la URL
- Botón "Descargar HTML" → descarga el fichero

---

## ARQUITECTURA PREPARADA PARA MULTI-TENANT (no implementar ahora)

**Tener en cuenta al escribir código nuevo:**

- Toda la lógica de negocio debe ir en `services/` nunca mezclada con rutas
- Las rutas deben recibir un `userId` o `tenantId` implícito (preparar el campo aunque no se use)
- Las tablas de PostgreSQL deben tener columna `tenant_id` aunque ahora siempre sea `1`
- Los servicios deben estar desacoplados: fácil de añadir autenticación encima
- Naming: usar `getLeadsByTenant(tenantId)` en lugar de `getAllLeads()`

**Estructura futura prevista:**
```
/super-admin  → panel de Cristian con acceso total
/app          → dashboard del cliente (tenant)
/auth         → login / registro
```

**No implementar ahora, solo tener en mente al estructurar el código.**

---

## RESTRICCIONES

- ❌ No modificar módulos existentes que funcionan (agentes, chat, pipeline básico)
- ❌ No añadir librerías React/Vue/etc — vanilla JS únicamente
- ❌ No romper rutas existentes
- ✅ Commits separados por módulo
- ✅ Cada módulo funciona de forma independiente
- ✅ Variables de entorno nuevas documentadas en README
- ✅ Push a main cuando cada módulo esté completo y testeado

---

## VARIABLES DE ENTORNO NUEVAS NECESARIAS

```
# Ya existen:
ANTHROPIC_API_KEY, DATABASE_URL, NOTION_API_KEY, NOTION_DATABASE_ID
EMAIL_USER, EMAIL_PASSWORD

# Opcionales (si disponibles mejoran el scraping):
GOOGLE_MAPS_API_KEY
```

---

## ORDEN DE EJECUCIÓN

1. Paso 0 — exploración completa
2. Módulo 1 — Notion bidireccional (más fácil, más valor inmediato)
3. Módulo 2 — Cold emailing
4. Módulo 3 — Scraping profundo
5. Módulo 4 — Generador de webs demo
6. Push final y verificación en Railway

---

## EMPEZAR

Di "Entendido, leyendo el proyecto" y ejecuta el Paso 0 completo.
Lista exactamente qué ficheros vas a crear o modificar antes de escribir código.
Espera confirmación antes de empezar cada módulo.
