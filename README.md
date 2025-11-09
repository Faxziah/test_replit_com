# Приложение для регистрации пользователей

Веб-приложение с формой регистрации, которое сохраняет логины и пароли в PostgreSQL базу данных.

## Технологии

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **База данных**: PostgreSQL
- **Безопасность**: Bcrypt для хеширования паролей

## Возможности

- ✅ Форма регистрации с логином и паролем
- ✅ Валидация данных на клиенте и сервере
- ✅ Безопасное хранение паролей (bcrypt хеширование)
- ✅ Проверка на дубликаты логинов
- ✅ Красивый UI с состояниями загрузки и уведомлениями
- ✅ PostgreSQL для хранения данных

## Запуск локально с Docker

### Требования

- Docker
- Docker Compose

### Инструкция по запуску

1. **Клонируйте репозиторий**
   ```bash
   git clone <URL вашего репозитория>
   cd <название папки>
   ```

2. **Запустите приложение**
   ```bash
   docker-compose up --build
   ```

   Эта команда:
   - Создаст PostgreSQL базу данных
   - Запустит миграции (создаст таблицу users)
   - Соберет и запустит приложение

3. **Откройте в браузере**
   ```
   http://localhost:5000
   ```

4. **Остановка приложения**
   ```bash
   docker-compose down
   ```

5. **Полная очистка (включая данные БД)**
   ```bash
   docker-compose down -v
   ```

## Запуск локально без Docker

### Требования

- Node.js 20+
- PostgreSQL 16+

### Инструкция

1. **Установите зависимости**
   ```bash
   npm install
   ```

2. **Настройте базу данных**
   
   Создайте PostgreSQL базу данных и настройте переменные окружения:
   
   ```bash
   cp .env.example .env
   ```
   
   Отредактируйте `.env`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/loginapp
   SESSION_SECRET=your-secret-key
   ```

3. **Создайте таблицу users**
   ```bash
   psql -U postgres -d loginapp -f init.sql
   ```
   
   Или используйте Drizzle:
   ```bash
   npm run db:push
   ```

4. **Запустите приложение**
   ```bash
   npm run dev
   ```

5. **Откройте в браузере**
   ```
   http://localhost:5000
   ```

## Структура проекта

```
.
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── pages/       # Страницы приложения
│   │   ├── components/  # UI компоненты (shadcn)
│   │   └── lib/         # Утилиты и конфигурация
│   └── index.html
├── server/              # Backend (Express)
│   ├── db.ts           # Подключение к PostgreSQL
│   ├── storage.ts      # Слой работы с БД
│   ├── routes.ts       # API эндпоинты
│   └── index.ts        # Точка входа сервера
├── shared/             # Общие типы и схемы
│   └── schema.ts       # Drizzle схема БД
├── docker-compose.yml  # Docker конфигурация
├── Dockerfile          # Docker образ приложения
└── init.sql           # SQL миграция для создания таблиц
```

## API Эндпоинты

### POST /api/users
Создание нового пользователя

**Запрос:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Успешный ответ (201):**
```json
{
  "id": "uuid",
  "username": "testuser"
}
```

**Ошибки:**
- `400` - Неверные данные
- `409` - Пользователь с таким логином уже существует
- `500` - Ошибка сервера

## База данных

### Таблица users

| Колонка  | Тип     | Описание                    |
|----------|---------|----------------------------|
| id       | VARCHAR | UUID (первичный ключ)      |
| username | TEXT    | Логин (уникальный)         |
| password | TEXT    | Хешированный пароль (bcrypt) |

## Безопасность

- Пароли хешируются с помощью **bcrypt** (10 salt rounds) перед сохранением
- Пароли **никогда не возвращаются** в API ответах
- Валидация данных на клиенте и сервере с помощью **Zod**
- Защита от SQL-инъекций через **Drizzle ORM**

## Разработка

### Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для production
- `npm start` - Запуск production версии
- `npm run db:push` - Применить изменения схемы к БД

### Переменные окружения

Создайте файл `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/loginapp
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
```

## Лицензия

MIT

## Автор

Создано с помощью Replit Agent
