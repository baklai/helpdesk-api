# Helpdesk API («Heldesk Service»)

API-додаток технічної підтримки

![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/@nestjs/common)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/@nestjs/config)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/@nestjs/core)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/@nestjs/jwt)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/@nestjs/mongoose)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/@nestjs/passport)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/@nestjs/platform-express)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/@nestjs/swagger)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/rxjs)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/class-validator)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/mongoose)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/passport-jwt)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/bcrypt)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/dayjs)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/netmask)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/baklai/helpdesk-api/pingman)

## Передумови

- Git - [Завантажте та встановіть Git](https://git-scm.com/downloads).
- Node.js - [Завантажте та встановіть Node.js](https://nodejs.org/en/download/) і менеджер пакетів npm.

## Завантаження

```bash
git clone
```

## Встановлення NPM модулів

```bash
$ npm install
```

## Змінні проекту

| Ключ                     | Коментар                             |
| ------------------------ | ------------------------------------ |
| `PORT`                   | Порт API (необов'язковий)            |
| `HOST`                   | Хост API (необов'язковий)            |
| `MONGO_URI`              | URI Mongo                            |
| `BCRYPT_SALT`            | Сіль для шифрування (необов'язкова)  |
| `PUBLIC_TOKEN`           | Публічний токен (необов'язковий)     |
| `JWT_ACCESS_SECRET`      | Секретний ключ токена доступу        |
| `JWT_ACCESS_EXPIRES_IN`  | Термін дії токена доступу            |
| `JWT_REFRESH_SECRET`     | Секретний ключ токена оновлення      |
| `JWT_REFRESH_EXPIRES_IN` | Термін дії токена оновлення          |
| `STORAGE_PATH`           | Шлях до сховища (необов'язковий)     |
| `SMTP_HOST`              | Хост сервісу електронної пошти       |
| `SMTP_PORT`              | Порт сервісу електронної пошти       |
| `SMTP_USERNAME`          | Логін для сервісу електронної пошти  |
| `SMTP_PASSWORD`          | Пароль для сервісу електронної пошти |
| `SMTP_SENDER`            | Відправник електронної пошти         |

## Swagger документація

Після запуску API ви можете відкрити документацію Swagger у своєму браузері за маршрутом `/api`

## Запуск програми

### Компіляція та гаряче перезавантаження для розробки

```bash
npm run dev
```

### Компіляція та мінімізація для виробництва

```bash
npm run build
```

### Перевікра з [ESLint](https://eslint.org/)

```bash
npm run lint
```

### Формат з [Prettier](https://prettier.io/)

```bash
npm run format
```

### Швидкий старт

```bash
npm run start
```

Після запуску програми на порту (3000 за замовчуванням) ви можете відкрити
у вашому веб-переглядачі служба підтримки API, ввівши http://localhost:3000/api
