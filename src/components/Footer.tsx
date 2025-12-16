'use client';

export default function Footer({ currentLanguage }: { currentLanguage: string }) {
  const handleFooterLink = (path: string) => {
    window.location.href = path;
  };

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-futbol"></i>
              <h3>SportNews<span>ID</span></h3>
            </div>
            <p className="footer-description">
              {currentLanguage === 'id'
                ? 'Platform berita olahraga terpercaya yang menyajikan informasi terkini, akurat, dan mendalam dari berbagai cabang olahraga.'
                : 'Trusted sports news platform delivering timely, accurate, and in-depth information from various sports disciplines.'
              }
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>{currentLanguage === 'id' ? 'Tautan Cepat' : 'Quick Links'}</h4>
            <ul className="footer-nav">
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); handleFooterLink('/'); }}>
                  {currentLanguage === 'id' ? 'Beranda' : 'Home'}
                </a>
              </li>
              <li>
                <a href="/tentang-kami" onClick={(e) => { e.preventDefault(); handleFooterLink('/tentang-kami'); }}>
                  {currentLanguage === 'id' ? 'Tentang Kami' : 'About Us'}
                </a>
              </li>
              <li>
                <a href="/kontak" onClick={(e) => { e.preventDefault(); handleFooterLink('/kontak'); }}>
                  {currentLanguage === 'id' ? 'Kontak' : 'Contact'}
                </a>
              </li>
              <li>
                <a href="/kebijakan-privasi" onClick={(e) => { e.preventDefault(); handleFooterLink('/kebijakan-privasi'); }}>
                  {currentLanguage === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>{currentLanguage === 'id' ? 'Berlangganan Newsletter' : 'Subscribe to Newsletter'}</h4>
            <p>
              {currentLanguage === 'id'
                ? 'Dapatkan ringkasan berita olahraga langsung ke inbox Anda.'
                : 'Get sports news summaries delivered directly to your inbox.'
              }
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder={currentLanguage === 'id' ? 'Alamat email Anda' : 'Your email address'}
              />
              <button className="newsletter-btn">
                {currentLanguage === 'id' ? 'Kirim' : 'Send'}
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            {currentLanguage === 'id'
              ? '© 2023 SportNewsID. Semua hak dilindungi.'
              : '© 2023 SportNewsID. All rights reserved.'
            }
          </p>
        </div>
      </div>
    </footer>
  );
}