// ==================== src/app.js ====================
class SportsNewsApp {
    constructor() {
        // Konfigurasi
        this.config = {
            apiBaseUrl: window.location.hostname === 'localhost' 
                ? 'http://localhost:3000/api' 
                : '/api', // Akan bekerja di Netlify
            itemsPerPage: 12,
            currentPage: 1,
            currentCategory: 'all',
            currentLanguage: 'id',
            totalResults: 0,
            isLoading: false,
            searchQuery: ''
        };

        // Elemen DOM
        this.elements = {
            newsContainer: document.getElementById('newsContainer'),
            loadingIndicator: document.getElementById('loadingIndicator'),
            emptyState: document.getElementById('emptyState'),
            loadMoreBtn: document.getElementById('loadMoreBtn'),
            searchInput: document.getElementById('searchInput'),
            searchBtn: document.getElementById('searchBtn'),
            langButtons: document.querySelectorAll('.lang-btn'),
            navLinks: document.querySelectorAll('.nav-link'),
            categoryFilters: document.querySelectorAll('.category-filter'),
            mobileMenuBtn: document.getElementById('mobileMenuBtn'),
            mainNav: document.querySelector('.main-nav')
        };

        // Terjemahan
        this.translations = {
            id: {},
            en: {}
        };

        this.init();
    }

    async init() {
        // Muat terjemahan
        await this.loadTranslations();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load berita pertama
        await this.loadNews(true);
        
        // Update UI bahasa
        this.updateLanguageUI();
    }

