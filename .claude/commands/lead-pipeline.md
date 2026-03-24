---
description: Pipeline completo de captación de leads. Audita una web, genera propuesta, crea PDF y prepara email personalizado.
argument-hint: [url del negocio] [sector: peluqueria|gimnasio|inmobiliaria|dentista|restaurante]
---

# /lead-pipeline

Ejecuta el pipeline completo de captación para un lead de Agencia IA.

## Pasos a ejecutar en orden:

1. **Audit** — Analiza la web del negocio con `/market audit $URL`
2. **Score** — Asigna puntuación 1-10 basada en el audit
3. **Propuesta** — Genera propuesta personalizada con `/market proposal`
4. **PDF** — Crea el PDF con `/market report-pdf`
5. **Email** — Redacta el cold email personalizado con `/market emails`
6. **Notion** — Guarda todo en Notion con estado "Nuevo Lead"

## Uso:
```
/lead-pipeline https://peluqueria-ejemplo.es peluqueria
```

## Output esperado:
- `leads/[nombre-negocio]/audit.md`
- `leads/[nombre-negocio]/propuesta.md`
- `leads/[nombre-negocio]/email.md`
- `leads/[nombre-negocio]/report.pdf`
- Entrada en Notion con todos los datos
