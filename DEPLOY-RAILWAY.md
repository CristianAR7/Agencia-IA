# 🚂 Guía de Deploy en Railway

## 🎯 Solución al Error "Railpack could not determine"

El error ocurre porque Railway no sabe qué carpeta ejecutar. Aquí están las soluciones:

---

## ✅ SOLUCIÓN 1: Configurar Root Directory (MÁS RÁPIDO)

### Pasos:

1. **En Railway Dashboard:**
   - Click en tu servicio
   - **Settings** (⚙️)

2. **Scroll hasta "Root Directory":**
   - Click "Configure"
   - Escribir: `backend`
   - Save

3. **Configurar Variables de Entorno:**
   - Settings → Variables
   - Add Variable:
   ```
   ANTHROPIC_API_KEY=sk-ant-tu-key-aqui
   PORT=3000
   NODE_ENV=production
   ```

4. **Redeploy:**
   - Deployments → Three dots → Redeploy
   - Debería funcionar ✅

---

## ✅ SOLUCIÓN 2: Usar Archivos de Configuración

Ya están creados en la raíz del proyecto:
- `railway.json` ✅
- `Procfile` ✅
- `start.sh` ✅

### Pasos:

1. **Eliminar el servicio actual en Railway**
2. **New Project → Deploy from GitHub**
3. **Conectar tu repo**
4. Railway detectará automáticamente los archivos de config
5. **Configurar variables de entorno** (ver abajo)
6. Deploy automático ✅

---

## ✅ SOLUCIÓN 3: Deployar Solo Backend (MÁS LIMPIO)

### Opción A: Nuevo Proyecto con Solo Backend

1. **Crear nuevo repo en GitHub** con solo la carpeta `backend/`

2. **En Railway:**
   - New Project → Deploy from GitHub
   - Seleccionar el repo
   - Deploy automático

### Opción B: Usar Railway CLI

```bash
# Instalar Railway CLI (sin admin)
npm install -g railway

# O descargar binario:
# https://docs.railway.app/develop/cli#manual-install

# En la carpeta backend/
cd ai-solution-generator/backend
railway login
railway init
railway up
```

---

## 🔑 Variables de Entorno Necesarias

En Railway → Settings → Variables, agregar:

### Mínimo necesario:
```env
ANTHROPIC_API_KEY=sk-ant-api-xxxxxxxxx
PORT=3000
NODE_ENV=production
```

### Si usas WhatsApp Agent:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### Si usas Voice Agent:
```env
VAPI_API_KEY=xxxxxxxxx
VAPI_ASSISTANT_ID=xxxxxxxxx
ELEVENLABS_API_KEY=xxxxxxxxx
```

---

## 📋 Checklist de Deploy

**Antes de deployar:**
- [ ] Código subido a GitHub/Railway
- [ ] Variables de entorno configuradas
- [ ] Root directory configurado (si usas Solución 1)

**Después del deploy:**
- [ ] Check logs: Deployments → View Logs
- [ ] Probar health check: `https://tu-app.railway.app/health`
- [ ] Configurar dominio custom (opcional)

---

## 🐛 Troubleshooting

### Error: "npm: command not found"

**Solución:** Railway debe detectar que es Node.js. Asegúrate que:
- `package.json` está en el root directory configurado
- O usa `railway.json` y `start.sh`

### Error: "Module not found"

**Solución:** 
```bash
# En Settings → Deploy
# Build Command: cd backend && npm install
# Start Command: cd backend && npm start
```

### Error: "Port already in use"

**Solución:** Railway asigna el puerto automáticamente.
Tu código debe usar:
```javascript
const PORT = process.env.PORT || 3000;
```

(Ya está configurado así en el backend)

### Logs no aparecen

**Solución:**
- Deployments → Select deployment → View Logs
- O usar Railway CLI: `railway logs`

---

## 🔗 URLs Útiles

Después del deploy, obtienes:
- **URL pública:** `https://tu-proyecto.up.railway.app`
- **Health check:** `https://tu-proyecto.up.railway.app/health`
- **API endpoint:** `https://tu-proyecto.up.railway.app/api/analyze`

### Configurar Webhook de Twilio:

En Twilio Console:
- WhatsApp Sandbox Settings
- Webhook URL: `https://tu-proyecto.up.railway.app/webhook/whatsapp`
- Method: POST

---

## 💰 Costos de Railway

**Plan Gratuito:**
- $5 de crédito gratis al mes
- Suficiente para testing y demos
- Reinicia después de inactividad

**Plan Hobby ($5/mes):**
- Sin límite de horas
- No reinicia
- Suficiente para 5-10 clientes

**Plan Pro ($20/mes):**
- Para producción seria
- 10+ clientes

---

## 🚀 Deploy Alternativo: Render

Si Railway da problemas, prueba Render:

1. **https://render.com**
2. **New → Web Service**
3. **Connect repository**
4. **Settings:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Environment Variables:** (mismo que Railway)
6. **Create Web Service**

---

## 📞 Testing Post-Deploy

### 1. Health Check
```bash
curl https://tu-app.railway.app/health

# Deberías ver:
# {"status":"ok","service":"AI Solution Generator"}
```

### 2. Test API
```bash
curl -X POST https://tu-app.railway.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Business",
    "industry": "general",
    "solutionTypes": ["whatsapp-agent"]
  }'
```

### 3. Test WhatsApp (si configuraste)
- Envía mensaje a tu número Twilio
- Debería responder automáticamente

---

## ✅ Deploy Exitoso

Si ves esto en logs:
```
🚀 AI Solution Generator Backend running on port 3000
📊 Ready to analyze solutions!
```

**¡Felicidades! Todo funciona.**

---

## 🎯 Siguiente Paso

Una vez deployado:
1. Copiar URL pública
2. Probar con `curl` o Postman
3. Configurar webhooks de Twilio/Vapi
4. ¡Listo para mostrar a clientes!

---

**¿Problemas?** Revisa logs en Railway → Deployments → View Logs
