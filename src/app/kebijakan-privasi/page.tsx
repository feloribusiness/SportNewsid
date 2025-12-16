'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KebijakanPrivasi() {
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
      title: 'Kebijakan Privasi',
      heroTitle: 'Kebijakan Privasi',
      heroSubtitle: 'Perlindungan data dan privasi Anda adalah prioritas kami',
      lastUpdated: 'Terakhir diperbarui: 15 Desember 2023',
      sections: [
        {
          title: '1. Informasi yang Kami Kumpulkan',
          content: 'Kami dapat mengumpulkan informasi berikut:',
          points: [
            'Informasi pribadi: nama, email, nomor telepon',
            'Informasi penggunaan: halaman yang dikunjungi, waktu akses, durasi kunjungan',
            'Informasi perangkat: jenis perangkat, browser, alamat IP',
            'Informasi lokasi: negara, kota (berdasarkan IP address)',
            'Informasi yang Anda berikan: formulir kontak, newsletter subscription'
          ]
        },
        {
          title: '2. Cara Kami Menggunakan Informasi',
          content: 'Informasi yang kami kumpulkan digunakan untuk:',
          points: [
            'Menyediakan konten berita yang relevan dan personalisasi',
            'Meningkatkan kualitas layanan dan pengalaman pengguna',
            'Menganalisis tren dan pola penggunaan website',
            'Mengirim newsletter dan update (dengan persetujuan Anda)',
            'Melindungi keamanan website dan mencegah penyalahgunaan',
            'Memenuhi kewajiban hukum dan regulasi'
          ]
        },
        {
          title: '3. Berbagi Informasi dengan Pihak Ketiga',
          content: 'Kami tidak menjual informasi pribadi Anda. Kami hanya berbagi informasi dalam kondisi berikut:',
          points: [
            'Dengan penyedia layanan untuk mengoperasikan website kami',
            'Dengan mitra berita untuk menyediakan konten berkualitas',
            'Jika diwajibkan oleh hukum atau perintah pengadilan',
            'Untuk melindungi hak, keamanan, atau properti kami',
            'Dengan persetujuan eksplisit dari Anda'
          ]
        },
        {
          title: '4. Cookies dan Teknologi Pelacakan',
          content: 'Kami menggunakan cookies dan teknologi serupa untuk:',
          points: [
            'Mengingat preferensi dan pengaturan Anda',
            'Menganalisis traffic dan penggunaan website',
            'Menyediakan konten yang dipersonalisasi',
            'Mengukur efektivitas kampanye pemasaran',
            'Meningkatkan keamanan dan fungsi website'
          ]
        },
        {
          title: '5. Keamanan Data',
          content: 'Kami melindungi informasi Anda dengan:',
          points: [
            'Enkripsi data selama transmisi',
            'Akses terbatas ke informasi pribadi',
            'Audit keamanan berkala',
            'Update sistem dan patch keamanan',
            'Pelatihan staf tentang perlindungan data'
          ]
        },
        {
          title: '6. Hak Anda sebagai Pengguna',
          content: 'Anda memiliki hak untuk:',
          points: [
            'Mengakses dan melihat informasi pribadi Anda',
            'Memperbaiki informasi yang tidak akurat',
            'Menghapus informasi pribadi (dengan batasan tertentu)',
            'Menolak pengumpulan informasi tertentu',
            'Meminta pembatasan pemrosesan data',
            'Melakukan portabilitas data ke layanan lain'
          ]
        },
        {
          title: '7. Penyimpanan Data',
          content: 'Informasi pribadi akan disimpan selama:',
          points: [
            'Diperlukan untuk menyediakan layanan kami',
            'Memenuhi kewajiban hukum dan peraturan',
            'Melindungi hak dan kepentingan kami',
            'Untuk tujuan penelitian historis atau statistik',
            'Data anonim dapat disimpan lebih lama untuk analisis'
          ]
        },
        {
          title: '8. Perubahan Kebijakan',
          content: 'Kami dapat memperbarui kebijakan privasi ini karena:',
          points: [
            'Perubahan dalam praktik bisnis kami',
            'Update teknologi atau peraturan industri',
            'Perubahan hukum atau regulasi',
            'Umpan balik dari pengguna',
            'Peningkatan layanan dan keamanan'
          ]
        },
        {
          title: '9. Kontak Kami',
          content: 'Jika Anda memiliki pertanyaan tentang kebijakan privasi ini:',
          points: [
            'Email: privacy@sportnewsid.com',
            'Telepon: +62 21 1234 5678',
            'Formulir kontak di halaman Kontak',
            'Surat: Jl. Sudirman No. 123, Jakarta Pusat'
          ]
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      heroTitle: 'Privacy Policy',
      heroSubtitle: 'Your data protection and privacy are our priority',
      lastUpdated: 'Last updated: December 15, 2023',
      sections: [
        {
          title: '1. Information We Collect',
          content: 'We may collect the following information:',
          points: [
            'Personal information: name, email, phone number',
            'Usage information: pages visited, access time, visit duration',
            'Device information: device type, browser, IP address',
            'Location information: country, city (based on IP address)',
            'Information you provide: contact forms, newsletter subscriptions'
          ]
        },
        {
          title: '2. How We Use Information',
          content: 'The information we collect is used to:',
          points: [
            'Provide relevant and personalized news content',
            'Improve service quality and user experience',
            'Analyze trends and website usage patterns',
            'Send newsletters and updates (with your consent)',
            'Protect website security and prevent misuse',
            'Comply with legal obligations and regulations'
          ]
        },
        {
          title: '3. Sharing Information with Third Parties',
          content: 'We do not sell your personal information. We only share information under the following conditions:',
          points: [
            'With service providers to operate our website',
            'With news partners to provide quality content',
            'When required by law or court order',
            'To protect rights, security, or our property',
            'With your explicit consent'
          ]
        },
        {
          title: '4. Cookies and Tracking Technologies',
          content: 'We use cookies and similar technologies to:',
          points: [
            'Remember your preferences and settings',
            'Analyze traffic and website usage',
            'Provide personalized content',
            'Measure marketing campaign effectiveness',
            'Improve security and website functionality'
          ]
        },
        {
          title: '5. Data Security',
          content: 'We protect your information with:',
          points: [
            'Data encryption during transmission',
            'Limited access to personal information',
            'Regular security audits',
            'System updates and security patches',
            'Staff training on data protection'
          ]
        },
        {
          title: '6. Your Rights as a User',
          content: 'You have the right to:',
          points: [
            'Access and view your personal information',
            'Correct inaccurate information',
            'Delete personal information (with certain limitations)',
            'Refuse collection of certain information',
            'Request data processing limitations',
            'Data portability to other services'
          ]
        },
        {
          title: '7. Data Retention',
          content: 'Personal information will be retained for as long as:',
          points: [
            'Necessary to provide our services',
            'Comply with legal and regulatory obligations',
            'Protect our rights and interests',
            'For historical or statistical research purposes',
            'Anonymous data may be retained longer for analysis'
          ]
        },
        {
          title: '8. Policy Changes',
          content: 'We may update this privacy policy due to:',
          points: [
            'Changes in our business practices',
            'Technology or industry regulation updates',
            'Legal or regulatory changes',
            'User feedback',
            'Service and security improvements'
          ]
        },
        {
          title: '9. Contact Us',
          content: 'If you have questions about this privacy policy:',
          points: [
            'Email: privacy@sportnewsid.com',
            'Phone: +62 21 1234 5678',
            'Contact form on the Contact page',
            'Mail: Jl. Sudirman No. 123, Jakarta Pusat'
          ]
        }
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
            <p className="last-updated">{t.lastUpdated}</p>
          </div>
        </div>
      </section>

      <main className="main-content">
        <div className="container">
          <div className="privacy-content">
            {t.sections.map((section, index) => (
              <section key={index} className="privacy-section">
                <h2 className="privacy-title">{section.title}</h2>
                <p className="privacy-description">{section.content}</p>
                
                {section.points && (
                  <ul className="privacy-points">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="privacy-point">
                        <i className="fas fa-check"></i>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="privacy-section">
              <h2 className="privacy-title">10. Consent</h2>
              <p className="privacy-description">
                {currentLanguage === 'id' 
                  ? 'Dengan menggunakan SportNewsID, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan privasi ini.'
                  : 'By using SportNewsID, you consent to the collection and use of information in accordance with this privacy policy.'
                }
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}