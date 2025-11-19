###############################################
# 🚀 Build Stage — Node 22 (LTS) + Angular CLI
###############################################
FROM node:22-alpine AS build-stage

WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./

# RUN npm ci # Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN npm install # Usually used in Dev

# Copy source
COPY . .

# Angular 17+ builds to /dist/<app-name>/browser
RUN #npm run build --omit=dev # Prod Optimized
RUN npm run build # Dev

# Build SSR (browser + server) ::: If App supports Client and Server Both
# RUN npm run build:ssr  # Must exist in package.json


################################################
## 🚀 Runtime Stage — Node 22 (LTS)
################################################
#FROM node:22-alpine AS production-stage-SSR
#
#WORKDIR /app
#
## Copy ONLY the SSR outputs (tiny production image)
#COPY --from=build-stage /app/dist/todo-app-fe/browser ./dist/browser
#COPY --from=build-stage /app/dist/todo-app-fe/server  ./dist/server
#COPY --from=build-stage /app/package*.json ./
#
#
## Install only production deps
#RUN npm ci --omit=dev
#
#EXPOSE 4000
#
## Start SSR server
#CMD ["node", "dist/server/server.mjs"]

###############################################
# 🚀 Runtime Stage — Latest NGINX Alpine
# Use This Stage if Angular Applicatio want to Run as Client Side. It doesnt Support SSR Based Angular Project.
###############################################
FROM nginx:alpine AS production-stage-Client

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular artifact
COPY --from=build-stage /app/dist/todo-app-fe/browser /usr/share/nginx/html

EXPOSE 80

#The nginx Docker image already has a built-in default CMD Command => CMD ["nginx", "-g", "daemon off;"]
# So even if we do NOT write CMD in Dockerfile, It will work. Writing explicitly for reference
CMD ["nginx", "-g", "daemon off;"]
