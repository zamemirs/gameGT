FROM node:18-alpine
WORKDIR /app

# Copy package files first (cache layer)
COPY package*.json ./
RUN npm install --production

# Copy backend source code
COPY . .

# Start the server
CMD ["node", "game-backend/app.js"]
