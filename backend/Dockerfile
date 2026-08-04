FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install --include=dev

COPY backend/. .

RUN npm run build && test -f dist/server.js

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate && npm run start"]