    async loadTranslations() {
        try {
            const response = await fetch(`${this.config.apiBaseUrl}/translations/${this.config.currentLanguage}`);
            this.translations[this.config.currentLanguage] = await response.json();
            this.applyTranslations();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    async loadNews(resetPage = false) {
        if (this.isLoading) return;
        
        if (resetPage) {
            this.config.currentPage = 1;
            this.elements.newsContainer.innerHTML = '';
            this.elements.loadMoreBtn.style.display = 'block';
        }
        
        this.isLoading = true;
        this.showLoading(true);
        this.elements.emptyState.classList.add('hidden');
        
        try {
            const params = new URLSearchParams({
                category: this.config.currentCategory,
                language: this.config.currentLanguage,
                page: this.config.currentPage,
                q: this.config.searchQuery
            });
            
            const response = await fetch(`${this.config.apiBaseUrl}/news?${params}`);
            const data = await response.json();
            
            if (data.success) {
                this.config.totalResults = data.totalResults;
                this.renderNews(data.articles, resetPage);
                
                // Tampilkan/sembunyikan tombol load more
                const hasMore = (this.config.currentPage * this.config.itemsPerPage) < data.totalResults;
                this.elements.loadMoreBtn.style.display = hasMore ? 'flex' : 'none';
                
                // Tampilkan empty state jika tidak ada hasil
                if (data.articles.length === 0 && this.config.currentPage === 1) {
                    this.elements.newsContainer.innerHTML = '';
                    this.elements.emptyState.classList.remove('hidden');
                }
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error loading news:', error);
            this.showError('Gagal memuat berita. Silakan coba lagi.');
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }

    renderNews(articles, resetPage) {
        if (resetPage) {
            this.elements.newsContainer.innerHTML = '';
        }
        
        const fragment = document.createDocumentFragment();
        
        articles.forEach(article => {
            const newsCard = this.createNewsCard(article);
            fragment.appendChild(newsCard);
        });
        
        this.elements.newsContainer.appendChild(fragment);
    }

    createNewsCard(article) {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${article.image}" alt="${article.title}" class="news-image" loading="lazy">
            <div class="news-content">
                <span class="news-category">${this.getCategoryText(article.category)}</span>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-excerpt">${article.excerpt}</p>
                <div class="news-meta">
                    <div class="news-date">
                        <i class="far fa-calendar-alt"></i>
                        ${this.formatDate(article.publishedAt)}
                    </div>
                    <div class="news-source">
                        <i class="far fa-newspaper"></i>
                        ${article.source}
                    </div>
                </div>
            </div>
        `;
        
        // Klik untuk membuka artikel asli
        card.addEventListener('click', () => {
            if (article.url) {
                window.open(article.url, '_blank', 'noopener noreferrer');
            }
        });
        
        card.style.cursor = 'pointer';
        return card;
    }

    getCategoryText(category) {
        const translations = this.translations[this.config.currentLanguage];
        return translations?.categories?.[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString(this.config.currentLanguage === 'id' ? 'id-ID' : 'en-US', options);
    }

    async changeLanguage(lang) {
        if (this.config.currentLanguage === lang) return;
        
        this.config.currentLanguage = lang;
        this.config.currentPage = 1;
        
        // Update terjemahan jika belum dimuat
        if (!this.translations[lang]) {
            await this.loadTranslations();
        }
        
        this.applyTranslations();
        this.updateLanguageUI();
        await this.loadNews(true);
    }

    applyTranslations() {
        const lang = this.config.currentLanguage;
        const translations = this.translations[lang];
        
        if (!translations) return;
        
        // Update semua elemen dengan data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });
        
        // Update placeholder
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[key]) {
                el.placeholder = translations[key];
            }
        });
        
        // Update judul halaman
        document.title = translations['app.title'] || 'SportNewsID';
    }

    updateLanguageUI() {
        this.elements.langButtons.forEach(btn => {
            if (btn.dataset.lang === this.config.currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    changeCategory(category) {
        this.config.currentCategory = category;
        this.config.currentPage = 1;
        this.config.searchQuery = '';
        this.elements.searchInput.value = '';
        
        // Update UI aktif
        this.elements.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.category === category);
        });
        
        this.elements.categoryFilters.forEach(filter => {
            filter.classList.toggle('active', filter.dataset.category === category);
        });
        
        this.loadNews(true);
    }

    searchNews() {
        this.config.searchQuery = this.elements.searchInput.value.trim();
        this.config.currentPage = 1;
        this.config.currentCategory = 'all';
        
        // Reset filter UI
        this.elements.categoryFilters.forEach(filter => {
            filter.classList.toggle('active', filter.dataset.category === 'all');
        });
        
        this.elements.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.category === 'all');
        });
        
        this.loadNews(true);
    }

    showLoading(show) {
        this.elements.loadingIndicator.style.display = show ? 'block' : 'none';
    }

    showError(message) {
        this.elements.newsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
        this.elements.emptyState.classList.add('hidden');
    }

    setupEventListeners() {
        // Bahasa
        this.elements.langButtons.forEach(btn => {
            btn.addEventListener('click', () => this.changeLanguage(btn.dataset.lang));
        });
        
        // Navigasi kategori
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeCategory(link.dataset.category);
                this.elements.mainNav.classList.remove('active');
            });
        });
        
        // Filter kategori
        this.elements.categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => this.changeCategory(filter.dataset.category));
        });
        
        // Load more
        this.elements.loadMoreBtn.addEventListener('click', async () => {
            this.config.currentPage++;
            await this.loadNews(false);
        });
        
        // Pencarian
        this.elements.searchBtn.addEventListener('click', () => this.searchNews());
        this.elements.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchNews();
        });
        
        // Mobile menu
        this.elements.mobileMenuBtn.addEventListener('click', () => {
            this.elements.mainNav.classList.toggle('active');
        });
        
        // Tutup mobile menu saat klik di luar
        document.addEventListener('click', (e) => {
            if (!this.elements.mainNav.contains(e.target) && 
                !this.elements.mobileMenuBtn.contains(e.target)) {
                this.elements.mainNav.classList.remove('active');
            }
        });
        
        // Infinite scroll
        window.addEventListener('scroll', () => {
            if (this.isLoading || this.elements.loadMoreBtn.style.display === 'none') return;
            
            const scrollPosition = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - 100;
            
            if (scrollPosition >= pageHeight) {
                this.config.currentPage++;
                this.loadNews(false);
            }
        });
    }
}

// Inisialisasi aplikasi saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
    new SportsNewsApp();
});
