# Onlene store

- Сайт и сидинг на английском

## Backend

- Авторизация (JWT в cookie-файлах httpOnly)
- Товары с поиском, фильтром по категориям, сортировкой и пагинацией
- CRUD-запросы по категориям
- Список пользователей + смена ролей
- Корзина для каждого пользователя

## Run
```
cd Backend
npm i
npm run seed   # создаёт начальные данные
npm run dev
```

## Frontend

## Run
```
cd Frontend
npm i
npm start
```
Для `REACT_APP_API_URL` в `.env` серверная часть по умолчанию идёт по `http://localhost:3001/api`.
                    │ │ │
                    V V V 
`REACT_APP_API_URL=http://localhost:3001/api`

Если использовать npm run seed, то пользователь/пароль:
- admin@mail.com / admin123 # админ
- user@mail.com  / user123 # обычный пользователь

Чтобы Backend часть работала, нужно переименовать `.env.example` в `.env` и подставить ваш `MONGO_URI`