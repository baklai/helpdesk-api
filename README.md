# Helpdesk API V1 («Heldesk Service»)

Helpdesk API of technical support

## Demo application: [Helpdesk API service](https://helpdesk-api-l8pk.onrender.com/api/v1)

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
| `PORT`                   | API port                 |
| `HOST`                   | API host                 |
| `MONGO_URI`              | Mongo uri                |
| `BCRYPT_SALT`            | Crypt salt               |
| `HD_PUBLIC_TOKEN`        | Public token (optional)  |
| `JWT_ACCESS_SECRET`      | Access token secret key  |
| `JWT_ACCESS_EXPIRES_IN`  | Access token expires in  |
| `JWT_REFRESH_SECRET`     | Refresh token secret key |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expires in |
| `FILE_HOSTING_PATH`      | File storage local path  |

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
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

## Default login to the application

The service administrator is created during the first registration on the service

After starting the app on port (3000 as default) you can open
in your browser helpdesk api by typing http://localhost:3000/.
