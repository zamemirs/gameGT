# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy package files and install deps
COPY game-backend/package*.json ./
RUN npm install --production

# Copy the backend source
COPY game-backend/ .

# Start the server
CMD ["node", "app.js"]
