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

## Levantar con contenedores

El `Containerfile` es multi-stage y funciona igual con Docker y con Podman:

- `dependencies`: instala dependencias con caché de npm (solo se repite si cambia `package-lock.json`).
- `development`: servidor de Vite con hot reload.
- `build`: ejecuta las pruebas, compila y precomprime los assets (gzip y brotli).
- `production`: imagen final de ~15 MB con `static-web-server`, sin privilegios, en el puerto 8080.

### Producción

```bash
docker compose up -d --build    # o: podman compose up -d --build
docker compose down             # o: podman compose down
```

El puerto del equipo se cambia con `CV_GENERATOR_PORT` (por defecto `8080`). Abre http://localhost:8080;
el endpoint `/health` responde `OK`.

Tiempos de build, tamaño, latencia y el porqué de cada optimización: [docs/rendimiento-contenedores.md](docs/rendimiento-contenedores.md).

`podman compose` necesita tener instalado `podman-compose` o `docker-compose`. Sin compose:

```bash
podman build -t cv-generator .
podman run -d --name cv-generator -p 8080:8080 --read-only cv-generator
```

### Desarrollo

```bash
docker compose -f compose.dev.yaml up --build    # o: podman compose -f compose.dev.yaml up --build
```

El código se monta en el contenedor y Vite recarga los cambios en http://localhost:5173
(`CV_GENERATOR_DEV_PORT` cambia el puerto). Si los cambios no se detectan (por ejemplo en WSL o macOS),
usa `VITE_USE_POLLING=true`.

`node_modules` vive en un volumen propio. Después de cambiar dependencias, recréalo:

```bash
docker compose -f compose.dev.yaml down -v
docker compose -f compose.dev.yaml up --build
```

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
