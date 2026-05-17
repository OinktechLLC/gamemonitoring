import React from 'react';

function DocsPage() {
  return (
    <div className="main-content page">
      <div className="content-page">
        <h1>📚 Документация (Docs)</h1>

        <section style={{ marginBottom: '2rem' }}>
          <h2>О проекте GameMonitoring</h2>
          <p>
            GameMonitoring - это современный веб-сервис для мониторинга игровых серверов 
            в реальном времени. Проект поддерживает следующие игры:
          </p>
          <ul>
            <li><strong>SAMP</strong> (San Andreas Multiplayer) - многопользовательская модификация для GTA San Andreas</li>
            <li><strong>CRMP</strong> (Crimea Multiplayer) - модификация для GTA, популярная в Крыму и СНГ</li>
            <li><strong>MTA</strong> (Multi Theft Auto) - продвинутая мультиплеерная платформа для GTA</li>
            <li><strong>GTA V</strong> - сервера FiveM и RAGE MP для Grand Theft Auto V</li>
            <li><strong>Minecraft</strong> - популярные сервера популярной песочницы</li>
            <li><strong>CS 1.6</strong> - классическая версия Counter-Strike</li>
            <li><strong>CS:GO</strong> - Counter-Strike: Global Offensive</li>
            <li><strong>CS2</strong> - Counter-Strike 2 (новая версия)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Технологии</h2>
          <p>Проект построен на современных технологиях:</p>
          <ul>
            <li><strong>Frontend:</strong> React.js + Vite</li>
            <li><strong>Стили:</strong> CSS3 с градиентами и анимациями</li>
            <li><strong>Маршрутизация:</strong> React Router DOM</li>
            <li><strong>API:</strong> REST API интеграции с игровыми сервисами</li>
            <li><strong>Аналитика:</strong> Собственная система сбора данных (GDPR compliant)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>API Интеграции</h2>
          <h3>Minecraft</h3>
          <p>
            Используем официальный API <a href="https://api.mcsrvstat.us" target="_blank" rel="noopener noreferrer" style={{ color: '#00d9ff' }}>mcsrvstat.us</a> для получения информации о серверах Minecraft.
          </p>

          <h3>Counter-Strike (CS 1.6, CS:GO, CS2)</h3>
          <p>
            Интеграция с <a href="https://battlemetrics.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00d9ff' }}>BattleMetrics API</a> для получения данных о серверах Valve. Не требует API ключа для базовой информации.
          </p>

          <h3>SAMP</h3>
          <p>
            Используем открытый API <a href="https://api.open.mp" target="_blank" rel="noopener noreferrer" style={{ color: '#00d9ff' }}>open.mp</a> для мониторинга серверов San Andreas Multiplayer.
          </p>

          <h3>GTA V (FiveM)</h3>
          <p>
            Прямые запросы к публичному списку серверов <a href="https://fivem.net" target="_blank" rel="noopener noreferrer" style={{ color: '#00d9ff' }}>FiveM</a> для получения актуальной информации об онлайне и статусе.
          </p>

          <h3>MTA</h3>
          <p>
            Используем публичный мастер-лист <a href="https://mtasa.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00d9ff' }}>Multi Theft Auto</a> для получения данных о серверах.
          </p>

          <h3>CRMP</h3>
          <p>
            Мониторинг через прямые запросы к серверам Crimea Multiplayer с использованием собственного протокола.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Алгоритм рекомендаций</h2>
          <p>
            Наша система рекомендаций использует машинное обучение для анализа предпочтений пользователя:
          </p>
          <ul>
            <li>Анализ просмотренных серверов (вес: 40%)</li>
            <li>Предпочтения по играм (вес: 25%)</li>
            <li>Предпочтения по регионам (вес: 15%)</li>
            <li>Предпочитаемое количество игроков (вес: 10%)</li>
            <li>Пинг и качество соединения (вес: 10%)</li>
          </ul>
          <p>
            Данные хранятся локально в браузере пользователя и используются только для персонализации контента.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Структура проекта</h2>
          <pre style={{ 
            background: 'rgba(0,0,0,0.3)', 
            padding: '1rem', 
            borderRadius: '8px', 
            overflowX: 'auto',
            fontSize: '0.85rem'
          }}>{`GameMonitoring/
├── public/              # Статические файлы
├── src/
│   ├── components/      # React компоненты
│   │   ├── Header.jsx
│   │   ├── BottomNav.jsx
│   │   ├── ServerCard.jsx
│   │   ├── CookieBanner.jsx
│   │   └── HomePage.jsx
│   ├── pages/           # Страницы приложения
│   │   ├── FAQPage.jsx
│   │   ├── DocsPage.jsx
│   │   ├── TermsPage.jsx
│   │   └── PrivacyPage.jsx
│   ├── services/        # API сервисы
│   │   └── serverService.js
│   ├── hooks/           # Custom React hooks
│   │   └── useRecommendations.js
│   ├── styles/          # CSS стили
│   │   └── index.css
│   ├── utils/           # Утилиты
│   └── App.jsx          # Главный компонент
├── docs/                # Дополнительная документация
├── index.html
├── package.json
└── vite.config.js`}</pre>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Запуск проекта</h2>
          <pre style={{ 
            background: 'rgba(0,0,0,0.3)', 
            padding: '1rem', 
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}>{`# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build`}</pre>
        </section>

        <section>
          <h2>Контакты</h2>
          <p>
            По вопросам сотрудничества, добавления серверов или сообщения об ошибках обращайтесь:
          </p>
          <ul>
            <li>GitHub: <a href="https://github.com/yourusername/GameMonitoring" target="_blank" rel="noopener noreferrer" style={{ color: '#00d9ff' }}>github.com/yourusername/GameMonitoring</a></li>
            <li>Email: support@gamemonitoring.example</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DocsPage;
