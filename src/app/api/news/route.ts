import { NextRequest, NextResponse } from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE = 'https://newsapi.org/v2';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'sports';
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

  // Untuk bahasa Indonesia, gunakan sumber berita internasional yang berkualitas
  let url: string;
  
  if (q && q.trim() !== '') {
    // Untuk pencarian, gunakan everything endpoint
    if (language === 'id') {
      // Untuk ID, gunakan bahasa Inggris dengan domain terpercaya
      const searchTerms = q.includes(' ') ? q : `${q} sports`;
      url = `${NEWS_API_BASE}/everything?q=${encodeURIComponent(searchTerms)}&language=en&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&domains=espn.com,bbc.com,cnn.com,skysports.com,theguardian.com,reuters.com`;
    } else {
      url = `${NEWS_API_BASE}/everything?q=${encodeURIComponent(q)}&language=en&page=${page}&pageSize=${pageSize}&sortBy=publishedAt`;
    }
  } else {
    // Untuk headline, gunakan top-headlines dengan sumber berkualitas
    if (language === 'id') {
      // Untuk ID, gunakan sumber internasional terpercaya
      url = `${NEWS_API_BASE}/top-headlines?category=sports&country=us&page=${page}&pageSize=${pageSize}`;
    } else {
      url = `${NEWS_API_BASE}/top-headlines?category=sports&country=us&page=${page}&pageSize=${pageSize}`;
    }
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
    console.log('NewsAPI has articles:', !!data.articles);
    console.log('NewsAPI articles type:', typeof data.articles);
    console.log('NewsAPI articles is array:', Array.isArray(data.articles));

    if (data.status === 'ok' && data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
      // Format data agar konsisten dengan frontend
      const formattedArticles = data.articles.map((article: any) => ({
        id: article.url || Math.random().toString(),
        title: article.title || 'No Title',
        excerpt: article.description || 'No description available.',
        content: article.content || '',
        url: article.url,
        image: article.urlToImage || `https://source.unsplash.com/random/800x450/?sports,${category}`,
        source: article.source?.name || 'Unknown Source',
        publishedAt: article.publishedAt,
        category: category
      }));

      return NextResponse.json({
        success: true,
        totalResults: data.totalResults || 0,
        articles: formattedArticles,
        language: language
      });
    } else {
      // Jika tidak ada hasil untuk ID, coba dengan sumber yang lebih umum
      if (language === 'id' && (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0)) {
        console.log('No results for Indonesian sources, trying general US sources...');
        const fallbackUrl = `${NEWS_API_BASE}/top-headlines?category=sports&country=us&page=${page}&pageSize=${pageSize}`;
        
        const fallbackResponse = await fetch(fallbackUrl, {
          headers: {
            'X-Api-Key': NEWS_API_KEY,
            'User-Agent': 'SportNewsID/1.0'
          }
        });

        const fallbackData = await fallbackResponse.json();
        console.log('Fallback NewsAPI response status:', fallbackData.status);
        console.log('Fallback NewsAPI has articles:', !!fallbackData.articles);

        if (fallbackData.status === 'ok' && fallbackData.articles && Array.isArray(fallbackData.articles)) {
          const formattedArticles = fallbackData.articles.map((article: any) => ({
            id: article.url || Math.random().toString(),
            title: article.title || 'No Title',
            excerpt: article.description || 'No description available.',
            content: article.content || '',
            url: article.url,
            image: article.urlToImage || `https://source.unsplash.com/random/800x450/?sports,${category}`,
            source: article.source?.name || 'Unknown Source',
            publishedAt: article.publishedAt,
            category: category
          }));

          return NextResponse.json({
            success: true,
            totalResults: fallbackData.totalResults || 0,
            articles: formattedArticles,
            language: language
          });
        }
      }
      
      console.error('NewsAPI error or no articles:', data);
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