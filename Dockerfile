# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20.16.0

# Building layer API
FROM node:${NODE_VERSION}-alpine AS build-api

# Install dependencies from package.json
RUN npm install

# Build application (produces dist/folder)
RUN npm run build

# Runtime (production) layer
FROM node:${NODE_VERSION}-alpine AS production

# Defining an argument for a port
ARG PORT

# Defining an argument for a host
ARG HOST

WORKDIR /app

# Copy configuration files
COPY --from=build-api /app/tsconfig*.json ./
COPY --from=build-api /app/package*.json ./
COPY --from=build-api /app/nest-cli.json ./

# Install runtime dependecies (without dev/test dependecies)
RUN npm i --omit=dev

# Copy production build
COPY --from=build-api /app/dist/ ./dist/

# Opening the port
EXPOSE ${PORT}

# Defining an environment variable for an application
ENV PORT=${PORT}

# Defining an environment variable for an application
ENV HOST=${HOST}

# Let's launch node
CMD [ "node", "dist/main.js" ]