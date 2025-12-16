'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import CategoryFilter from '@/components/CategoryFilter';
import Footer from '@/components/Footer';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  url: string;
  image: string;
  source: string;
  publishedAt: string;
  category: string;
}

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('id');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: currentLanguage === 'id' ? 'Semua' : 'All', icon: '' },
    { id: 'football', name: currentLanguage === 'id' ? 'Sepak Bola' : 'Football', icon: 'fas fa-futbol' },
    { id: 'basketball', name: currentLanguage === 'id' ? 'Bola Basket' : 'Basketball', icon: 'fas fa-basketball-ball' },
    { id: 'badminton', name: currentLanguage === 'id' ? 'Bulu Tangkis' : 'Badminton', icon: 'fas fa-table-tennis' },
    { id: 'esports', name: currentLanguage === 'id' ? 'E-Sports' : 'E-Sports', icon: 'fas fa-gamepad' },
  ];

  const fetchNews = async (reset: boolean = false) => {
    if (isLoading) return;
    
    if (reset) {
      setCurrentPage(1);
      setArticles([]);
    }
    
    setIsLoading(true);
    setLoading(true);

    try {
      const params = new URLSearchParams({
        category: currentCategory,
        language: currentLanguage,
        page: reset ? '1' : currentPage.toString(),
        q: searchQuery
      });

      const response = await fetch(`/api/news?${params}`);
      const data = await response.json();

      if (data.success) {
        if (reset) {
          setArticles(data.articles);
        } else {
          setArticles(prev => [...prev, ...data.articles]);
        }
        setTotalResults(data.totalResults);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(true);
  }, [currentLanguage, currentCategory, searchQuery]);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setSearchQuery('');
  };

  const handleSearch = () => {
    setCurrentCategory('all');
    fetchNews(true);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    fetchNews(false);
  };

  return (
    <div className="page-wrapper">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
      />

      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        currentLanguage={currentLanguage}
      />

      <main className="main-content">
        <div className="container">
          <CategoryFilter
            categories={categories}
            activeCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
          />

          {loading && articles.length === 0 ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>{currentLanguage === 'id' ? 'Memuat berita...' : 'Loading news...'}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-newspaper empty-icon"></i>
              <h3>{currentLanguage === 'id' ? 'Tidak ada berita ditemukan' : 'No news found'}</h3>
              <p>
                {currentLanguage === 'id'
                  ? 'Coba gunakan kata kunci pencarian yang berbeda atau pilih kategori lain.'
                  : 'Try using different search keywords or select another category.'
                }
              </p>
            </div>
          ) : (
            <>
              <section className="news-section">
                <div className="news-grid">
                  {articles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                </div>
              </section>

              {articles.length < totalResults && (
                <div className="load-more-container">
                  <button
                    className="load-more-btn"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    <span>{currentLanguage === 'id' ? 'Muat Lebih Banyak' : 'Load More'}</span>
                    <i className="fas fa-arrow-down"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}