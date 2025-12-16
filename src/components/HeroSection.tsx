'use client';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  currentLanguage: string;
}

export default function HeroSection({ searchQuery, onSearchChange, onSearch, currentLanguage }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h2 className="hero-title">
            {currentLanguage === 'id' 
              ? 'Berita Olahraga Terkini dari Seluruh Dunia' 
              : 'Latest Sports News from Around the World'
            }
          </h2>
          <p className="hero-subtitle">
            {currentLanguage === 'id'
              ? 'Jelajahi liputan mendalam, hasil pertandingan, analisis, dan berita terbaru dari dunia sepak bola, bulu tangkis, basket, e-sports, dan banyak lagi.'
              : 'Explore in-depth coverage, match results, analysis, and the latest news from football, badminton, basketball, e-sports, and more.'
            }
          </p>
          <div className="search-container">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                className="search-input"
                placeholder={currentLanguage === 'id' ? 'Cari berita olahraga...' : 'Search for sports news...'}
              />
              <button onClick={onSearch} className="search-btn">
                {currentLanguage === 'id' ? 'Cari' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}