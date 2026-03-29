# DESIGN.md — Sistema de Diseño CRIAL Solutions

> Referencia de diseño para Stitch y cualquier herramienta que genere nuevas pantallas.
> Toda pantalla nueva debe seguir estas especificaciones para mantener consistencia visual.

---

## 1. Principios Generales

- **Dark-first:** el fondo nunca es blanco. Siempre oscuro (slate-950 o variantes azul-marino).
- **Glass morphism:** las tarjetas flotan sobre el fondo con transparencia + blur, no son sólidas.
- **Gradientes vivos:** los acentos de color se aplican como gradientes, nunca color plano en textos destacados.
- **Minimalista y técnico:** tipografía limpia, sin sombras excesivas. El contenido habla, no los adornos.
- **Glow sutil:** las sombras imitan luz azul (no negra), reforzando el aspecto tecnológico.

---

## 2. Colores

### Fondo base
| Uso | Valor | Tailwind |
|-----|-------|----------|
| Fondo principal animado | `#020617` → `#0c1e3a` → `#020617` | `from-slate-950 via-[#0c1e3a] to-slate-950` |
| Secciones alternadas | `rgba(2, 6, 23, 0.5)` | `bg-slate-950/50` |
| Fondo admin (más oscuro) | `#0f0f1a` | — |
| Fondo tarjetas/modales | `#1a1a2e` | — |
| Fondo inputs y elementos anidados | `rgba(15, 23, 42, 0.5)` | `bg-slate-900/50` |

### Texto
| Uso | Valor | Tailwind |
|-----|-------|----------|
| Títulos y énfasis máximo | `#ffffff` | `text-white` |
| Cuerpo y párrafos | `#cbd5e1` | `text-slate-300` |
| Secundario / subtítulos | `#94a3b8` | `text-slate-400` |
| Notas y metadata | `#64748b` | `text-slate-500` |

### Acentos de color
| Color | Hex | Tailwind | Uso principal |
|-------|-----|----------|---------------|
| **Azul primario** | `#3b82f6` | `blue-500` | CTAs, íconos, bordes activos, checks |
| **Azul oscuro CTA** | `#2563eb` / `#1d4ed8` | `blue-600` / `blue-700` | Botones principales |
| **Cyan** | `#22d3ee` | `cyan-400` | Gradiente de titulares, íconos secundarios |
| **Violeta (admin)** | `#a78bfa` | `violet-400` | Acentos del panel admin, encabezados de tabla |
| **Violeta oscuro** | `#7c3aed` | `violet-600` | Botones del panel admin |
| **Emerald (éxito/WhatsApp)** | `#34d399` | `emerald-400` | Estado activo, íconos WhatsApp, métricas positivas |
| **Purple** | `#c084fc` | `purple-400` | Ícono Suite Completa |
| **Amber (advertencia)** | `#f59e0b` | `amber-500` | Badge "Pendiente" |
| **Rojo (error)** | `#ef4444` | `red-500` | Mensajes de error |

### Gradientes de uso frecuente
```css
/* Texto de titular hero */
background: linear-gradient(to right, #3b82f6, #22d3ee);
/* Tailwind: bg-gradient-to-r from-blue-500 to-cyan-400 */

/* Textos y valores en admin */
background: linear-gradient(90deg, #a78bfa, #60a5fa);

/* Header y tarjetas del admin */
background: linear-gradient(135deg, #1e1e3a, #2d1b69);

/* Botón primario admin */
background: linear-gradient(135deg, #7c3aed, #4f46e5);
```

### Bordes
| Uso | Valor |
|-----|-------|
| Bordes de tarjeta glass | `rgba(255, 255, 255, 0.08)` |
| Bordes de sección/separador | `rgba(255, 255, 255, 0.05)` — Tailwind `border-slate-800` |
| Borde activo / focus | `#3b82f6` — Tailwind `border-blue-500` |
| Borde tarjeta featured (pricing) | `2px solid #3b82f6` |
| Borde con acento violeta (admin) | `rgba(139, 92, 246, 0.2–0.4)` |

---

## 3. Tipografía

### Familia de fuentes
- **Frontend marketing:** Tailwind `font-sans` → system stack (`-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`)
- **Panel admin:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (explícito en CSS)
- **Código / diagramas:** `font-mono` (para bloques de arquitectura técnica)

### Escala tipográfica

