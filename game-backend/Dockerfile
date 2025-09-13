# game-backend/Dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy only backend code
COPY game-backend/package*.json ./
RUN npm install

COPY game-backend/. ./

EXPOSE 5000
CMD ["node", "app.js"]
