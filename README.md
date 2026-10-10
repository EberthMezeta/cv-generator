# CV Generator

Genera un CV de una columna, apto para ATS, a partir de un objeto TypeScript, con vista previa y exportación a PDF.

## Uso

```bash
npm install
npm run dev
```

1. Edita tus datos en el formulario de la izquierda; la vista previa se actualiza al instante.
2. Elige la plantilla en la barra superior.
3. Pulsa **Descargar PDF** y en el diálogo elige **Guardar como PDF** (desactiva "Encabezados y pies de página").

Los cambios se guardan automáticamente en el navegador. Usa **Respaldar JSON** para descargar una copia
e **Importar JSON** para cargarla en otro navegador o equipo. **Restaurar inicial** vuelve a los datos de
`src/data/initialResume.ts`.

### Datos iniciales

`src/data/initialResume.ts` define el CV con el que arranca la app:

- Fechas en formato `YYYY-MM`; usa `end: 'present'` para "Actualidad".
- `sections` define el orden de las secciones; quita una para ocultarla.
- Un bullet puede ser un `string` o `{ label, text }` para mostrar la etiqueta en negritas.
- `locale: 'es' | 'en'` cambia los títulos de sección y el formato de fechas.

## Arquitectura

```
src/
├── domain/           Entidades y reglas puras (sin React ni navegador)
├── application/      Casos de uso, puertos (interfaces) y formateadores
├── infrastructure/   Implementaciones de los puertos (localStorage, PDF, respaldo JSON, fotos)
├── data/             Datos iniciales del CV
├── di/               Composition root: une puertos con implementaciones
└── presentation/     React: componentes, hooks y plantillas
    ├── editor/       Formulario: campos, listas editables y paneles por sección
    └── templates/    Una carpeta por plantilla + catálogo
```

Las dependencias apuntan hacia adentro: `presentation → application → domain`. Solo `di/container.ts` conoce las implementaciones concretas.

### Agregar una plantilla

1. Crea `src/presentation/templates/<nombre>/` con su `<Nombre>Document.tsx`, su CSS (con el selector `.template-<nombre>`) y `<nombre>Template.ts`.
2. Regístrala en `templates/templateCatalog.ts`.

Las secciones (`ResumeSections`) y sus bloques se reutilizan; cada plantilla define su encabezado y su tipografía.
