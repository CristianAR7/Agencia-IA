# Admin Panel — Agencia IA

Panel de administración para visualizar y gestionar los leads capturados por el formulario de la agencia.

## Acceso

Una vez el servidor esté corriendo, abre en tu navegador:

```
http://localhost:3000/admin
```

En producción (Railway, etc.):

```
https://<tu-dominio>/admin
```

## Funcionalidades

### Dashboard de estadísticas
- **Total Leads** — número total de formularios recibidos
- **Pendientes** — leads sin gestionar
- **Contactados** — leads con los que ya se ha hablado
- **Cerrados** — leads convertidos o descartados

### Tabla de leads
- Listado de todos los leads ordenados por fecha (más reciente primero)
- Búsqueda en tiempo real por empresa, email o industria
- Ordenación por columna (empresa, email, industria, presupuesto, estado, fecha)
- Auto-refresco cada 30 segundos

### Detalle de lead
Al pulsar **Ver** en cualquier fila se abre un modal con:
- Datos completos del cliente (empresa, email, industria, presupuesto, volumen)
- Soluciones solicitadas y objetivos (como tags)
- Descripción e información adicional
- Selector de estado para actualizar el lead (Pendiente → Contactado → Cerrado)

### Exportar CSV
Descarga todos los leads en formato `.csv` con un clic, listo para abrir en Excel o Google Sheets.

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/admin/leads` | Lista todos los leads (ordenados por fecha desc) |
| `GET` | `/api/admin/leads/:id` | Devuelve un lead por ID |

### Ejemplo de respuesta

```json
[
  {
    "id": 1712345678901,
    "businessName": "Mi Empresa S.L.",
    "email": "contacto@miempresa.com",
    "industry": "ecommerce",
    "solutionTypes": ["whatsapp-agent", "web-chatbot"],
    "goals": ["lead-qualification", "sales"],
    "volume": "1000-5000",
    "budget": "500-1000",
    "businessDescription": "Tienda online de moda",
    "additionalInfo": "",
    "solution": { ... },
    "createdAt": "2024-04-05T14:30:00.000Z",
    "status": "pending"
  }
]
```

## Estados de un lead

| Estado | Descripción |
|--------|-------------|
| `pending` | Lead recibido, sin gestionar |
| `contacted` | Se ha contactado con el cliente |
| `closed` | Lead cerrado (ganado o perdido) |

> **Nota:** El estado se actualiza en memoria. Para persistencia permanente entre reinicios, conecta una base de datos (PostgreSQL, MongoDB, Supabase, etc.).

## Estructura de archivos

```
backend/
├── admin/
│   └── index.html      ← Panel de administración (este archivo)
├── server.js           ← Servidor Express con endpoints /api/admin/*
└── ...
```

## Próximos pasos sugeridos

- [ ] Añadir autenticación básica (usuario/contraseña) para proteger el panel
- [ ] Persistir leads en base de datos (Supabase / PostgreSQL)
- [ ] Enviar notificación por email/Slack cuando llega un nuevo lead
- [ ] Añadir paginación para manejar grandes volúmenes de leads
- [ ] Exportar también en formato Excel (`.xlsx`)
