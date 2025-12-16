import { NextRequest, NextResponse } from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE = 'https://newsapi.org/v2';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language') || 'id';
  const page = searchParams.get('page') || '1';
  const q = searchParams.get('q') || '';
  const pageSize = 12;

  if (!NEWS_API_KEY) {
    return NextResponse.json(
      { success: false, message: 'API key not configured' },
      { status: 500 }
    );
  }

  // Simple API call - gunakan US sources untuk semua bahasa
  let url: string;
  
  if (q && q.trim() !== '') {
    url = `${NEWS_API_BASE}/everything?q=${encodeURIComponent(q)}&language=en&page=${page}&pageSize=${pageSize}&sortBy=publishedAt`;
  } else {
    url = `${NEWS_API_BASE}/top-headlines?category=sports&country=us&page=${page}&pageSize=${pageSize}`;
  }

  try {
    console.log(`Fetching from NewsAPI: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': NEWS_API_KEY,
        'User-Agent': 'SportNewsID/1.0'
      }
    });

    const data = await response.json();
    console.log('NewsAPI response status:', data.status);

    if (data.status === 'ok' && data.articles && Array.isArray(data.articles)) {
      const formattedArticles = data.articles.map((article: any) => ({
        id: article.url || Math.random().toString(),
        title: article.title || 'No Title',
        excerpt: article.description || 'No description available.',
        content: article.content || '',
        url: article.url,
        image: article.urlToImage || `https://source.unsplash.com/random/800x450/?sports`,
        source: article.source?.name || 'Unknown Source',
        publishedAt: article.publishedAt,
        category: 'sports'
      }));

      return NextResponse.json({
        success: true,
        totalResults: data.totalResults || 0,
        articles: formattedArticles,
        language: language
      });
    } else {
      return NextResponse.json({
        success: false,
        message: language === 'id' ? 'Tidak ada berita yang ditemukan. Coba kata kunci lain.' : 'No articles found. Try different keywords.',
        articles: [],
        totalResults: 0,
        language: language
      });
    }
  } catch (error: any) {
    console.error('Error fetching from NewsAPI:', error.message);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch news. Please try again later.',
        error: error.message,
        articles: [],
        totalResults: 0
      },
      { status: 500 }
    );
  }
}