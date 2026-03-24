---
description: Revisa el estado de todos los leads activos. Muestra pipeline, pendientes de seguimiento y oportunidades calientes.
---

# /review-leads

Revisa el estado actual del pipeline de leads de Agencia IA.

## Lo que hace:
1. Lee todas las carpetas en `leads/`
2. Consulta Notion para obtener estados actualizados
3. Identifica leads sin respuesta en más de 3 días
4. Sugiere próximas acciones para cada lead
5. Genera resumen del pipeline

## Output:
```
📊 PIPELINE AGENCIA IA
─────────────────────
🆕 Nuevos leads:     X
📤 Emails enviados:  X  
💬 En conversación:  X
✅ Cerrados:         X

⚠️ REQUIEREN ACCIÓN:
- [Negocio X] — Sin respuesta 4 días → Enviar follow-up
- [Negocio Y] — Propuesta vista → Llamar

🔥 OPORTUNIDADES CALIENTES:
- [Negocio Z] — Abrió email 3 veces
```
