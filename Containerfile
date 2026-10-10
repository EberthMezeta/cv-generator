FROM docker.io/library/node:24-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --no-fund

FROM dependencies AS development
ENV VITE_USE_POLLING=false
EXPOSE 5173
CMD ["npx", "vite", "--host", "0.0.0.0"]

FROM dependencies AS build
COPY . .
RUN npm test && npm run build && node deploy/precompress.mjs dist

FROM docker.io/joseluisq/static-web-server:2 AS production
COPY deploy/static-web-server.toml /etc/static-web-server.toml
COPY --from=build /app/dist /public
USER 65534:65534
EXPOSE 8080
ENTRYPOINT ["/static-web-server", "--config-file", "/etc/static-web-server.toml"]
