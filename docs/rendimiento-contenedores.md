# Rendimiento de los contenedores

Medición del `Containerfile` y los archivos compose (Docker y Podman): tiempos de build con y sin caché,
tamaño de imagen, arranque, latencia, throughput, memoria y entorno de desarrollo.

Para tener una referencia, cada métrica se compara con una imagen **"ingenua"**: la que se suele escribir
de primeras, en una sola etapa y sin optimizar.

```dockerfile
FROM docker.io/library/node:24
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npx", "vite", "preview", "--host", "0.0.0.0"]
```

## Resumen

| Métrica | Ingenua | Actual | Mejora |
|---|---:|---:|---:|
| Tamaño de imagen | 2 GB | **14.2 MB** | 144× más chica |
| Build en frío | 98.3 s | **19.5 s** | 5× más rápido |
| Rebuild tras cambiar código | 32.6 s | **10.2 s** | 3.2× más rápido |
| Rebuild sin cambios | 0.8 s | 0.8 s | igual |
| Arranque hasta la primera respuesta | 932 ms | **294 ms** | 3.2× más rápido |
| JS principal descargado (brotli) | 271.7 KB (sin brotli) | **72.8 KB** | −73 % |
| Throughput del JS con gzip | 270 req/s | **3,533 req/s** | 13× más |
| p50 del JS con gzip y 50 conexiones | 183.5 ms | **12.7 ms** | 14× menos |
| RAM en reposo | 182–210 MB | **25–29 MB** | ~7× menos |

## Entorno y método

- **Equipo:** AMD Ryzen 5 PRO 7530U (12 hilos), 30 GB de RAM, Linux.
- **Runtime:** Docker 29.9.0 con BuildKit y Compose 5.6. No se midió con Podman porque no está instalado
  en este equipo.
- **Builds:** tiempo de reloj de `docker compose build`. "En frío" significa `--no-cache`, y en la primera
  fila además se vació el caché de npm (`docker builder prune --filter type=exec.cachemount`). Las imágenes
  base ya estaban descargadas.
- **HTTP:** cliente Node con keep-alive en el mismo equipo (loopback), 200 peticiones de calentamiento,
  luego 5,000 a 20,000 peticiones con 50 conexiones concurrentes. La latencia unitaria es el promedio de 30
  peticiones secuenciales con `curl`.
- **Fecha:** 2026-10-10. Cada medición se corrió una vez (dos en los builds), así que hay que tomarlas
  como órdenes de magnitud, no como valores exactos.

## Build

### Producción (`docker compose build`)

| Escenario | Tiempo |
|---|---:|
| Frío, sin caché de npm (primera vez en un equipo nuevo) | 19.5 s |
| Frío, con caché de npm (`--no-cache`) | 16.8 s |
| Cambio en `src/` | 10.2 s |
| Sin cambios | 0.8 s |

Desglose del build en frío:

| Paso | Tiempo |
|---|---:|
| `npm ci` (con caché de npm) | 9.1 s |
| `npm test` + `tsc -b` + `vite build` + precompresión | 6.3–7.0 s |
| Exportar la imagen | 1.5 s |

Medido en el equipo, dentro del paso de build: `npm test` tarda 0.7 s, `tsc -b` 2.9 s, `vite build` 0.8 s
y la precompresión 0.6 s.

Cuando solo cambia el código, `npm ci` sale del caché de capas y solo se repite el paso de build:
unos 7 s más el exportado.

### Desarrollo (`docker compose -f compose.dev.yaml build`)

| Escenario | Tiempo |
|---|---:|
| Frío (`--no-cache`) | 22.0 s |
| Sin cambios, o después de construir producción | 0.8 s |

Las dos imágenes comparten la etapa `dependencies`: construir una deja lista la otra.

## Servidor de producción

### Tamaño de transferencia

| Recurso | Sin comprimir | gzip | brotli |
|---|---:|---:|---:|
| `index.js` | 271.7 KB | 84.7 KB | **72.8 KB** |
| `index.css` | 37.9 KB | 16.1 KB | **15.0 KB** |
| `index.html` | 462 B | 462 B | 462 B (no vale la pena comprimirlo) |