| Elemento | Tailwind | Descripción |
|----------|----------|-------------|
| Hero H1 | `text-5xl md:text-7xl font-extrabold` | Titular principal, blanco puro |
| Sección H2 | `text-3xl md:text-4xl font-bold` | Encabezados de sección |
| Tarjeta H3 | `text-xl font-bold` | Títulos de cards |
| Subtítulo H3 results | `text-lg font-bold` | Dentro de resultados |
| Body largo | `text-xl text-slate-300` | Párrafo hero |
| Body estándar | `text-sm text-slate-400` | Descripciones de tarjeta |
| Labels de formulario | `text-sm font-semibold text-slate-300` | Etiquetas de campos |
| Precios destacados | `text-4xl font-bold text-white` | Números de pricing |
| Precios recurrentes | `text-lg font-semibold text-blue-400` | `/mes` en pricing |
| Meta / notas | `text-xs text-slate-500` | Disclaimers, subtexto |
| Badge / tag | `text-xs font-bold` | Chips y etiquetas |

### Efectos de texto
```css
/* Texto con gradiente (titulares hero, valores admin) */
background: linear-gradient(...);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
/* Tailwind: text-transparent bg-clip-text bg-gradient-to-r ... */

/* Tracking en encabezados de tabla */
text-transform: uppercase;
letter-spacing: 0.05em;
font-size: 0.8rem;
```

---

## 4. Componentes Principales

### 4.1 Navbar
```
- Posición: fixed, z-50, ancho completo
- Estilo: glass-heavy (bg: rgba(15,23,42,0.9), blur 12px, border-bottom sutil)
- Logo: ícono fa-brain azul + "CRIAL" blanco + "Solutions" azul
- Links: text-sm font-medium text-slate-300, hover text-blue-400
- CTA: bg-blue-700 → hover bg-blue-600, px-5 py-2, rounded-md, font-bold, text-sm
```

### 4.2 Hero / Header
```
- pt-32 pb-20, texto centrado
- Badge pill: border border-blue-500/30, bg-blue-500/10, text-blue-300, text-sm font-semibold, rounded-full
- H1: text-5xl→7xl font-extrabold, blanco con span gradiente azul→cyan
- Párrafo: text-xl text-slate-300, max-w-3xl
- CTA primario: bg-white text-blue-900, font-bold, py-4 px-8, rounded-md, hover:scale-105
- CTA secundario: glass (bg blanco 3%), border-white/10, hover:bg-white/5
- Orbs decorativos: círculos blur-[150px] en bg-blue-800 y bg-[#0e4a6a], opacity-20, -z-10
```

### 4.3 Tarjeta Glass (componente base)
```css
/* Clase .glass */
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 12px;  /* rounded-xl */
padding: 2rem;        /* p-8 */

/* Hover */
hover:bg-slate-800/50
transition
```

### 4.4 Tarjeta de Servicio (grid de iconos)
```
- Base: .glass p-8 rounded-xl
- Ícono: w-14 h-14, bg-slate-700/50, rounded-lg, centrado
  - WhatsApp: emerald-400 | Voz: blue-400 | Chat: cyan-400 | Suite: purple-400
- H3: text-xl font-bold text-white
- Descripción: text-slate-400 text-sm
- Precio: text-blue-400 text-xs font-semibold
- Hover: group-hover:scale-105 en el ícono
```

### 4.5 Pricing Cards
```
- Starter / Enterprise: .glass p-8 rounded-xl, border-slate-800
  - Hover: hover:border-blue-500/30
- Professional (featured): border-2 border-blue-500
  - Badge "MÁS POPULAR": bg-blue-500, absolute -top-4, centered, rounded-full, text-xs font-bold
- Precio: text-4xl font-bold text-white + text-slate-400 " setup"
- Recurrente: text-lg font-semibold text-blue-400
- Lista: fa-check text-blue-500, text-sm text-slate-300
- Botón Starter/Enterprise: bg-slate-800 hover:bg-slate-700, border-slate-700
- Botón Professional: bg-blue-600 hover:bg-blue-500
```

### 4.6 Steps / Proceso (numerados)
```
- Círculo: w-16 h-16, bg-blue-900/30, border-2 border-blue-500, rounded-full
- Número: text-2xl font-bold text-blue-400
- Título: font-bold text-white
- Descripción: text-slate-400 text-sm
- Layout: text-center, grid md:grid-cols-4
```

### 4.7 Formulario (Intake Form)
```
- Contenedor: .glass p-8 rounded-xl
- Labels: text-sm font-semibold text-slate-300 mb-2
- Inputs / Selects / Textareas:
    bg-slate-900/50, border border-slate-700, rounded-md, px-4 py-3
    text-white, focus:border-blue-500 focus:outline-none
- Checkboxes: w-5 h-5 text-blue-600
  - Wrapper: bg-slate-900/30 p-4 rounded-md, border border-slate-800
  - Hover: hover:border-blue-500/30
- Submit: bg-blue-600 hover:bg-blue-500, w-full, py-4, font-bold, text-lg
           hover:scale-[1.02], shadow-xl shadow-blue-900/30
- Error banner: bg-red-900/30, border border-red-500/40, text-red-300, rounded-lg
```

