FROM node:18-alpine
WORKDIR /app

# Copy only package.json
COPY package*.json ./
RUN npm install

# Copy backend code
COPY . .

EXPOSE 5000
CMD ["node", "app.js"]