La imagen ingenua comprime con gzip al vuelo (84.9 KB) y no ofrece brotli: si el navegador lo pide,
recibe los 271.7 KB completos.

### Latencia y throughput

| Prueba | Ingenua | Actual |
|---|---:|---:|
| `/` con 50 conexiones | 5,050 req/s · p50 9.3 ms · p99 19.8 ms | **6,609 req/s** · p50 6.9 ms · p99 15.3 ms |
| JS con brotli pedido | 1,380 req/s · p50 34.8 ms (sin comprimir) | **3,157 req/s** · p50 14.2 ms |
| JS con gzip | 270 req/s · p50 183.5 ms · p99 229 ms | **3,533 req/s** · p50 12.7 ms · p99 32.6 ms |
| JS sin comprimir | — | 1,872 req/s · 508 MB/s |
| Petición unitaria a `/` | — | TTFB 0.39 ms, total 0.42 ms |
| Petición unitaria al JS | — | TTFB 0.48 ms, total 0.58 ms |

Cero errores en todas las pruebas.

### Arranque y recursos

| | Ingenua | Actual |
|---|---:|---:|
| `docker run` hasta la primera respuesta | 932 ms | 294 ms |
| RAM en reposo | 182–210 MB | 25–29 MB |

## Entorno de desarrollo

| Métrica | Valor |
|---|---:|
| `up` con volumen de `node_modules` nuevo hasta la primera respuesta | 2.0 s |
| `restart` hasta la primera respuesta | 0.8 s |
| Primera transformación de `main.tsx` / siguientes | 114 ms / 12 ms |
| HMR (guardar en el equipo → Vite emite el update), inotify | **16–19 ms** |
| HMR con `VITE_USE_POLLING=true` | 72–103 ms, ~3 % de CPU en reposo |
| RAM | 160–400 MB |

## Qué se optimizó y por qué

### 1. Build multi-stage

El `Containerfile` tiene cuatro etapas: `dependencies` → `development` | `build` → `production`. La
imagen final solo contiene el binario de `static-web-server` y los 1.3 MB de `dist/`: ni Node, ni
`node_modules`, ni código fuente.

**Por qué:** la imagen ingenua ocupa 2 GB porque lleva Node, las herramientas del sistema, los 188 MB de
`node_modules` y el código. Para servir archivos estáticos no hace falta nada de eso. Una imagen más
chica se descarga y se despliega más rápido, ocupa menos disco y tiene menos superficie de ataque.

### 2. Dependencias en su propia capa, antes que el código

`package.json` y `package-lock.json` se copian e instalan **antes** de `COPY . .`.

**Por qué:** Docker invalida el caché a partir de la primera capa que cambia. En la imagen ingenua,
cualquier cambio en un `.tsx` invalida `COPY . .` y obliga a correr `npm install` otra vez (32.6 s). Con
esta separación, `npm ci` solo se repite cuando cambia el lockfile, y un cambio de código cuesta 10.2 s.

### 3. Caché de npm con `RUN --mount=type=cache`

El directorio `/root/.npm` se monta como caché persistente de BuildKit/Buildah.

**Por qué:** cuando sí cambia el lockfile, npm reutiliza los paquetes ya descargados en vez de bajarlos
otra vez, y el caché no se guarda dentro de la imagen. Ahorró unos 3 s en el build en frío (19.5 s →
16.8 s), y la diferencia crece con una red más lenta. `--prefer-offline --no-audit --no-fund` evita
consultas de red innecesarias. `npm ci` instala exactamente lo que dice el lockfile.

### 4. `.dockerignore`

Excluye `node_modules`, `dist`, `.git` y los archivos de contenedor.

**Por qué:** el contexto de build pasa de ~190 MB a 728 KB, así que enviarlo es instantáneo. Además
evita que el `node_modules` del equipo pise al del contenedor (pueden tener binarios nativos de otra
plataforma) y que editar el README o el compose invalide el caché del build.

### 5. Pruebas dentro del build

`npm test` corre antes de `npm run build`.

**Por qué:** si una prueba falla, no se genera la imagen, así que nunca se despliega una versión rota.
Cuesta 0.7 s.

### 6. Precompresión en el build (gzip 9 + brotli 11)

