FROM node:18-alpine
WORKDIR /app/game-backend

COPY game-backend/package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "app.js"]
