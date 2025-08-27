FROM node:20-alpine AS builder
WORKDIR /app/frontend

COPY Frontend/package*.json ./
RUN npm install

COPY Frontend/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app/backend

COPY Backend/package*.json ./
RUN npm install --only=production

COPY Backend/ ./

COPY --from=builder /app/frontend/build ./public

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001


CMD ["node", "src/server.js"]
