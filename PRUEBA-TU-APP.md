# 🎯 PRUEBA TU APP AHORA

Tu app está en: **https://agencia-ia-production.up.railway.app**

---

## ✅ TEST 1: Health Check (30 segundos)

**Abre en navegador:**
```
https://agencia-ia-production.up.railway.app/health
```

**Deberías ver:**
```json
{
  "status": "ok",
  "service": "AI Solution Generator"
}
```

✅ Si ves esto → Backend funcionando perfectamente

❌ Si no carga → Revisar logs en Railway

---

## ✅ TEST 2: Probar API con Datos Reales (1 minuto)

### Opción A: Desde Terminal

```bash
curl -X POST https://agencia-ia-production.up.railway.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Clínica Dental Sonrisa",
    "industry": "salud",
    "businessDescription": "Clínica dental moderna",
    "solutionTypes": ["whatsapp-agent"],
    "goals": ["appointment-booking", "customer-support"],
    "volume": "medium",
    "budget": "pro",
    "additionalInfo": "Necesitamos integración con Google Calendar",
    "email": "admin@clinica.com"
  }'
```

### Opción B: Desde Navegador (DevTools Console)

1. Abre Chrome DevTools (F12)
2. Console
3. Pega esto:

```javascript
fetch('https://agencia-ia-production.up.railway.app/api/analyze', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    businessName: "Clínica Dental Sonrisa",
    industry: "salud",
    solutionTypes: ["whatsapp-agent"],
    goals: ["appointment-booking"],
    volume: "medium",
    budget: "pro",
    email: "test@test.com"
  })
})
.then(r => r.json())
.then(data => console.log(data))
```

**Deberías recibir:**
```json
{
  "recommendedStack": "Node.js + Express | Twilio WhatsApp API...",
  "estimatedTime": "2 semanas (MVP funcional)",
  "estimatedCost": "€300/mes (costos de APIs y servicios)",
  "architecture": "... diagrama ...",
  "components": [...],
  "apis": [...],
  "nextSteps": [...]
}
```

---

## ✅ TEST 3: Formulario Completo (2 minutos)

He actualizado el formulario para que apunte a tu Railway.

**Descarga:** `intake-form.html` (arriba ↑)

**Cómo usarlo:**

1. **Descargar el archivo** de arriba
2. **Abrir con navegador** (doble click o arrastra a Chrome)
3. **Completar el formulario:**
   - Nombre negocio: "Clínica Test"
   - Industria: Salud
   - Marcar: ☑ Agente de WhatsApp
   - Objetivos: Agendar citas
   - Volumen: Menos de 500
   - Presupuesto: €200-500
   - Email: tu@email.com

4. **Click "🚀 Generar Mi Solución IA"**

5. **Esperar 2-3 segundos**

6. **Ver resultado:**
   - Stack recomendado
   - Arquitectura
   - Componentes
   - APIs necesarias
   - Próximos pasos

---

## 🎬 Demo para Cliente

**El formulario ES tu demo.** Puedes:

### Opción 1: Compartir HTML
- Enviar `intake-form.html` por email
- Cliente lo abre en su navegador
- Completa y ve su propuesta instantánea

### Opción 2: Deploy en Vercel (5 min)

```bash
# 1. Subir frontend/ a GitHub
# 2. Ir a vercel.com
# 3. New Project → Import tu repo
# 4. Root Directory: frontend
# 5. Deploy

# Obtienes: https://tu-agencia.vercel.app
```

### Opción 3: Hosting Simple
- Subir HTML a cualquier hosting gratuito:
  - Netlify Drop
  - GitHub Pages
  - Surge.sh

---

## 📊 URLs de Tu Sistema

**Backend (Railway):**
```
https://agencia-ia-production.up.railway.app
```

**Endpoints disponibles:**
- `/health` - Health check
- `/api/analyze` - Analizar necesidades del cliente
- `/api/generate-solution` - Generar código completo

**Frontend:**
- Local: `intake-form.html`
- Deploy en Vercel/Netlify (opcional)

---

## 🔧 Configurar Webhooks (Cuando tengas cliente)

**Para WhatsApp (Twilio):**
```
Webhook URL: https://agencia-ia-production.up.railway.app/webhook/whatsapp
Method: POST
```

**Para Voice (Vapi):**
```
Server URL: https://agencia-ia-production.up.railway.app/webhook/call
Events URL: https://agencia-ia-production.up.railway.app/webhook/events
```

---

## 🎯 Checklist Final

Prueba que todo funciona:

- [ ] Health check carga correctamente
- [ ] API responde con datos (curl o DevTools)
- [ ] Formulario HTML funciona localmente
- [ ] Recibes propuesta completa con arquitectura
- [ ] (Opcional) Frontend deployado en Vercel

---

## 💰 Listo para Vender

Una vez completado el checklist:

✅ **Sistema funcional en producción**
✅ **URL pública para mostrar** 
✅ **Formulario de demo listo**
✅ **API generando propuestas**

**Ahora puedes:**
1. Grabar video demo (2 min)
2. Enviar formulario a prospectos
3. Mostrar propuestas generadas automáticamente
4. Cerrar ventas

---

## 🚀 Siguiente Paso

**Haz los 3 tests AHORA:**
1. Health check en navegador
2. API con curl o DevTools
3. Formulario completo

**Cuando funcione todo:**
- Graba video de 2 min mostrando el formulario
- Envía a 10 prospectos
- Agenda demos

**Primera venta en 7 días.** 🎯