### 4.8 Loading State
```
- Spinner: animate-spin, h-16 w-16, border-4 border-slate-700 border-t-blue-500, rounded-full
- Texto: text-xl font-semibold text-white
- Sub-texto: text-slate-400 text-sm
```

### 4.9 Resultado / Results Box
```
- Contenedor: .glass p-8 rounded-xl
- Header: border-b border-slate-700, badge "Generada" en emerald-400/10 border-emerald-500/30
- Bloque sumario: bg-slate-800/50 p-6 rounded-lg border border-slate-700
- Tarjetas de métricas: bg-slate-900/50 p-4 rounded border-slate-800
  - Etiqueta: text-xs text-slate-400 uppercase font-semibold
  - Valor: text-base font-bold (azul/cyan/emerald según dato)
- Bloque código/arquitectura: bg-slate-950, font-mono, text-blue-300, border-slate-800
- Sección CTA: bg-blue-900/20, border border-blue-500/30
- "Próximos pasos": numerados con círculo bg-blue-900/50 border-blue-500, texto slate-300
```

### 4.10 Footer
```
- bg-slate-950, border-t border-slate-800
- Logo repetido: ícono + texto
- 3 columnas: Descripción empresa | Contacto | Legal
- Links: text-slate-400, hover:text-blue-400
- Íconos: text-blue-500 (fa-envelope, fa-linkedin, fa-map-marker-alt)
- Copyright: text-slate-500 text-sm, centrado, border-t border-slate-800
```

### 4.11 Admin Panel — Stat Cards
```css
background: linear-gradient(135deg, #1e1e3a, #252540);
border: 1px solid rgba(139, 92, 246, 0.2);
border-radius: 12px;
padding: 1.5rem;

/* Valor */
font-size: 2.5rem; font-weight: 800;
background: linear-gradient(90deg, #a78bfa, #60a5fa);
-webkit-background-clip: text;

/* Hover */
transform: translateY(-2px);
border-color: rgba(139, 92, 246, 0.5);
```

### 4.12 Admin Panel — Tabla
```css
/* Wrapper */
background: #1a1a2e;
border: 1px solid rgba(139, 92, 246, 0.2);
border-radius: 12px;

/* TH */
color: #a78bfa; font-size: 0.8rem; text-transform: uppercase;

/* TR hover */
background: rgba(139, 92, 246, 0.05);

/* Separador de filas */
border-top: 1px solid rgba(255,255,255,0.05);
```

### 4.13 Badges de Estado
```css
/* Estructura base */
padding: 0.25rem 0.7rem; border-radius: 20px;
font-size: 0.78rem; font-weight: 600;

/* Pending */
background: rgba(245, 158, 11, 0.15); color: #f59e0b;
border: 1px solid rgba(245, 158, 11, 0.3);

/* Contacted */
background: rgba(59, 130, 246, 0.15); color: #60a5fa;
border: 1px solid rgba(59, 130, 246, 0.3);

/* Closed */
background: rgba(16, 185, 129, 0.15); color: #10b981;
border: 1px solid rgba(16, 185, 129, 0.3);
```

### 4.14 Modal (Admin)
```css
background: #1a1a2e;
border: 1px solid rgba(139, 92, 246, 0.4);
border-radius: 16px;
padding: 2rem; max-width: 640px;

/* Overlay */
background: rgba(0,0,0,0.7);

/* Tags dentro del modal */
background: rgba(139, 92, 246, 0.15);
border: 1px solid rgba(139, 92, 246, 0.3);
color: #a78bfa; border-radius: 12px;
```

### 4.15 Toast Notification
```css
background: #1e1e3a;
border: 1px solid rgba(139, 92, 246, 0.4);
border-radius: 10px;
/* Animado: translateY(100px) → translateY(0), opacity 0 → 1, duración 0.3s */
```

---

## 5. Espaciados y Layout

### Sistema de espaciado (Tailwind 4px base)
| Token | px | Uso |
|-------|----|-----|
| `p-3` | 12px | Checkboxes/objetivos del formulario |
| `p-4` | 16px | Inputs, métricas |
| `p-6` | 24px | Bloques de resultados, modal grid |
| `p-8` | 32px | Tarjetas principales, formulario |
| `p-12` | 48px | Loading state |
| `py-20` | 80px top+bottom | Padding de sección |
| `py-12` | 48px | Footer |
| `pt-32` | 128px | Hero (espacio para navbar fija) |
| `gap-6` | 24px | Grid de tarjetas de servicio |
| `gap-8` | 32px | Grid de pricing, proceso |
| `mb-6` | 24px | Espacio post-ícono en tarjeta |
| `mb-16` | 64px | Espacio post-encabezado de sección |
| `space-y-6` | 24px | Separación de campos en formulario |
| `space-y-3` | 12px | Items en listas de features |

