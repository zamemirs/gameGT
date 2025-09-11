# Stage 1: Build React app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install deps (fix peer deps issue)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the source and build
COPY . .
RUN npm run build

RUN npm ls ajv ajv-keywords

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
