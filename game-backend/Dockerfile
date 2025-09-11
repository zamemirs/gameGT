FROM node:18-alpine
WORKDIR /app

# Copy package.json and lock file (inside game-backend already)
COPY package*.json ./
RUN npm install

# Copy rest of backend source
COPY . .

EXPOSE 5000
CMD ["node", "app.js"]
