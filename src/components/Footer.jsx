import React, { useState } from 'react';
import { Mail, Sparkles, Shield, HeartHandshake, Earth } from 'lucide-react';

export default function Footer({ onPageChange }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer-main">
      {/* Brand Values / Trust Badges Banner */}
      <div className="footer-values-banner">
        <div className="container grid grid-cols-3 gap-lg text-center">
          <div className="value-item flex flex-col items-center">
            <Earth className="value-icon" size={32} />
            <h4 className="font-serif value-title">100% Conflict-Free</h4>
            <p className="value-desc font-sans">Every single diamond we source is certified conflict-free, grown ethically using sustainable processes.</p>
          </div>
          <div className="value-item flex flex-col items-center">
            <HeartHandshake className="value-icon" size={32} />
            <h4 className="font-serif value-title">Recycled Gold & Platinum</h4>
            <p className="value-desc font-sans">We exclusively use recycled precious metals to reduce environmental impact without sacrificing luxury.</p>
          </div>
          <div className="value-item flex flex-col items-center">
            <Shield className="value-icon" size={32} />
            <h4 className="font-serif value-title">Independent Grading</h4>
            <p className="value-desc font-sans">All diamonds are certified by leading independent gemological laboratories (IGI or GIA) for quality.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content-area">
        <div className="container footer-grid">
          {/* Newsletter Signup */}
          <div className="footer-newsletter">
            <h3 className="font-serif newsletter-heading">Join the Guest List</h3>
            <p className="newsletter-text font-sans">
              Subscribe to receive updates on collections, exclusive offers, and receive <strong style={{color: 'var(--color-brand)'}}>$100 off</strong> your first order of $1,000 or more.
            </p>
            {subscribed ? (
              <div className="subscription-success fade-in">
                <Sparkles size={16} className="text-brand" style={{marginRight: 6}} />
                <span>Thank you! Check your inbox for code <strong>WELCOME100</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input newsletter-input"
                  required 
                />
                <button type="submit" className="btn btn-primary newsletter-btn" aria-label="Subscribe">
                  <Mail size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Links columns */}
          <div className="footer-links-col">
            <h4 className="font-serif footer-title-link">Shop Jewelry</h4>
            <ul>
              <li><button onClick={() => onPageChange('shop', { category: 'Engagement' })} className="footer-link">Engagement Rings</button></li>
              <li><button onClick={() => onPageChange('shop', { category: 'Wedding' })} className="footer-link">Wedding Bands</button></li>
              <li><button onClick={() => onPageChange('shop', { category: 'Fine Jewelry' })} className="footer-link">Tennis Bracelets</button></li>
              <li><button onClick={() => onPageChange('shop', { category: 'Fine Jewelry' })} className="footer-link">Diamond Earrings</button></li>
              <li><button onClick={() => onPageChange('customizer')} className="footer-link">Design Your Own Ring</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="font-serif footer-title-link">Education & Guide</h4>
            <ul>
              <li><a href="#4cs" onClick={(e) => { e.preventDefault(); onPageChange('home'); setTimeout(() => document.getElementById('education-section')?.scrollIntoView({behavior:'smooth'}), 100); }} className="footer-link">The 4Cs of Diamonds</a></li>
              <li><a href="#lab-grown" onClick={(e) => { e.preventDefault(); alert('Lab Grown Education Guide (Mock)'); }} className="footer-link">Lab Grown vs Natural</a></li>
              <li><a href="#ring-size" onClick={(e) => { e.preventDefault(); alert('Ring Size Tool (Mock)'); }} className="footer-link">Ring Size Guide</a></li>
              <li><a href="#materials" onClick={(e) => { e.preventDefault(); alert('Materials Guide (Mock)'); }} className="footer-link">Precious Metals Guide</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="font-serif footer-title-link">Customer Service</h4>
            <ul>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); alert('Customer Service: support@derosajewels.com (Mock)'); }} className="footer-link">Contact Us</a></li>
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); alert('Free Shipping & Free 30-Day Returns Policy (Mock)'); }} className="footer-link">Shipping & Returns</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); alert('FAQ Section (Mock)'); }} className="footer-link">FAQs</a></li>
              <li><a href="#warranty" onClick={(e) => { e.preventDefault(); alert('Lifetime Warranty Info (Mock)'); }} className="footer-link">Lifetime Warranty</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Credits */}
      <div className="footer-bottom">
        <div className="container bottom-inner">
          <div className="footer-brand-bottom font-serif" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px' }}>
            <span>DEROSA</span>
            <span className="logo-sub font-sans" style={{ fontSize: '0.45rem', letterSpacing: '0.25em', color: '#ccc' }}>JEWELS</span>
          </div>
          <p className="copyright font-sans">
            &copy; {new Date().getFullYear()} Derosa Jewels. All Rights Reserved. Ethical Lab-Grown Diamonds.
          </p>
        </div>
      </div>

      <style>{`
        .footer-main {
          background-color: var(--color-bg-light);
          border-top: 1px solid var(--color-border);
        }

        .footer-values-banner {
          background-color: var(--color-bg-warm);
          border-bottom: 1px solid var(--color-border);
          padding: 3rem 0;
        }

        .value-icon {
          color: var(--color-brand);
          margin-bottom: 12px;
        }

        .value-title {
          font-size: 1.15rem;
          margin-bottom: 8px;
          color: var(--color-text-dark);
        }

        .value-desc {
          font-size: 0.825rem;
          color: var(--color-text-muted);
          max-width: 300px;
          line-height: 1.5;
        }

        .footer-content-area {
          padding: 5rem 0;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .footer-newsletter {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 450px;
        }

        .newsletter-heading {
          font-size: 1.6rem;
          color: var(--color-text-dark);
        }

        .newsletter-text {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .newsletter-form {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .newsletter-input {
          border-radius: var(--radius-sm);
        }

        .newsletter-btn {
          padding: 0 20px;
        }

        .subscription-success {
          display: inline-flex;
          align-items: center;
          padding: 10px 14px;
          background-color: var(--color-brand-light);
          border: 1px solid var(--color-brand);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--color-text-dark);
        }

        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-title-link {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-dark);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 8px;
          margin-bottom: 8px;
        }

        .footer-link {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          padding: 6px 0;
          display: block;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--color-brand);
          transform: translateX(3px);
        }

        .footer-bottom {
          background-color: var(--color-text-dark);
          color: var(--color-bg-white);
          padding: 2rem 0;
        }

        .bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .bottom-inner {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }

        .footer-brand-bottom {
          font-size: 1.25rem;
          letter-spacing: 0.2em;
          color: var(--color-bg-white);
        }

        .copyright {
          font-size: 0.75rem;
          color: #999999;
        }
      `}</style>
    </footer>
  );
}
