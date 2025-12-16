'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TentangKami() {
  const [currentLanguage, setCurrentLanguage] = useState('id');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'id';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const content = {
    id: {
      title: 'Tentang Kami',
      heroTitle: 'Tentang SportNewsID',
      heroSubtitle: 'Platform Berita Olahraga Terpercaya untuk Indonesia',
      mission: 'Misi Kami',
      missionText: 'Menyediakan akses mudah dan cepat ke berita olahraga terkini dari seluruh dunia dengan bahasa yang mudah dipahami oleh masyarakat Indonesia.',
      vision: 'Visi Kami', 
      visionText: 'Menjadi sumber utama berita olahraga yang terpercaya, akurat, dan komprehensif di Indonesia.',
      values: 'Nilai-Nilai Kami',
      valuesList: [
        'Akurasi - Memastikan setiap berita yang disajikan terverifikasi kebenarannya',
        'Kecepatan - Menyajikan berita terkini secara real-time',
        'Objektivitas - Memberikan berita tanpa bias dan pihak ketiga',
        'Komprehensif - Mengcover berbagai cabang olahraga dari level lokal hingga internasional'
      ],
      team: 'Tim Kami',
      teamText: 'SportNewsID dikembangkan oleh tim yang berdedikasi untuk menyajikan informasi olahraga terbaik bagi pembaca Indonesia.',
      teamMembers: [
        {
          name: 'Ahmad Rizki',
          role: 'Lead Developer',
          description: 'Spesialis dalam pengembangan web dan integrasi API'
        },
        {
          name: 'Siti Nurhaliza',
          role: 'Content Editor', 
          description: 'Berpengalaman dalam jurnalisme olahraga dan editorial'
        },
        {
          name: 'Budi Santoso',
          role: 'Sports Analyst',
          description: 'Analis olahraga dengan pengalaman lebih dari 10 tahun'
        }
      ],
      technology: 'Teknologi Kami',
      technologyText: 'Menggunakan teknologi terkini untuk memberikan pengalaman terbaik:',
      techList: [
        'Next.js 15 untuk performa website yang optimal',
        'NewsAPI untuk sumber berita terpercaya',
        'Responsive design untuk semua perangkat',
        'Real-time updates untuk berita terkini'
      ]
    },
    en: {
      title: 'About Us',
      heroTitle: 'About SportNewsID',
      heroSubtitle: 'Trusted Sports News Platform for Indonesia',
      mission: 'Our Mission',
      missionText: 'To provide easy and fast access to the latest sports news from around the world in language easily understood by Indonesian people.',
      vision: 'Our Vision',
      visionText: 'To become the main source of trusted, accurate, and comprehensive sports news in Indonesia.',
      values: 'Our Values',
      valuesList: [
        'Accuracy - Ensuring every news presented is verified for its truth',
        'Speed - Delivering current news in real-time',
        'Objectivity - Providing unbiased news and third-party perspective',
        'Comprehensive - Covering various sports from local to international level'
      ],
      team: 'Our Team',
      teamText: 'SportNewsID is developed by a dedicated team to deliver the best sports information for Indonesian readers.',
      teamMembers: [
        {
          name: 'Ahmad Rizki',
          role: 'Lead Developer',
          description: 'Specialist in web development and API integration'
        },
        {
          name: 'Siti Nurhaliza',
          role: 'Content Editor',
          description: 'Experienced in sports journalism and editorial'
        },
        {
          name: 'Budi Santoso',
          role: 'Sports Analyst',
          description: 'Sports analyst with over 10 years of experience'
        }
      ],
      technology: 'Our Technology',
      technologyText: 'Using the latest technology to provide the best experience:',
      techList: [
        'Next.js 15 for optimal website performance',
        'NewsAPI for trusted news sources',
        'Responsive design for all devices',
        'Real-time updates for latest news'
      ]
    }
  };

  const t = content[currentLanguage as keyof typeof content];

  return (
    <div className="page-wrapper">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onCategoryChange={() => {}}
        currentCategory="all"
      />

      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <main className="main-content">
        <div className="container">
          <section className="about-section">
            <div className="about-grid">
              <div className="about-card">
                <div className="about-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3>{t.mission}</h3>
                <p>{t.missionText}</p>
              </div>

              <div className="about-card">
                <div className="about-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3>{t.vision}</h3>
                <p>{t.visionText}</p>
              </div>
            </div>
          </section>

          <section className="values-section">
            <h2 className="section-title">{t.values}</h2>
            <div className="values-grid">
              {t.valuesList.map((value, index) => (
                <div key={index} className="value-item">
                  <div className="value-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="team-section">
            <h2 className="section-title">{t.team}</h2>
            <p className="team-intro">{t.teamText}</p>
            <div className="team-grid">
              {t.teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <h4>{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="technology-section">
            <h2 className="section-title">{t.technology}</h2>
            <p className="technology-intro">{t.technologyText}</p>
            <div className="tech-grid">
              {t.techList.map((tech, index) => (
                <div key={index} className="tech-item">
                  <div className="tech-icon">
                    <i className="fas fa-cog"></i>
                  </div>
                  <p>{tech}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}