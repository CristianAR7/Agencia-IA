---
description: Deploy de Agencia IA a Railway. Verifica el estado, hace build y despliega.
---

# /deploy

Despliega Agencia IA a producción en Railway.

## Checklist pre-deploy automático:
1. Verifica que no hay errores en el código
2. Comprueba que las variables de entorno están configuradas
3. Verifica conexión a PostgreSQL
4. Hace commit de los cambios pendientes
5. Push a main → Railway despliega automáticamente

## Variables críticas a verificar:
- `DATABASE_URL` — PostgreSQL Railway
- `ANTHROPIC_API_KEY` — Claude API
- `SENDGRID_API_KEY` — Emails
- `STRIPE_SECRET_KEY` — Pagos (si aplica)

## Uso:
```
/deploy
/deploy --check-only  (solo verifica sin desplegar)
```
