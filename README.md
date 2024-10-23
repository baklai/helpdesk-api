# Helpdesk API («Heldesk Service»)

API-додаток технічної підтримки

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

## Передумови

- Git - [Завантажте та встановіть Git](https://git-scm.com/downloads).
- Node.js - [Завантажте та встановіть Node.js](https://nodejs.org/en/download/) і менеджер пакетів npm.
- Docker - [Завантажте та встановіть Docker](https://docs.docker.com/engine/install/).

## Завантаження

```bash
git clone
```

## Встановлення NPM модулів

```bash
$ npm install
```

## Project env variables

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
у вашому веб-переглядачі служба підтримки API, ввівши http://localhost:3000/api.

## Швидкий старт з Docker

```bash
# Створіть спеціальний файл компонування докера compose.yaml
services:
  api:
    image: baklai/helpdesk-api:latest
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
# Запустіть додаток
docker compose up -d
```

```bash
# Журнали програми
docker logs --tail 30 -f helpdesk-api
```

```bash
# Перезапустіть програму
docker compose down && docker rmi baklai/helpdesk-api && docker compose up -d && docker logs -f helpdesk-api
```

In the terminal, run the following command to stop the application.

```bash
# Видалити програму
docker compose down
```

Після запуску програми на порту (3000 за замовчуванням) ви можете відкрити
у вашому веб-переглядачі служба підтримки API, ввівши http://localhost:3000/api.

## Створення зображень Docker

```bash
# Створення образу докера
docker compose build

# Створюйте мультиплатформенні образи докерів і надсилайте зображення до репозиторію
docker compose build --builder multibuilder --no-cache --push
```

Якщо у вас використовується інша архітектура процесора, ніж на вашій машині для розробки
(наприклад, ви працюєте на Mac M1, а ваш хмарний провайдер використовує amd64), вам потрібно буде
зібрати образ для цієї платформи, наприклад:

```bash
# Переконайтеся, що у вас встановлено buildx. Якщо він не встановлений, встановіть його наступним чином
docker buildx install

# Збірка та перехід на buildx builder
docker buildx create --platform linux/amd64,linux/i386,linux/arm/v5,linux/arm/v6,linux/arm/v7,linux/arm64,linux/ppc64le,linux/s390x --name multibuilder --use

# Запустіть екземпляр конструктора
docker buildx inspect --bootstrap
```

```bash
# Використовуйте реєстр Docker
docker login
```
