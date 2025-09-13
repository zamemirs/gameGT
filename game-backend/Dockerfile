# game-backend/Dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy only package files
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

EXPOSE 5000
CMD ["node", "app.js"]
