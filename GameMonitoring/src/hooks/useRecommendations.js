import { useState, useEffect } from 'react';

// Recommendation algorithm based on user behavior and preferences
export function useRecommendations(allServers) {
  const [userPreferences, setUserPreferences] = useState({
    favoriteGames: [],
    viewedServers: [],
    favoriteRegions: [],
    preferredPlayerCount: 'medium' // low, medium, high
  });

  const [recommendedServers, setRecommendedServers] = useState([]);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      setUserPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Track server view
  const trackServerView = (serverId, game) => {
    setUserPreferences(prev => {
      const newViewed = [...prev.viewedServers.filter(id => id !== serverId), serverId];
      if (newViewed.length > 20) newViewed.shift(); // Keep last 20
      
      const newFavoriteGames = prev.favoriteGames.includes(game)
        ? prev.favoriteGames
        : [...prev.favoriteGames, game];

      return {
        ...prev,
        viewedServers: newViewed,
        favoriteGames: newFavoriteGames.slice(-5) // Keep last 5
      };
    });
  };

  // Track game preference
  const trackGamePreference = (game) => {
    setUserPreferences(prev => ({
      ...prev,
      favoriteGames: prev.favoriteGames.includes(game)
        ? prev.favoriteGames
        : [...prev.favoriteGames, game].slice(-5)
    }));
  };

  // Track region preference
  const trackRegionPreference = (region) => {
    setUserPreferences(prev => ({
      ...prev,
      favoriteRegions: prev.favoriteRegions.includes(region)
        ? prev.favoriteRegions
        : [...prev.favoriteRegions, region].slice(-3)
    }));
  };

  // Generate recommendations
  useEffect(() => {
    if (!allServers || allServers.length === 0) return;

    const scored = allServers.map(server => {
      let score = 0;

      // Game preference score (40% weight)
      if (userPreferences.favoriteGames.includes(server.game)) {
        score += 40;
      }

      // Region preference score (25% weight)
      if (userPreferences.favoriteRegions.includes(server.region)) {
        score += 25;
      }

      // Player count preference (20% weight)
      const playerRatio = server.players.current / server.players.max;
      if (userPreferences.preferredPlayerCount === 'low' && playerRatio < 0.3) {
        score += 20;
      } else if (userPreferences.preferredPlayerCount === 'medium' && playerRatio >= 0.3 && playerRatio < 0.7) {
        score += 20;
      } else if (userPreferences.preferredPlayerCount === 'high' && playerRatio >= 0.7) {
        score += 20;
      }

      // Online status (10% weight)
      if (server.online) {
        score += 10;
      }

      // Low ping bonus (5% weight)
      if (server.ping < 50) {
        score += 5;
      }

      // Popularity boost (additional scoring)
      score += Math.min(server.players.current / 100, 10);

      return { ...server, recommendationScore: score };
    });

    // Sort by score and take top 6
    const topServers = scored
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 6);

    setRecommendedServers(topServers);
  }, [allServers, userPreferences]);

  return {
    recommendedServers,
    userPreferences,
    trackServerView,
    trackGamePreference,
    trackRegionPreference,
    setPreferredPlayerCount: (count) => {
      setUserPreferences(prev => ({ ...prev, preferredPlayerCount: count }));
    }
  };
}

// Cookie consent management
export function useCookieConsent() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const acceptCookies = () => {
    const consentData = {
      accepted: true,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setConsent(consentData);
    
    // Initialize analytics here if cookies accepted
    initializeAnalytics();
  };

  const declineCookies = () => {
    const consentData = {
      accepted: false,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setConsent(consentData);
  };

  const withdrawConsent = () => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('userPreferences');
    setConsent(null);
  };

  return {
    consent,
    acceptCookies,
    declineCookies,
    withdrawConsent,
    needsConsent: consent === null
  };
}

// Analytics tracking (only if cookies accepted)
function initializeAnalytics() {
  // In production, this would initialize Google Analytics, Yandex.Metrica, etc.
  console.log('Analytics initialized');
  
  // Track page views
  const trackPageView = (page) => {
    if (localStorage.getItem('cookieConsent')) {
      console.log('Tracking page view:', page);
      // Send to analytics service
    }
  };

  // Track events
  const trackEvent = (category, action, label) => {
    if (localStorage.getItem('cookieConsent')) {
      console.log('Tracking event:', { category, action, label });
      // Send to analytics service
    }
  };

  window.analytics = { trackPageView, trackEvent };
}

// Data collection for analytics (GDPR compliant)
export function useDataCollection() {
  const { consent } = useCookieConsent();

  const collectData = (dataType, data) => {
    if (consent?.accepted) {
      // Only collect data if user has given consent
      const collectedData = {
        type: dataType,
        data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language
      };

      // In production, send to your analytics backend
      console.log('Collecting data:', collectedData);
      
      // Store locally for session analysis
      const sessionData = JSON.parse(localStorage.getItem('sessionData') || '[]');
      sessionData.push(collectedData);
      localStorage.setItem('sessionData', JSON.stringify(sessionData.slice(-100))); // Keep last 100 events
    }
  };

  return { collectData };
}
