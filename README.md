# React Shop — интернет-магазин замков

Учебный проект на **React 18**, **TypeScript**, **Vite** и **React Router 7**.  
Данные товаров: [Fake Store API](https://fakestoreapi.com) (цены в USD).

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production-сборка
npm run preview  # просмотр сборки
npm run typecheck
```

## Структура

| Путь | Назначение |
|------|------------|
| `src/context/ProductsContext.tsx` | Общий список товаров |
| `src/context/CartContext.tsx` | Корзина + модалка |
| `src/context/FavoritesContext.tsx` | Избранное (localStorage) |
| `src/api/` | HTTP-запросы к API |
| `src/components/common/asyncState/` | Загрузка / ошибка / пусто |
| `src/utils/formatPrice.ts` | Формат цены USD |

## Маршруты

- `/` — главная
- `/catalog` — каталог (фильтр: `?category=electronics`)
- `/product/:id` — карточка товара
- `/cart`, `/checkout`, `/checkout/:id` — корзина и заказ
- `/favorites`, `/about`, `/wholesale` — доп. страницы
