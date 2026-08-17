# syntax=docker/dockerfile:1
#
# Multi-stage: Node solo existe en la etapa de compilación.
# La imagen final es Nginx + HTML/CSS/JS. Sin node_modules, sin fuente.

# ── 1. Compilar React ────────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Dependencias primero: el lockfile cambia poco, el código cambia seguido.
# Así Docker reutiliza npm ci cuando solo se edita JSX.
COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src

RUN npm run build

# ── 2. Servir estáticos, sin privilegios ─────────────────────────────────────
# nginx-unprivileged escucha en 8080 (un no-root no puede bajar de 1024)
# y ya corre como usuario nginx (UID 101). No hay Node en esta imagen.
FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
