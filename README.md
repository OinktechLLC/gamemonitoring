# 🎮 GameMonitoring - Мониторинг игровых серверов

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)

Современный веб-сервис для мониторинга игровых серверов в реальном времени с системой персонализированных рекомендаций.

## 🌟 Особенности

- **Поддержка популярных игр**: SAMP, CRMP, MTA, GTA V, Minecraft, CS 1.6, CS:GO, CS2
- **Реальный онлайн**: Получение актуальных данных о серверах через официальные API
- **Умные рекомендации**: Алгоритм подбора серверов на основе предпочтений пользователя
- **Современный UI**: Адаптивный дизайн с нижней навигацией как в TikTok
- **GDPR Compliant**: Полное соответствие требованиям защиты персональных данных
- **SEO оптимизация**: Мета-теги для каждого раздела и сервера
- **Мобильная версия**: Полностью адаптивный интерфейс для смартфонов

## 🚀 Быстрый старт

### Требования

- Node.js >= 16.x
- npm >= 8.x

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/yourusername/GameMonitoring.git
cd GameMonitoring

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

После запуска откройте `http://localhost:3000` в браузере.

## 📁 Структура проекта

```
GameMonitoring/
├── public/              # Статические файлы
│   └── favicon.svg
├── src/
│   ├── components/      # React компоненты
│   │   ├── Header.jsx        # Шапка сайта
│   │   ├── BottomNav.jsx     # Нижняя навигация (mobile-first)
│   │   ├── ServerCard.jsx    # Карточка сервера
│   │   ├── CookieBanner.jsx  # Баннер cookie
│   │   └── HomePage.jsx      # Главная страница
│   ├── pages/           # Страницы приложения
│   │   ├── FAQPage.jsx       # FAQ
│   │   ├── DocsPage.jsx      # Документация
│   │   ├── TermsPage.jsx     # Условия использования
│   │   └── PrivacyPage.jsx   # Политика конфиденциальности
│   ├── services/        # API сервисы
│   │   └── serverService.js  # Работа с серверами игр
│   ├── hooks/           # Custom React hooks
│   │   └── useRecommendations.js  # Алгоритм рекомендаций
│   ├── styles/          # CSS стили
│   │   └── index.css
│   ├── utils/           # Утилиты
│   └── App.jsx          # Главный компонент
├── docs/                # Дополнительная документация
├── index.html           # HTML шаблон
├── package.json         # Зависимости
└── vite.config.js       # Конфигурация Vite
```

## 🎯 Поддерживаемые игры

| Игра | API | Статус |
|------|-----|--------|
| **Minecraft** | mcsrvstat.us API | ✅ Работает |
| **CS 1.6** | BattleMetrics API | ✅ Работает |
| **CS:GO** | BattleMetrics API | ✅ Работает |
| **CS2** | BattleMetrics API | ✅ Работает |
| **SAMP** | open.mp API | ✅ Работает |
| **CRMP** | Прямые запросы | ✅ Работает |
| **MTA** | MTA Public Master List | ✅ Работает |
| **GTA V** | FiveM Public Server List | ✅ Работает |

> ✅ Все игры используют рабочие публичные API без необходимости настройки ключей.

## 🧠 Алгоритм рекомендаций

Система рекомендаций анализирует:

1. **Просмотренные сервера** (вес 40%) - история просмотров
2. **Любимые игры** (вес 25%) - предпочтения по играм
3. **Регионы** (вес 15%) - географические предпочтения
4. **Заполненность** (вес 10%) - предпочитаемое количество игроков
5. **Пинг** (вес 10%) - качество соединения

Данные хранятся локально в `localStorage` и не передаются на сервер без согласия пользователя.

## 🍪 Cookie и сбор данных

Приложение использует cookie для:

- Сохранения предпочтений пользователя
- Персонализации рекомендаций
- Анализа использования (только с согласия)

Пользователь может принять или отклонить cookie через баннер при первом посещении.

## 📱 Мобильная версия

Нижняя навигационная панель в стиле TikTok обеспечивает удобное использование на мобильных устройствах:

- 🏠 Главная - список серверов
- ❓ FAQ - часто задаваемые вопросы
- 📚 Docs - документация
- 📋 Условия - условия использования
- 🔒 Privacy - политика конфиденциальности

## 🔒 Конфиденциальность

Проект полностью соответствует GDPR и ФЗ-152:

- Минимальный сбор данных
- Локальное хранение предпочтений
- Явное согласие на cookie
- Возможность отзыва согласия
- Прозрачная политика обработки данных

## 🛠 Технологии

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6
- **Styling**: CSS3 (градиенты, анимации, flexbox/grid)
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Fetch API

## 📄 Документы

- [FAQ](./docs/FAQ.md) - Часто задаваемые вопросы
- [Условия использования](./docs/TERMS.md) - Правила сервиса
- [Политика конфиденциальности](./docs/PRIVACY.md) - Обработка данных
- [Документация API](./docs/API.md) - Интеграция с игровыми API

## 🤝 Вклад в проект

1. Fork репозиторий
2. Создайте ветку (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📬 Контакты

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: support@gamemonitoring.example
- **Telegram**: @gamemonitoring

## 📝 Лицензия

Распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для подробностей.

## 🙏 Благодарности

- [mcsrvstat.us](https://api.mcsrvstat.us) за API Minecraft
- [BattleMetrics](https://www.battlemetrics.com/) за API CS 1.6/CS:GO/CS2 серверов
- [open.mp](https://open.mp) за API SAMP серверов
- [FiveM](https://servers.fivem.net/) за публичный список серверов GTA V
- [MTA](https://mtasa.com/) за публичный master list серверов
- Сообществу open-source за отличные инструменты

---

**Made with ❤️ for gamers**

⭐ Если вам нравится проект, поставьте звезду!
