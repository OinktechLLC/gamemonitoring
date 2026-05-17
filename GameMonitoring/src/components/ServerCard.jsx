import React from 'react';

function ServerCard({ server, onClick }) {
  const playerRatio = (server.players.current / server.players.max) * 100;

  const getStatusColor = () => {
    if (!server.online) return '#ff4757';
    if (playerRatio > 80) return '#00ff88';
    if (playerRatio > 50) return '#ffa502';
    return '#00d9ff';
  };

  return (
    <div className="server-card" onClick={onClick}>
      <div className="server-header">
        <h3 className="server-name">{server.name}</h3>
        <span className="server-game">{server.gameName || server.game}</span>
      </div>

      <div className="server-info">
        <div className="info-item">
          <span className="info-label">Игроки</span>
          <span className="info-value" style={{ color: getStatusColor() }}>
            {server.players.current} / {server.players.max}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">Регион</span>
          <span className="info-value">{server.region}</span>
        </div>

        <div className="info-item">
          <span className="info-label">Пинг</span>
          <span className="info-value">{server.ping} ms</span>
        </div>

        {server.map && (
          <div className="info-item">
            <span className="info-label">Карта</span>
            <span className="info-value">{server.map}</span>
          </div>
        )}

        {server.mode && (
          <div className="info-item">
            <span className="info-label">Режим</span>
            <span className="info-value">{server.mode}</span>
          </div>
        )}

        {server.version && (
          <div className="info-item">
            <span className="info-label">Версия</span>
            <span className="info-value">{server.version}</span>
          </div>
        )}
      </div>

      <div className="online-bar">
        <div
          className="online-progress"
          style={{ width: `${playerRatio}%`, background: `linear-gradient(90deg, ${getStatusColor()}, #00ff88)` }}
        />
      </div>

      <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
        IP: {server.ip} • Обновлено: {new Date(server.lastUpdate).toLocaleTimeString()}
      </div>
    </div>
  );
}

export default ServerCard;
