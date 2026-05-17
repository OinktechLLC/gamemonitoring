import React, { useState } from 'react';
import { useCookieConsent } from '../hooks/useRecommendations';

function CookieBanner() {
  const { needsConsent, acceptCookies, declineCookies } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(needsConsent);

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <h3>🍪 Мы используем файлы cookie</h3>
      <p>
        Мы используем файлы cookie для улучшения работы сайта, анализа трафика 
        и персонализации контента. Продолжая использовать сайт, вы соглашаетесь 
        с нашей <a href="#/privacy" style={{ color: '#00d9ff' }}>политикой конфиденциальности</a>.
      </p>
      <div className="cookie-buttons">
        <button className="cookie-btn accept" onClick={() => {
          acceptCookies();
          setIsVisible(false);
        }}>
          Принять
        </button>
        <button className="cookie-btn decline" onClick={() => {
          declineCookies();
          setIsVisible(false);
        }}>
          Отклонить
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
