# Helpdesk API V1 («Heldesk Service»)

Helpdesk API of technical support

![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/@nestjs/common)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/@nestjs/config)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/@nestjs/core)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/@nestjs/jwt)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/@nestjs/mongoose)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/@nestjs/passport)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/@nestjs/platform-express)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/@nestjs/swagger)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/rxjs)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/class-validator)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/mongoose)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/passport-jwt)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/bcrypt)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/dayjs)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/netmask)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api-v1/pingman)

## Demo application: [Helpdesk API V1](https://helpdesk-api-l8pk.onrender.com/api/v1)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/).

## Downloading

```bash
git clone
```

## Installing NPM modules

```bash
# install dependencies
$ npm install
```

## Project env variables

| Key                      | Comment                  |
| ------------------------ | ------------------------ |
| `PORT`                   | API port (optional)      |
| `HOST`                   | API host (optional)      |
| `MONGO_URI`              | Mongo uri                |
| `BCRYPT_SALT`            | Crypt salt (optional)    |
| `PUBLIC_TOKEN`           | Public token (optional)  |
| `JWT_ACCESS_SECRET`      | Access token secret key  |
| `JWT_ACCESS_EXPIRES_IN`  | Access token expires in  |
| `JWT_REFRESH_SECRET`     | Refresh token secret key |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expires in |
| `STORAGE_PATH`           | Storage path (optional)  |
| `SMTP_HOST`              | Email service host       |
| `SMTP_PORT`              | Email service port       |
| `SMTP_USERNAME`          | Email service login      |
| `SMTP_PASSWORD`          | Email service password   |
| `SMTP_SENDER`            | Email sender             |

## Swagger documentation

After starting the API you can open Swagger documentation in your browser by `/api` route path

## Running the app

```bash
# production mode
$ npm run start

# development watch mode
$ npm run start:dev

# debug mode
$ npm run start:prod
```

### Compile and Minify for Production

```bash
npm run build
```

### Build Docker images

```bash
# Build docker image
docker compose build

# Build docker multiplatform images and Pushes images to the repository
docker compose build --builder multibuilder --push
```

If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:

```bash
# Make sure you have buildx installed. If it is not installed, install it as follows
docker buildx install

# Build and switch to buildx builder
docker buildx create --platform linux/amd64,linux/i386,linux/arm/v5,linux/arm/v6,linux/arm/v7,linux/arm64,linux/ppc64le,linux/s390x --name multibuilder --use

# Start the builder instance
docker buildx inspect --bootstrap
```

```bash
# Use Docker registry
docker login
```

### Lint with [ESLint](https://eslint.org/)

```bash
npm run lint
```

### Format with [Prettier](https://prettier.io/)

```bash
npm run format
```

### Quick Start

```bash
npm run start
```

### PM2 Quick Start

```bash
# Start application
pm2 start ecosystem.config.js

# Stop application
pm2 stop ecosystem.config.js

# Restart application
pm2 restart ecosystem.config.js

# Reload application
pm2 reload ecosystem.config.js

# Delete application
pm2 delete ecosystem.config.js

# Logs application
pm2 logs open-petition-bot
```

### Docker Quick Start

```bash
# Create custom docker compose file compose.yaml
services:
  app:
    image: baklai/helpdesk-api-v1:latest
    volumes:
      - ${STORAGE_PATH}:${STORAGE_PATH}
    env_file: .env
    environment:
      - NODE_ENV=production
    ports:
      - 3000:3000
    restart: unless-stopped
    container_name: helpdesk-api
```

```bash
# Start application
docker compose up -d
```

```bash
# Logs application
docker logs -f helpdesk-api
```

```bash
# Restart application
docker stop helpdesk-api && docker rm helpdesk-api && docker rmi baklai/helpdesk-api-v1 && docker compose up -d && docker logs -f helpdesk-api
```

In the terminal, run the following command to stop the application.

```bash
# Delete application
docker compose down
```

## Default login to the application

The service administrator is created during the first registration on the service

After starting the app on port (3000 as default) you can open
in your browser helpdesk api by typing http://localhost:3000/api.
