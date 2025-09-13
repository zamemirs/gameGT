FROM node:18-alpine
WORKDIR /app

# Copy only package.json first
COPY package*.json ./
RUN npm install

# Copy all backend code
COPY . .

EXPOSE 5000
CMD ["node", "app.js"]
