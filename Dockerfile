# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20

# Building layer API
FROM node:${NODE_VERSION}-alpine AS build-api

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальной код и строим приложение (produces dist/folder)
COPY . .
RUN npm run build

# Defining an argument for a port
ARG PORT=3000

# Defining an argument for a host
ARG HOST=0.0.0.0

# Устанавливаем рабочую директорию для финального образа
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app

# Копируем файлы конфигурации и зависимости
COPY --from=build-api /app/package*.json ./
COPY --from=build-api /app/dist ./dist/

# Устанавливаем только продакшн зависимости
RUN npm install --omit=dev

# Открываем порт
EXPOSE ${PORT}

# Задаем переменные окружения для приложения
ENV PORT=${PORT}
ENV HOST=${HOST}

# Запускаем приложение
CMD ["node", "dist/main.js"]
