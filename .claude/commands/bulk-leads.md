---
description: Procesa múltiples leads desde un CSV exportado de Apify. Ejecuta el pipeline completo para cada uno automáticamente.
argument-hint: [ruta al CSV de Apify] [sector]
---

# /bulk-leads

Procesa en batch todos los leads de un CSV de Apify Google Maps Scraper.

## Formato esperado del CSV:
```
nombre,url,email,telefono,ciudad,sector
Peluquería María,https://peluqueria-maria.es,info@peluqueria-maria.es,612345678,Madrid,peluqueria
```

## Proceso automático por cada fila:
1. Ejecuta `/lead-pipeline [url] [sector]`
2. Crea carpeta `leads/[nombre]/`
3. Guarda audit + propuesta + email + PDF
4. Actualiza Notion con estado "Pendiente envío"
5. Genera resumen final con stats del batch

## Uso:
```
/bulk-leads leads/apify-export.csv peluqueria
```

## Output:
- Carpeta `leads/` con subcarpeta por negocio
- `leads/resumen-batch.md` con stats generales
- Notion actualizado con todos los leads
