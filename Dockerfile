# ============================================================
# Stage 1 — Install dependencies & build frontend
# ============================================================
FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package.json bun.lock* bun.lockb* ./
RUN bun install

COPY . .
RUN bun run build

# ============================================================
# Stage 2 — Frontend: Nginx serving static files
# ============================================================
FROM nginx:alpine AS frontend

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# ============================================================
# Stage 3 — API: Node.js contact server (bun runtime)
# ============================================================
FROM oven/bun:1-alpine AS api

WORKDIR /app

COPY package.json bun.lock* bun.lockb* ./
RUN bun install

COPY server/ ./server/
COPY tsconfig*.json ./

EXPOSE 3001

CMD ["bun", "server/index.ts"]
