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

After starting the app on port (3000 as default) you can open
in your browser helpdesk api by typing http://localhost:3000/api.
