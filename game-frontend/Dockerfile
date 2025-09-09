# Build
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

# Serve
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# OPTIONAL: If you want to proxy /api to backend, add a custom nginx.conf later
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
