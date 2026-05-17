import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Главная' },
    { path: '/faq', icon: '❓', label: 'FAQ' },
    { path: '/docs', icon: '📚', label: 'Docs' },
    { path: '/terms', icon: '📋', label: 'Условия' },
    { path: '/privacy', icon: '🔒', label: 'Privacy' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default BottomNav;
