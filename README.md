# HELPDESK API

Helpdesk — сервіс підтримки, що надає оперативну допомогу користувачам у вирішенні ІТ-інцидентів та запитів, забезпечуючи швидке відновлення роботи систем і сервісів

## Передумови

- Docker - [Завантажте та встановіть Docker](https://docs.docker.com/engine/install/).

## Змінні проекту `.env`

| Key                      | Comment                                                                 |
| ------------------------ | ----------------------------------------------------------------------- |
| `PORT`                   | Порт сервісу (необов'язково, за замовчуванням 3000)                     |
| `HOST`                   | Хост сервісу (необов'язково, за замовчуванням 127.0.0.1)                |
| `MONGO_URI`              | Рядок підключення до бази даних MongoDB                                 |
| `CORS_ORIGIN`            | Дозволене джерело для міжсайтових запитів (CORS)                        |
| `BCRYPT_SALT`            | Кількість раундів хешування bcrypt (необов'язково, за замовчуванням 10) |
| `JWT_ACCESS_SECRET`      | Секретний ключ для підпису access-токена                                |
| `JWT_ACCESS_EXPIRES_IN`  | Термін дії access-токена (необов'язково, за замовчуванням 15m)          |
| `JWT_REFRESH_SECRET`     | Секретний ключ для підпису refresh-токена                               |
| `JWT_REFRESH_EXPIRES_IN` | Термін дії refresh-токена (необов'язково, за замовчуванням 7d)          |

### Перевікра з [ESLint](https://eslint.org/)

```bash
npm run lint
```

### Формат з [Prettier](https://prettier.io/)

```bash
npm run format
```

## Конфігураційний файл для Docker Compose `compose.yaml`

```bash
services:
  helpdesk-api:
    image: baklai/helpdesk-api:latest
    container_name: helpdesk-api
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://localhost:27017/helpdesk?authSource=admin
      - BCRYPT_SALT=10
      - JWT_ACCESS_SECRET=EXAMPLE-JWT-ACCESS-SECRET
      - JWT_ACCESS_EXPIRES_IN=15m
      - JWT_REFRESH_SECRET=EXAMPLE-JWT-REFRESH-SECRET
      - JWT_REFRESH_EXPIRES_IN=7d
      - CORS_ORIGIN=*
    ports:
      - '3000:3000'
    restart: unless-stopped
```

Якщо сервер бази даних на тому ж хосту то MONGO_URI=mongodb://host.docker.internal:27017/helpdesk?authSource=admin

### Запустіть додаток

```bash
docker compose up -d
```

### Логи додатку

```bash
docker logs --tail 50 -f helpdesk-api
```

### Перезапустити додаток

```bash
docker compose down && docker rmi baklai/helpdesk-api && docker compose up -d && docker logs -f helpdesk-api
```

### Видалити додаток

```bash
docker compose down
```

Після запуску програми на порту (3000 за замовчуванням) ви можете відкрити
у службу підтримки, ввівши http://localhost:3000/api.

## Створюйте образи Docker

### Використовуйте реєстр Docker

```bash
docker login
```

### Створення образу Docker

```bash
docker compose build
```

### Створюйте мультиплатформенні образи докерів і надсилайте зображення до репозиторію

```bash
docker compose build --builder multibuilder --no-cache --push
```

Якщо ваша середовище використовує іншу архітектуру ЦП, ніж ваша розробка
(наприклад, ви використовуєте Mac M1, а ваш хмарний постачальник amd64),
ви захочете створити образ для цієї платформи, наприклад:

```bash
# Переконайтеся, що у вас встановлено buildx. Якщо він не встановлений, встановіть його наступним чином
docker buildx install

# Збірка та перехід на buildx builder
docker buildx create --platform linux/amd64,linux/i386,linux/arm/v5,linux/arm/v6,linux/arm/v7,linux/arm64,linux/ppc64le,linux/s390x --name multibuilder --use

# Запустіть екземпляр конструктора
docker buildx inspect --bootstrap
```