### Contenedores
```
container mx-auto px-6     → página completa
max-w-5xl                  → hero, pricing
max-w-4xl                  → formulario, proceso
max-w-2xl                  → subtítulos de sección (centrados)
max-width: 1200px          → admin panel
```

### Grid principal
```
md:grid-cols-2             → beneficios (texto + caso real)
md:grid-cols-2 lg:grid-cols-4  → servicios
md:grid-cols-3             → pricing, métricas de resultados
md:grid-cols-4             → proceso (pasos)
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))  → stats admin
```

---

## 6. Border Radius

| Token | px | Uso |
|-------|----|-----|
| `rounded-md` | 6px | Botones, inputs, selects |
| `rounded-lg` | 8px | Bloques de resultados internos, inputs admin |
| `rounded-xl` | 12px | Tarjetas glass, contenedores principales |
| `rounded-2xl` | 16px | Modales admin |
| `rounded-full` | 50% | Pills/badges, step circles, status dot |

---

## 7. Animaciones y Transiciones

### Animación de fondo (siempre presente)
```css
@keyframes gradient-xy {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-xy 25s ease infinite;
}
```

### Hover effects estándar
```
hover:scale-105          → tarjetas de servicio, CTA hero primario
hover:scale-[1.02]       → botón submit del formulario
hover:translateY(-2px)   → stat cards del admin
transition               → todos los elementos interactivos (150ms default)
```

### Spinner de carga
```
animate-spin, rounded-full
border-4 border-slate-700 border-t-blue-500
h-16 w-16
```

### Status dot (admin)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.2); }
}
animation: pulse 2s infinite;
background: #10b981;
```

---

## 8. Iconografía

- **Librería:** Font Awesome 6.4.0 (`fa-solid`, `fa-brands`, `fa-regular`)
- **Tamaño en navbar/logo:** `text-2xl` (24px)
- **Tamaño en tarjetas de servicio:** `text-3xl` (30px)
- **Tamaño en listas/checks:** `text-sm` (14px), `mt-0.5` para alineación
- **Colores por ícono:**
  - Logo: `fa-brain` → `text-blue-500`
  - WhatsApp: `fa-whatsapp` → `text-emerald-400`
  - Voz: `fa-phone` → `text-blue-400`
  - Chatbot: `fa-comments` → `text-cyan-400`
  - Suite: `fa-rocket` → `text-purple-400`
  - Check items: `fa-check` / `fa-check-circle` → `text-blue-500`
  - Contacto: `fa-envelope`, `fa-linkedin`, `fa-map-marker-alt` → `text-blue-500`

---

## 9. Sombras y Efectos de Profundidad

```
shadow-xl shadow-blue-900/30   → botones CTA y submit (glow azul)
shadow-lg shadow-blue-900/30   → botón navbar
box-shadow: 0 4px 20px rgba(0,0,0,0.4)   → toast y header admin
box-shadow: 0 2px 20px rgba(0,0,0,0.4)   → header admin
```

### Orbs decorativos (solo hero)
```html
<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-800 rounded-full blur-[150px] opacity-20"></div>
<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0e4a6a] rounded-full blur-[150px] opacity-20"></div>
```
Uso: exclusivo en la sección hero para dar profundidad. No repetir en cada sección.

---

## 10. Reglas para Stitch / Generación de Nuevas Pantallas

1. **Fondo:** siempre dark. Usar `bg-gradient-to-br from-slate-950 via-[#0c1e3a] to-slate-950` en `<body>` con `animate-gradient`.
2. **Tarjetas:** usar la clase `.glass` (definida en el `<style>`) en lugar de `bg-white` o fondos sólidos.
3. **CTA principal:** siempre `bg-blue-600 hover:bg-blue-500`, nunca otro color para la acción primaria.
4. **Acento del admin:** usar violeta `#a78bfa` / `rgba(139, 92, 246, ...)`, no azul, para diferenciar visualmente la interfaz interna.
5. **Texto de titulares importantes:** aplicar gradiente `from-blue-500 to-cyan-400` con `text-transparent bg-clip-text`.
6. **Formularios:** inputs siempre con `bg-slate-900/50 border border-slate-700 focus:border-blue-500 focus:outline-none`.
7. **Secciones alternas:** intercalar `py-20` y `py-20 bg-slate-950/50` para crear ritmo visual sin cambios drásticos.
8. **Iconografía:** Font Awesome 6.4.0. No usar otra librería de iconos.
9. **Responsive:** todo layout en grid con breakpoint `md:`. Mobile-first con Tailwind.
10. **Sin fuentes externas:** no cargar Google Fonts. El stack usa system fonts vía Tailwind.
