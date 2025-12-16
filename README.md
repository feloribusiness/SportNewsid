# 🏆 SportNewsID - Website Berita Olahraga

Website berita olahraga modern dengan fitur dua bahasa (Indonesia/Inggris), menggunakan NewsAPI sebagai sumber data, dan dibangun dengan Next.js 15.

## ✨ Fitur Utama

- **Multi-bahasa**: Indonesia & Inggris dengan switcher yang mudah
- **Kategori Olahraga**: Sepak bola, basket, bulu tangkis, e-sports
- **Sumber Data Nyata**: Mengintegrasikan NewsAPI untuk berita terkini
- **Desain Responsif**: Tampil optimal di desktop, tablet, & mobile
- **Pencarian Real-time**: Cari berita dengan kata kunci spesifik
- **Keamanan API**: Server-side API routes untuk melindungi API key
- **Performance**: Lazy loading images, infinite scroll
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS

## 🚀 Cara Menjalankan Lokal

### Prasyarat
- Node.js v18 atau lebih baru
- Bun atau npm/yarn
- Token API dari [NewsAPI.org](https://newsapi.org)

### Langkah-langkah

1. **Install dependencies**
```bash
bun install
```

2. **Setup environment variables**
   Buat file `.env.local` di root folder:
```env
NEWS_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. **Jalankan development server**
```bash
bun run dev
```

4. **Buka di browser**
   Akses http://localhost:3000

## 🌐 Teknologi yang Digunakan

### Frontend
- **Next.js 15** dengan App Router
- **TypeScript** untuk type safety
- **Tailwind CSS** untuk styling
- **Font Awesome** untuk ikon
- **Google Fonts** (Montserrat & Open Sans)

### Backend
- **Next.js API Routes** untuk server-side logic
- **NewsAPI** sebagai sumber data berita
- **Environment Variables** untuk keamanan API key

## 🛡️ Keamanan API Key

Proyek ini menggunakan pendekatan server-side API routes untuk melindungi API key NewsAPI:

- API key tidak pernah muncul di kode frontend
- Semua request ke NewsAPI melalui API routes Next.js
- API key disimpan di environment variable (.env.local)
- File .env.local sudah termasuk di .gitignore

## 📱 Fitur Responsif

- **Desktop**: Grid 3 kolom, navigasi lengkap
- **Tablet**: Grid 2 kolom, menu terkondensasi
- **Mobile**: 1 kolom, hamburger menu, touch-friendly

## 🌐 Dukungan Bahasa

Website mendukung 2 bahasa:
- **Indonesia (id)** - Bahasa default
- **English (en)** - Terjemahan lengkap

Translations disimpan di server dan dimuat secara dinamis melalui API routes.

## 🔍 Integrasi NewsAPI

Menggunakan endpoint:
- `/top-headlines` untuk berita utama olahraga
- `/everything` untuk pencarian spesifik
- Parameter `language` untuk filter bahasa
- Parameter `country` untuk lokalisasi berita

## 📁 Struktur Proyek

```
sports-news-website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── news/route.ts          # API endpoint untuk berita
│   │   │   └── translations/[lang]/   # API endpoint untuk terjemahan
│   │   ├── globals.css                # Global styles
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Halaman utama
│   └── components/
│       ├── Header.tsx                  # Komponen header
│       ├── HeroSection.tsx            # Hero section dengan search
│       ├── NewsCard.tsx               # Card untuk setiap berita
│       ├── CategoryFilter.tsx         # Filter kategori
│       └── Footer.tsx                 # Footer website
├── .env.local                         # Environment variables (JANGAN commit)
├── .gitignore                         # Git ignore rules
├── package.json                       # Dependencies
├── bun.lockb                          # Lock file
└── README.md                          # Dokumentasi
```

## 🚀 Deploy ke Netlify

### Metode 1: Deploy dari GitHub (Recommended)

1. **Push kode ke GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Sports News Website"
git branch -M main
git remote add origin https://github.com/USERNAME/sports-news-website.git
git push -u origin main
```

2. **Deploy ke Netlify**
   - Login ke Netlify.com
   - Klik "Add new site" → "Import an existing project"
   - Pilih GitHub sebagai provider
   - Pilih repository sports-news-website
   - Build settings:
     - Build command: `bun run build`
     - Publish directory: `out`
   - Environment variables:
     - `NEWS_API_KEY`: your_api_key_here
   - Klik "Deploy site"

### Metode 2: Deploy manual

```bash
# Build untuk production
bun run build

# Export static files (opsional)
bun run build && bun run start
```

## 🤝 Berkontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Distribusi di bawah lisensi MIT. Lihat file LICENSE untuk detail.

## 🙏 Penghargaan

- **NewsAPI** untuk data berita olahraga
- **Next.js Team** untuk framework yang amazing
- **Tailwind CSS** untuk utility-first CSS framework
- **Font Awesome** untuk ikon berkualitas
- **Google Fonts** untuk tipografi yang baik

## 📞 Kontak

- SportNewsID Team
- GitHub: [@username](https://github.com/username)

---

**Selamat menikmati berita olahraga terkini! 🏆⚽🏀🏸**