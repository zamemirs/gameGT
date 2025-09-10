# Stage 1: Build React app
FROM node:18-alpine AS build
WORKDIR /App

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /App/build /usr/share/nginx/html

# Expose container port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
