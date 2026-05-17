import React, { useState, useEffect } from 'react';
import { fetchAllServers, fetchServersByGame } from '../services/serverService';
import ServerCard from './ServerCard';
import CookieBanner from './CookieBanner';

function HomePage({ onServerClick }) {
  const [allServers, setAllServers] = useState([]);
  const [filteredServers, setFilteredServers] = useState([]);
  const [selectedGame, setSelectedGame] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [recommendedServers, setRecommendedServers] = useState([]);

  const games = [
    { id: 'ALL', name: 'Все' },
    { id: 'MINECRAFT', name: 'Minecraft' },
    { id: 'CS2', name: 'CS2' },
    { id: 'CSGO', name: 'CS:GO' },
    { id: 'CS16', name: 'CS 1.6' },
    { id: 'SAMP', name: 'SAMP' },
    { id: 'CRMP', name: 'CRMP' },
    { id: 'MTA', name: 'MTA' },
    { id: 'GTA5', name: 'GTA V' }
  ];

  useEffect(() => {
    loadServers();
  }, []);

  useEffect(() => {
    filterServers();
  }, [selectedGame, allServers]);

  useEffect(() => {
    generateRecommendations();
  }, [allServers]);

  const loadServers = async () => {
    try {
      setLoading(true);
      // Add timeout for the entire loading operation
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Loading timeout')), 15000)
      );
      
      const servers = await Promise.race([
        fetchAllServers(),
        timeoutPromise
      ]);
      setAllServers(servers);
    } catch (error) {
      console.error('Error loading servers:', error);
      // Set empty array on error to prevent infinite loading
      setAllServers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterServers = () => {
    if (selectedGame === 'ALL') {
      setFilteredServers(allServers);
    } else {
      setFilteredServers(allServers.filter(server => server.game === selectedGame));
    }
  };

  const generateRecommendations = () => {
    // Get user preferences from localStorage
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const viewedServers = prefs.viewedServers || [];
    const favoriteGames = prefs.favoriteGames || [];

    let recommended = [...allServers];

    // If user has viewed servers, recommend similar ones
    if (viewedServers.length > 0) {
      const viewedGames = new Set();
      viewedServers.forEach(id => {
        const server = allServers.find(s => s.id === id);
        if (server) viewedGames.add(server.game);
      });

      recommended = recommended.sort((a, b) => {
        let scoreA = a.players.current / a.players.max;
        let scoreB = b.players.current / b.players.max;

        if (viewedGames.has(a.game)) scoreA += 0.5;
        if (viewedGames.has(b.game)) scoreB += 0.5;

        return scoreB - scoreA;
      });
    } else if (favoriteGames.length > 0) {
      // Recommend based on favorite games
      recommended = recommended.sort((a, b) => {
        let scoreA = a.players.current / a.players.max;
        let scoreB = b.players.current / b.players.max;

        if (favoriteGames.includes(a.game)) scoreA += 0.5;
        if (favoriteGames.includes(b.game)) scoreB += 0.5;

        return scoreB - scoreA;
      });
    } else {
      // Default: recommend most popular servers
      recommended = recommended.sort((a, b) => b.players.current - a.players.current);
    }

    setRecommendedServers(recommended.slice(0, 6));
  };

  const handleServerClick = (server) => {
    // Track server view for recommendations
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const viewedServers = prefs.viewedServers || [];
    
    if (!viewedServers.includes(server.id)) {
      viewedServers.push(server.id);
      if (viewedServers.length > 20) viewedServers.shift();
    }

    const newPrefs = {
      ...prefs,
      viewedServers,
      favoriteGames: prefs.favoriteGames?.includes(server.game)
        ? prefs.favoriteGames
        : [...(prefs.favoriteGames || []), server.game].slice(-5)
    };

    localStorage.setItem('userPreferences', JSON.stringify(newPrefs));

    onServerClick(server);
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">
          <div className="spinner"></div>
        </div>
        <CookieBanner />
      </div>
    );
  }

  return (
    <div className="main-content page">
      {/* Recommended Section */}
      {recommendedServers.length > 0 && (
        <section className="recommended-section">
          <h2 className="section-title">Рекомендуемые сервера для вас</h2>
          <div className="server-list">
            {recommendedServers.map(server => (
              <ServerCard
                key={server.id}
                server={server}
                onClick={() => handleServerClick(server)}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Servers Section */}
      <section>
        <h2 className="section-title" style={{ marginTop: '2rem' }}>
          Все сервера ({filteredServers.length})
        </h2>

        {/* Game Filter Tabs */}
        <div className="game-tabs">
          {games.map(game => (
            <button
              key={game.id}
              className={`game-tab ${selectedGame === game.id ? 'active' : ''}`}
              onClick={() => setSelectedGame(game.id)}
            >
              {game.name}
            </button>
          ))}
        </div>

        {/* Server List */}
        <div className="server-list">
          {filteredServers.map(server => (
            <ServerCard
              key={server.id}
              server={server}
              onClick={() => handleServerClick(server)}
            />
          ))}
        </div>

        {filteredServers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.6)' }}>
            <p>Сервера не найдены</p>
          </div>
        )}
      </section>

      <CookieBanner />
    </div>
  );
}

export default HomePage;
