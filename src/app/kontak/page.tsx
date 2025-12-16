'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Kontak() {
  const [currentLanguage, setCurrentLanguage] = useState('id');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'id';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi pengiriman form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage(currentLanguage === 'id' 
        ? 'Terima kasih! Pesan Anda telah terkirim.' 
        : 'Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 2000);
  };

  const content = {
    id: {
      title: 'Kontak',
      heroTitle: 'Hubungi Kami',
      heroSubtitle: 'Kami siap membantu dan menjawab pertanyaan Anda',
      contactInfo: 'Informasi Kontak',
      address: 'Alamat',
      addressText: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110',
      phone: 'Telepon',
      phoneText: '+62 21 1234 5678',
      email: 'Email',
      emailText: 'info@sportnewsid.com',
      hours: 'Jam Operasional',
      hoursText: 'Senin - Jumat: 09:00 - 18:00 WIB\nSabtu - Minggu: 10:00 - 16:00 WIB',
      formTitle: 'Kirim Pesan',
      name: 'Nama Lengkap',
      emailLabel: 'Email',
      subject: 'Subjek',
      subjectOptions: [
        'Pertanyaan Umum',
        'Laporan Konten',
        'Kerjasama',
        'Teknis',
        'Lainnya'
      ],
      message: 'Pesan',
      submit: 'Kirim Pesan',
      submitting: 'Mengirim...',
      socialTitle: 'Ikuti Kami',
      socialDescription: 'Dapatkan update terbaru melalui media sosial kami'
    },
    en: {
      title: 'Contact',
      heroTitle: 'Contact Us',
      heroSubtitle: 'We are ready to help and answer your questions',
      contactInfo: 'Contact Information',
      address: 'Address',
      addressText: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110',
      phone: 'Phone',
      phoneText: '+62 21 1234 5678',
      email: 'Email',
      emailText: 'info@sportnewsid.com',
      hours: 'Operating Hours',
      hoursText: 'Monday - Friday: 09:00 - 18:00 WIB\nSaturday - Sunday: 10:00 - 16:00 WIB',
      formTitle: 'Send Message',
      name: 'Full Name',
      emailLabel: 'Email',
      subject: 'Subject',
      subjectOptions: [
        'General Inquiry',
        'Content Report',
        'Partnership',
        'Technical',
        'Other'
      ],
      message: 'Message',
      submit: 'Send Message',
      submitting: 'Sending...',
      socialTitle: 'Follow Us',
      socialDescription: 'Get the latest updates through our social media'
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
          <div className="contact-grid">
            <section className="contact-info-section">
              <h2 className="section-title">{t.contactInfo}</h2>
              
              <div className="contact-info-grid">
                <div className="contact-info-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>{t.address}</h4>
                    <p>{t.addressText}</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h4>{t.phone}</h4>
                    <p>{t.phoneText}</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>{t.email}</h4>
                    <p>{t.emailText}</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-details">
                    <h4>{t.hours}</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{t.hoursText}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="contact-form-section">
              <h2 className="section-title">{t.formTitle}</h2>
              
              {submitMessage && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{t.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">{t.subject}</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">{currentLanguage === 'id' ? 'Pilih subjek' : 'Select subject'}</option>
                    {t.subjectOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      {t.submit}
                    </>
                  )}
                </button>
              </form>
            </section>
          </div>

          <section className="social-section">
            <h2 className="section-title">{t.socialTitle}</h2>
            <p className="social-description">{t.socialDescription}</p>
            
            <div className="social-links">
              <a href="#" className="social-link-large">
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </a>
              <a href="#" className="social-link-large">
                <i className="fab fa-twitter"></i>
                <span>Twitter</span>
              </a>
              <a href="#" className="social-link-large">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              <a href="#" className="social-link-large">
                <i className="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
              <a href="#" className="social-link-large">
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}