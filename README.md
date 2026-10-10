# CV Generator

Genera un CV de una columna, apto para ATS, a partir de un objeto TypeScript, con vista previa y exportación a PDF.

## Uso

```bash
npm install
npm run dev
```

1. Edita `src/data/resume.ts`.
2. Elige la plantilla en la barra superior.
3. Pulsa **Descargar PDF** y en el diálogo elige **Guardar como PDF** (desactiva "Encabezados y pies de página").

### Formato de los datos

- Fechas en formato `YYYY-MM`; usa `end: 'present'` para "Actualidad".
- `sections` define el orden de las secciones; quita una para ocultarla.
- Un bullet puede ser un `string` o `{ label, text }` para mostrar la etiqueta en negritas.
- `locale: 'es' | 'en'` cambia los títulos de sección y el formato de fechas.
- La foto es opcional (`personal.photo`) y va en `public/`.

## Arquitectura

```
src/
├── domain/           Entidades y reglas puras (sin React ni navegador)
├── application/      Casos de uso, puertos (interfaces) y formateadores
├── infrastructure/   Implementaciones de los puertos (repositorio, exportador PDF)
├── data/             El objeto con tu CV
├── di/               Composition root: une puertos con implementaciones
└── presentation/     React: componentes, hooks y plantillas
    └── templates/    Una carpeta por plantilla + catálogo
```

Las dependencias apuntan hacia adentro: `presentation → application → domain`. Solo `di/container.ts` conoce las implementaciones concretas.

### Agregar una plantilla

1. Crea `src/presentation/templates/<nombre>/` con su `<Nombre>Document.tsx`, su CSS (con el selector `.template-<nombre>`) y `<nombre>Template.ts`.
2. Regístrala en `templates/templateCatalog.ts`.

Las secciones (`ResumeSections`) y sus bloques se reutilizan; cada plantilla define su encabezado y su tipografía.
