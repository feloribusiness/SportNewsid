'use client';

import { useState } from 'react';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onCategoryChange: (category: string) => void;
  currentCategory: string;
}

export default function Header({ currentLanguage, onLanguageChange, onCategoryChange, currentCategory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', name: currentLanguage === 'id' ? 'Semua' : 'All' },
    { id: 'football', name: currentLanguage === 'id' ? 'Sepak Bola' : 'Football' },
    { id: 'basketball', name: currentLanguage === 'id' ? 'Bola Basket' : 'Basketball' },
    { id: 'badminton', name: currentLanguage === 'id' ? 'Bulu Tangkis' : 'Badminton' },
    { id: 'esports', name: currentLanguage === 'id' ? 'E-Sports' : 'E-Sports' },
  ];

  const handleNavClick = (path: string) => {
    window.location.href = path;
    setMobileMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="container header-container">
        <a href="/" className="logo-link">
          <i className="fas fa-futbol logo-icon"></i>
          <div>
            <h1 className="logo-title">SportNews<span className="logo-highlight">ID</span></h1>
            <p className="logo-tagline">
              {currentLanguage === 'id' ? '#1 Sumber Berita Olahraga' : '#1 Sports News Source'}
            </p>
          </div>
        </a>

        <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  className={`nav-link ${currentCategory === category.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onCategoryChange(category.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/tentang-kami"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/tentang-kami');
                }}
              >
                {currentLanguage === 'id' ? 'Tentang' : 'About'}
              </a>
            </li>
            <li>
              <a
                href="/kontak"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/kontak');
                }}
              >
                {currentLanguage === 'id' ? 'Kontak' : 'Contact'}
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-controls">
          <div className="language-switcher">
            <button
              className={`lang-btn ${currentLanguage === 'id' ? 'active' : ''}`}
              onClick={() => onLanguageChange('id')}
              aria-label="Switch to Indonesian"
            >
              <img src="https://flagcdn.com/w20/id.png" alt="ID" className="flag-icon" /> ID
            </button>
            <button
              className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
              onClick={() => onLanguageChange('en')}
              aria-label="Switch to English"
            >
              <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="flag-icon" /> EN
            </button>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
}