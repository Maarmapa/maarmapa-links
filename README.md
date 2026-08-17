# maarmapa-links

Página personal estilo [Linktree](https://linktr.ee): nombre, avatar, una línea de bio y enlaces externos. Es una SPA de **React + Bootstrap** compilada con **Vite** (Node.js solo en el build) y servida en producción por **Nginx** dentro de un contenedor.

Personalizar el contenido no exige tocar componentes: nombre, foto y enlaces viven en [`src/data/profile.js`](src/data/profile.js).

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) (para construir y correr la imagen)
- Opcional, para desarrollar en caliente: Node.js 22 y npm

## Construir la imagen y correr el contenedor

```bash
docker build -t maarmapa-links .
docker run --rm -d --name maarmapa-links -p 8080:8080 maarmapa-links
```

Abrir [http://localhost:8080](http://localhost:8080). El proceso dentro del contenedor **no es root** y escucha en el puerto **8080** (un usuario sin privilegios no puede bajar de 1024). El mapeo `-p 8080:8080` publica ese puerto en la máquina.

Parar:

```bash
docker stop maarmapa-links
```

Desarrollo local (no es el modo de entrega):

```bash
npm ci
npm run dev
```

## Por qué multi-stage y por qué Nginx

React no se ejecuta en el servidor. `npm run build` deja HTML, CSS y JS estáticos en `dist/`. Node solo interviene en esa compilación.

El `Dockerfile` tiene dos `FROM`:

1. `node:22-alpine` instala dependencias desde `package-lock.json` (`npm ci`), copia el código y compila.
2. `nginxinc/nginx-unprivileged` recibe **solo** `dist/` con `COPY --from=build`. No hay Node, no hay `node_modules`, no hay fuente.

Dos `FROM` no bastan por sí solos: si la imagen final siguiera ejecutando un proceso de Node, el ejercicio no estaría cumplido. Acá el proceso es Nginx.

Otras prácticas del build:

| Práctica | Cómo |
| --- | --- |
| Capas | Primero `package.json` + lock + `npm ci`; después el código |
| Instalación reproducible | `npm ci` contra `package-lock.json` |
| Contexto limpio | `.dockerignore` deja fuera `node_modules`, `.git` y `.env` |
| Sin root | imagen `nginx-unprivileged`, puerto 8080 |
| Salud | `HEALTHCHECK` pega a `/` |
| SPA | `try_files` devuelve `index.html` si la ruta no es un archivo |

## Uso de IA durante el desarrollo

El proyecto se construyó con el **CLI de Grok (xAI)** a partir de las instrucciones del ejercicio, no a partir de una plantilla entregada.

Qué hizo la herramienta:

- Andamiar Vite + React + Bootstrap y separar el perfil de la vista.
- Escribir el `Dockerfile` multi-stage, `nginx/default.conf`, `.dockerignore` y el workflow de verificación.

Qué no se delegó a ciegas:

- La arquitectura (datos en un módulo, Node solo en compile, Nginx en runtime, usuario no privilegiado) se fijó **antes** de generar archivos, siguiendo el enunciado.
- Cada restricción se revisó en el resultado: que la imagen final no contenga `node` ni `/app`, que una ruta inventada siga devolviendo el `index.html`, que el `HEALTHCHECK` pase a `healthy`.
- El contenido del perfil es real (Mario Maldonado / maarmapa) y el avatar es el de GitHub, no un retrato inventado.

## Verificaciones

### Compilación local

```text
npm ci && npm run build
```

Resultado: Vite genera `dist/` sin errores. El HTML de entrada referencia el bundle de React y Bootstrap.

### Imagen Docker (workflow `imagen` en GitHub Actions)

En cada push a `main` el runner:

1. Construye `maarmapa-links:ci`.
2. Arranca el contenedor en `:8080` y espera `healthy`.
3. `GET /` debe incluir `maarmapa`.
4. `GET /ruta/inventada` debe responder **200** con el documento principal (SPA).
5. En la imagen final: `command -v node` falla; no existen `/app` ni `/package.json`.
6. `docker exec … id` muestra el usuario `nginx`, no `root`.

El log de la última corrida queda en la pestaña **Actions** del repositorio.

### Responsive

La página usa el grid y las utilidades de Bootstrap (`container`, `d-flex`, `gap-*`, `py-4 py-md-5`) más un tope de `28rem` para la columna de enlaces. Se revisó en anchos de teléfono (~375 px) y escritorio: el avatar, el nombre y los seis botones se apilan y siguen siendo tocables.

### Cómo repetir las comprobaciones de la imagen en local

```bash
docker build -t maarmapa-links .
docker run --rm -d --name maarmapa-links -p 8080:8080 maarmapa-links
docker inspect --format='{{.State.Health.Status}}' maarmapa-links
curl -fsS http://localhost:8080/ | grep maarmapa
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8080/ruta/inventada
docker exec maarmapa-links id
docker run --rm --user 0 --entrypoint sh maarmapa-links -c 'command -v node || echo sin-node'
docker images maarmapa-links --format '{{.Size}}'
```
