'use client';

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

interface NewsCardProps {
  article: NewsArticle;
  currentLanguage: string;
}

export default function NewsCard({ article, currentLanguage }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : 'en-US', options);
  };

  const getCategoryText = (category: string) => {
    const categories: Record<string, Record<string, string>> = {
      id: {
        all: 'Semua',
        football: 'Sepak Bola',
        basketball: 'Bola Basket',
        badminton: 'Bulu Tangkis',
        esports: 'E-Sports'
      },
      en: {
        all: 'All',
        football: 'Football',
        basketball: 'Basketball',
        badminton: 'Badminton',
        esports: 'E-Sports'
      }
    };
    return categories[currentLanguage]?.[category] || category;
  };

  return (
    <article className="news-card" onClick={() => window.open(article.url, '_blank', 'noopener noreferrer')}>
      <img src={article.image} alt={article.title} className="news-image" loading="lazy" />
      <div className="news-content">
        <span className="news-category">{getCategoryText(article.category)}</span>
        <h3 className="news-title">{article.title}</h3>
        <p className="news-excerpt">{article.excerpt}</p>
        <div className="news-meta">
          <div className="news-date">
            <i className="far fa-calendar-alt"></i>
            {formatDate(article.publishedAt)}
          </div>
          <div className="news-source">
            <i className="far fa-newspaper"></i>
            {article.source}
          </div>
        </div>
      </div>
    </article>
  );
}