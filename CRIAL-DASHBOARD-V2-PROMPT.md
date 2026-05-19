# CRIAL Dashboard — Mejoras v2 + Fix Railway

Trabajamos en la rama main del repo agencia-ia.
Existe rama backup-before-dashboard como respaldo.

## PASO 0 — LEE ESTO ANTES DE TOCAR NADA

1. Lee `backend/server.js` para entender las rutas actuales
2. Lee `backend/dashboard/routes.js` para ver los endpoints existentes
3. Lee `dashboard/assets/dashboard.css` y `dashboard.js` para entender el sistema de diseño actual
4. Lee `~/Desktop/Projects/cristian-dev-setup/skills/ui-ux-pro-max/src/ui-ux-pro-max/` para inspiración de diseño
5. Lee `~/Desktop/Projects/cristian-dev-setup/CLAUDE.md` para contexto global
6. Propón qué vas a cambiar exactamente y espera confirmación

---

## TAREAS A EJECUTAR EN PARALELO

Lanza 3 agentes simultáneos:

---

### AGENTE A — Fix Railway (CRÍTICO, hacer primero)
El dashboard no carga en producción porque Railway tiene root en `backend/`
y el frontend está en `dashboard/` (un nivel arriba).

**Solución:**
```bash
# Mover frontend dentro de backend
mv dashboard/ backend/dashboard-frontend/
```

**Actualizar server.js** — cambiar estas líneas:
```js
// ANTES:
app.use('/dashboard', express.static(path.join(__dirname, '../dashboard')));
app.use('/dashboard/api', require('../dashboard/backend/dashboard-routes'));

// DESPUÉS:
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard-frontend')));
app.use('/dashboard/api', require('./dashboard/routes'));
```

Verificar que todos los paths relativos en los HTML del frontend
siguen funcionando después del movimiento.

---

### AGENTE B — Nuevas funcionalidades del dashboard

#### B1: Selector inteligente de skills en el Chat Hub
Añadir en `chat.html` un panel "Skills disponibles":

- **Nivel 1:** Busca en `~/Desktop/Projects/cristian-dev-setup/skills/` y muestra las skills disponibles organizadas por categoría (marketing, UI/UX, agentes, etc.)
- **Nivel 2:** Si el usuario pregunta en el chat qué skill usar para algo concreto, el backend busca primero en las skills locales y luego sugiere skills de https://skills.sh con un link directo
- El chat debe poder responder: "Para auditar la web de tu cliente te recomiendo `marketingskills/seo-audit` (la tienes instalada) y también puedes explorar X en skills.sh"

Implementación backend en `backend/dashboard/chat.service.js`:
```js
// Añadir al system prompt del chat:
const AVAILABLE_SKILLS = [
  { name: 'marketingskills/page-cro', category: 'marketing', desc: 'Optimización de conversión' },
  { name: 'marketingskills/seo-audit', category: 'marketing', desc: 'Auditoría SEO' },
  { name: 'marketingskills/content-strategy', category: 'marketing', desc: 'Estrategia de contenido' },
  { name: 'ui-ux-pro-max', category: 'diseño', desc: 'Estilos UI, paletas, tipografías' },
  { name: 'superclaude', category: 'agentes', desc: '30 comandos + 20 agentes especializados' },
  { name: 'agency-agents', category: 'agentes', desc: '156 agentes de agencia' },
  { name: 'claude-banana', category: 'imágenes', desc: 'Prompts para generación de imágenes' },
  { name: 'proposal-generator', category: 'agencia', desc: 'Generar propuestas comerciales' },
  { name: 'full-deployment', category: 'agencia', desc: 'Deploy completo a Railway' },
];
// Incluir esta lista en el system prompt para que Claude sepa qué hay disponible
// y pueda recomendarlas en contexto
```

Nuevo endpoint: `GET /dashboard/api/skills` → devuelve lista de skills disponibles

#### B2: Integración con Notion para leads
Nuevo módulo en el dashboard: panel lateral en el Hub con leads de Notion.

Backend — nuevo fichero `backend/dashboard/notion.service.js`:
```js
// Usar Notion API para:
// 1. GET /dashboard/api/notion/leads → lista de leads de la DB de Notion
// 2. PATCH /dashboard/api/notion/leads/:id → actualizar estado de un lead
// 3. POST /dashboard/api/notion/leads → crear nuevo lead desde el pipeline
```

Frontend — en `index.html` añadir sección "Leads de Notion":
- Tabla con leads: nombre, estado, fecha, botón "Abrir pipeline"
- Al hacer click en un lead → carga automáticamente sus datos en Pipeline
- Filtros: Nuevo / En proceso / Cerrado / Perdido

Variable de entorno necesaria: `NOTION_API_KEY` y `NOTION_DATABASE_ID`
(añadir al .env local y documentar en README que hay que añadirlas en Railway)

---

### AGENTE C — Mejora de UI manteniendo marca CRIAL

**Principios a mantener:**
- Dark theme actual → conservar
- Colores CRIAL: azul (#3B82F6) y verde (#10B981) → conservar
- Tipografía y sidebar → conservar

**Mejoras a aplicar** (usando ui-ux-pro-max como referencia):

1. **Cards con glassmorphism sutil** → `backdrop-filter: blur(10px)` + borde semitransparente
   en las cards del Hub y resultados del Pipeline

2. **Animaciones de entrada** → fade-in suave (200ms) cuando cargan los resultados
   del pipeline y los agentes generados

3. **Estados de carga mejorados** → skeleton loaders en lugar del spinner actual
   mientras el pipeline analiza la web del cliente

4. **Pipeline — resultado visual mejorado:**
   - Score circular (tipo gauge) para CRO y SEO en lugar de texto plano
   - Tags de colores para las mejoras priorizadas (🔴 Alta / 🟡 Media / 🟢 Baja)
   - Sección "Vista previa del informe" colapsable antes de descargar

5. **Agents — preview mejorado:**
   - Preview del chatbot como widget flotante real (esquina inferior derecha)
   - Para WhatsApp: preview de una conversación de ejemplo con el agente
   - Para voz: visualizador de onda de audio (CSS animation)

6. **Chat Hub — mejoras UX:**
   - Indicador de "Claude está escribiendo..." con puntos animados
   - Markdown rendering en las respuestas (negrita, listas, código)
   - Botón "Copiar respuesta" en cada mensaje

7. **Responsive** → verificar que funciona en tablet (768px mínimo)

---

## RESTRICCIONES

- ❌ No cambiar la identidad visual de CRIAL (colores, logo, dark theme)
- ❌ No tocar rutas existentes fuera del dashboard
- ❌ No añadir librerías pesadas (nada de React, Vue, etc.)
- ✅ Vanilla JS + CSS puro únicamente para el frontend
- ✅ Commits separados por agente: `fix/railway`, `feat/skills-notion`, `feat/ui-v2`
- ✅ Después del último commit, hacer push a main

---

## ORDEN DE EJECUCIÓN

1. **Agente A primero** → fix Railway (es bloqueante para producción)
2. **Agentes B y C en paralelo** → funcionalidades + UI
3. **Integración final** → verificar que todo funciona junto
4. **Push a main** → Railway despliega automáticamente

---

## EMPEZAR

Di "Entendido, empezando Paso 0" y lee todos los ficheros relevantes
antes de proponer cambios. Cuando hayas leído todo, lista exactamente
qué ficheros vas a modificar/crear y espera mi OK.
