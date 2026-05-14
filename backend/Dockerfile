FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
RUN npm ci --workspace backend

FROM dependencies AS build
COPY backend ./backend
WORKDIR /app/backend
RUN npm run build

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json
RUN npm ci --workspace backend --omit=dev
COPY --from=build /app/backend/dist ./backend/dist
RUN mkdir -p /var/app/data
WORKDIR /app/backend
EXPOSE 4000
CMD ["node", "dist/server.js"]