`deploy/precompress.mjs` genera `.gz` y `.br` de los HTML, JS, CSS, SVG y JSON de más de 512 bytes,
y el servidor los sirve tal cual (`compression-static = true`, `compression = false`).

**Por qué:** comprimir al máximo nivel es caro, pero se hace una sola vez en el build y no en cada
petición. Es la mayor diferencia de rendimiento: con gzip, la imagen ingenua comprime en cada petición y
se queda en 270 req/s (p50 183 ms), mientras que la actual entrega el archivo ya comprimido a 3,533 req/s
(p50 12.7 ms). Brotli a máxima calidad deja el JS en 72.8 KB, un 14 % menos que gzip y un 73 % menos que
sin comprimir, y eso es lo que el usuario descarga.

### 7. `static-web-server` en lugar de Node o nginx

Es un servidor de archivos estáticos escrito en Rust que viene en una imagen `scratch` de 12 MB.

**Por qué:** arranca en ~0.3 s, usa unos 28 MB de RAM y soporta SPA fallback, archivos precomprimidos,
cabeceras de seguridad y endpoint de salud solo con configuración. `vite preview` (el servidor de la
imagen ingenua) no está pensado para producción, y nginx necesitaría una imagen más grande y más
configuración para lo mismo.

### 8. Cabeceras de caché

- `/assets/**`: `Cache-Control: public, max-age=31536000, immutable`. Vite pone un hash en el nombre de
  estos archivos, así que su contenido nunca cambia bajo el mismo nombre.
- `/`, `/index.html` y `/favicon.svg`: `no-cache`, para que el navegador revalide siempre y vea los
  despliegues nuevos.

**Por qué:** en visitas repetidas el navegador no vuelve a pedir JS, CSS ni fuentes; solo revalida un HTML
de 462 bytes.

### 9. Seguridad sin costo de rendimiento

- Corre como usuario sin privilegios (`USER 65534:65534`).
- Sistema de archivos de solo lectura (`read_only: true`) y `no-new-privileges`.
- `security-headers = true` agrega HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options`, etc.
- La imagen no tiene shell ni gestor de paquetes.

### 10. Desarrollo dentro del contenedor

- **Reutiliza la etapa `dependencies`:** no se instala nada dos veces.
- **El código se monta desde el equipo y `node_modules` va en un volumen con nombre:** se edita en el
  equipo y Vite lo ve al instante, pero `node_modules` queda con los binarios de Linux/Alpine del
  contenedor. Si se usara el `node_modules` del equipo, podría tener binarios de otra plataforma.
- **`strictPort: true`:** si el puerto 5173 está ocupado, Vite falla en vez de cambiar de puerto en
  silencio dentro del contenedor, lo que dejaría el puerto publicado apuntando a nada.
- **Polling opcional (`VITE_USE_POLLING`):** con inotify, el HMR tarda 16–19 ms y no consume CPU. El
  polling (72–103 ms y ~3 % de CPU constante) solo hace falta donde inotify no cruza el montaje (WSL,
  macOS, algunos montajes de red), por eso viene apagado por defecto.

### 11. Compatibilidad con Podman

- Las imágenes base usan el nombre completo (`docker.io/library/node:24-alpine`). Podman no asume Docker
  Hub y, con nombres cortos, pregunta o falla.
- Las imágenes locales se llaman `localhost/cv-generator:*`, la convención de Podman para imágenes sin
  registro.
- El volumen de código usa `:z` para que funcione con SELinux (Fedora, RHEL). Docker lo ignora sin
  problema.
- El archivo se llama `Containerfile`, el nombre que Podman/Buildah buscan por defecto. En compose se
  indica de forma explícita para Docker.

## Limitaciones de la medición

- El cliente y el servidor corren en el mismo equipo por loopback: los números de throughput miden el
  servidor, no la red. En una red real, la diferencia de tamaño (brotli vs. sin comprimir) pesa todavía
  más.
- La imagen ingenua es una referencia típica, no la mejor alternativa posible con Node.
- No hay healthcheck en compose: la imagen `scratch` no tiene `curl` ni shell para ejecutarlo. `/health`
  responde `OK` para usarlo desde un orquestador o un balanceador.
- Faltan las mediciones con Podman.
