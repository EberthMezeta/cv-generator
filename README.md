# CV Generator

Genera un CV de una columna, apto para ATS, a partir de un objeto TypeScript, con vista previa y exportación a PDF.

## Uso

```bash
npm install
npm run dev
npm test
```

1. Edita tus datos en el formulario; la vista previa se actualiza al instante (puedes ocultarla para tener más espacio).
2. Elige la plantilla en la barra superior.
3. Pulsa **Descargar PDF** y en el diálogo elige **Guardar como PDF** (desactiva "Encabezados y pies de página").

Los cambios se guardan automáticamente en el navegador. Desde el menú **Datos** puedes:

- **Respaldar mis datos (JSON)**: descarga una copia para usarla en otro navegador o equipo.
- **Importar JSON**: carga un respaldo o un archivo creado a partir de la plantilla.
- **Descargar plantilla JSON**: un CV de ejemplo con la estructura que acepta la app.
- **Restaurar ejemplo**: vuelve a los datos de `src/data/sampleResume.ts`.

### Compatibilidad ATS

Las plantillas usan una sola columna, encabezados estándar y texto real (no imágenes), que es lo que leen
los sistemas de seguimiento de candidatos. El panel **Compatibilidad ATS** además:

- Revisa el contenido: correo, teléfono, secciones estándar, fechas, logros con cifras, elementos vacíos, foto.
- Compara tu CV con la descripción de una vacante y muestra qué palabras clave tienes y cuáles faltan.

### Formato del JSON

- Fechas en formato `YYYY-MM`; usa `"end": "present"` para "Actualidad".
- `sections` define el orden de las secciones; quita una para ocultarla.
- Un punto puede ser un texto o `{ "label": "...", "text": "..." }` para mostrar la etiqueta en negritas.
- `locale`: `"es"` o `"en"`.

## Arquitectura

```
src/
├── domain/           Entidades, reglas y análisis ATS (sin React ni navegador)
├── application/      Casos de uso, puertos (interfaces) y formateadores
├── infrastructure/   Implementaciones de los puertos (localStorage, PDF, respaldo JSON, fotos)
├── data/             CV de ejemplo (datos iniciales y plantilla JSON)
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
