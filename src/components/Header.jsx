import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Header({ 
  cartCount, 
  wishlistCount, 
  onPageChange, 
  onOpenCart, 
  currentPage 
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simple login mock submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert('Logged in successfully (Mock)');
    setIsLoginOpen(false);
  };

  const navItems = [
    { id: 'ring', label: 'Rings', link: 'shop', category: 'Rings' },
    { id: 'earring', label: 'Earrings', link: 'shop', category: 'Earrings' },
    { id: 'neckless', label: 'Necklaces', link: 'shop', category: 'Necklaces' },
    { id: 'bracelet', label: 'Bracelets', link: 'shop', category: 'Bracelets' },
    { id: 'unique', label: 'Unique', link: 'shop', category: 'Unique' },
    { id: 'education', label: 'Education', link: 'home', hash: 'education' },
    { id: 'about-us', label: 'About Us', link: 'home', hash: 'about-us' }
  ];

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    if (item.id === 'education') {
      onPageChange('home');
      setTimeout(() => {
        const el = document.getElementById('education-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (item.id === 'about-us') {
      onPageChange('home');
      setTimeout(() => {
        const el = document.querySelector('.footer-values-banner');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (item.category) {
      // Navigate to shop and set active category
      onPageChange(item.link, { category: item.category });
    } else {
      onPageChange(item.link);
    }
  };

  return (
    <>
      <header className="sticky-header">
        {/* Top Announcement Bar */}
        <div className="announcement-bar">
          <p className="announcement-text font-serif">
            COMPLIMENTARY SHIPPING & 30-DAY RETURNS — USE CODE <strong style={{color: '#fff'}}>WELCOME100</strong> FOR $100 OFF FIRST ORDER
          </p>
        </div>

        {/* Main Header Container */}
        <div className="header-main-nav">
          <div className="container header-container">
            {/* Top Row: Logo & Utilities */}
            <div className="header-top-row">
              {/* Left Column (Mobile menu button on mobile, placeholder on desktop) */}
              <div className="header-top-left-col">
                <button 
                  className="mobile-menu-btn" 
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={20} />
                </button>
              </div>

              {/* Brand Logo (Centered on desktop and mobile) */}
              <div className="header-logo-container">
                <button 
                  onClick={() => onPageChange('home')} 
                  className="logo-btn"
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}
                >
                  <img src={logo} alt="Derosa Jewels Logo" style={{ height: '70px', width: 'auto', display: 'block' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', lineHeight: '1.1' }}>
                    <span className="logo-main font-serif" style={{ fontSize: '1.8rem', letterSpacing: '0.12em', fontWeight: 'bold' }}>DEROSA</span>
                    <span className="logo-sub font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.32em', color: 'var(--color-text-muted)', margin: 0 }}>JEWELS</span>
                  </div>
                </button>
              </div>

              {/* Right Utility Icons (Wishlist, Search, Cart, Account) */}
              <div className="header-utilities">
                <button 
                  className="util-btn" 
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search site"
                >
                  <Search size={18} />
                </button>

                <div className="login-dropdown-wrapper">
                  <button 
                    className="util-btn" 
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                    aria-label="User account"
                  >
                    <User size={18} />
                  </button>

                  {/* Login Dropdown */}
                  {isLoginOpen && (
                    <div className="login-dropdown shadow-premium fade-in">
                      <h4 className="font-serif" style={{ marginBottom: 12 }}>Welcome Back</h4>
                      <form onSubmit={handleLoginSubmit}>
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          className="form-input" 
                          required 
                          style={{ marginBottom: 8 }}
                        />
                        <input 
                          type="password" 
                          placeholder="Password" 
                          className="form-input" 
                          required 
                          style={{ marginBottom: 12 }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.5rem 1rem' }}>Sign In</button>
                      </form>
                      <div style={{ marginTop: 12, fontSize: '0.8rem', textAlign: 'center' }}>
                        <span className="text-muted">Don't have an account? </span>
                        <a href="#register" onClick={(e) => { e.preventDefault(); alert('Account creation page (Mock)'); }} style={{ color: 'var(--color-brand)', fontWeight: 600 }}>Create One</a>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  className="util-btn wishlist-icon-btn" 
                  onClick={() => onPageChange('shop', { wishlistOnly: true })}
                  aria-label="Wishlist"
                >
                  <Heart size={18} />
                  {wishlistCount > 0 && <span className="badge wishlist-badge">{wishlistCount}</span>}
                </button>

                <button 
                  className="util-btn cart-icon-btn" 
                  onClick={onOpenCart}
                  aria-label="Shopping bag"
                >
                  <ShoppingBag size={18} />
                  {cartCount > 0 && <span className="badge cart-badge">{cartCount}</span>}
                </button>
              </div>
            </div>

            {/* Bottom Row: Navigation Links */}
            <div className="header-bottom-row">
              <nav className="desktop-nav">
                <ul className="nav-links-list">
                  {navItems.map((item) => (
                    <li key={item.id} className="nav-item-li group">
                      <button 
                        onClick={() => handleNavClick(item)}
                        className={`nav-btn font-sans ${
                          (currentPage === item.link && item.id !== 'education') ? 'active-nav-btn' : ''
                        }`}
                      >
                        {item.label}
                        {item.category && <ChevronDown size={12} className="nav-chevron" />}
                      </button>

                      {/* Mega Menu Dropdown */}
                      {item.category && (
                        <div className="mega-menu">
                          <div className="mega-menu-inner container">
                            {item.id === 'ring' && (
                              <>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Ring Styles</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Rings', style: 'Solitaire' })} className="mega-link">Solitaire Settings</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Rings', style: 'Halo' })} className="mega-link">Halo Settings</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Rings', style: 'Three-Stone' })} className="mega-link">Three-Stone Designs</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Rings', style: 'Pavé' })} className="mega-link">Pavé & Side Stone</button>
                                </div>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Diamond Shapes</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Rings', shape: 'Round' })} className="mega-link">Round Brilliant</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Rings', shape: 'Oval' })} className="mega-link">Oval Cut</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Rings', shape: 'Emerald' })} className="mega-link">Emerald Cut</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Rings', shape: 'Pear' })} className="mega-link">Pear Shaped</button>
                                </div>
                              </>
                            )}

                            {item.id === 'earring' && (
                              <>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Earring Styles</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Earrings', style: 'Studs' })} className="mega-link">Classic Studs</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Earrings' })} className="mega-link">Hoop Earrings</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Earrings' })} className="mega-link">Drop Earrings</button>
                                </div>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Metals</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Earrings', metal: 'White Gold' })} className="mega-link">14k White Gold</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Earrings', metal: 'Yellow Gold' })} className="mega-link">14k Yellow Gold</button>
                                </div>
                              </>
                            )}

                            {item.id === 'neckless' && (
                              <>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Necklace Styles</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Necklaces', style: 'Necklace' })} className="mega-link">Suite Necklaces</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Necklaces' })} className="mega-link">Pendant Necklaces</button>
                                </div>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Metals</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Necklaces', metal: 'Platinum' })} className="mega-link">Platinum Sets</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Necklaces', metal: 'White Gold' })} className="mega-link">14k White Gold</button>
                                </div>
                              </>
                            )}

                            {item.id === 'bracelet' && (
                              <>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Bracelet Styles</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Bracelets', style: 'Bracelet' })} className="mega-link">Diamond Tennis Bracelets</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Bracelets' })} className="mega-link">Bangles & Cuffs</button>
                                </div>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Metals</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Bracelets', metal: 'White Gold' })} className="mega-link">14k White Gold</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Bracelets', metal: 'Yellow Gold' })} className="mega-link">14k Yellow Gold</button>
                                </div>
                              </>
                            )}

                            {item.id === 'unique' && (
                              <>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Unique Styles</h4>
                                  <button onClick={() => onPageChange('shop', { category: 'Unique' })} className="mega-link">Three-Stone Designs</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Unique' })} className="mega-link">Pavé Settings</button>
                                  <button onClick={() => onPageChange('shop', { category: 'Unique' })} className="mega-link">Limited Edition Necklaces</button>
                                </div>
                                <div className="mega-col">
                                  <h4 className="mega-title font-serif">Customizer</h4>
                                  <button onClick={() => onPageChange('customizer')} className="mega-link">Start Custom Ring Design</button>
                                </div>
                              </>
                            )}

                            {/* Featured Column (Same for all categories) */}
                            <div className="mega-col mega-featured-col">
                              <div className="mega-card">
                                <span className="mega-tag text-uppercase"><Sparkles size={10} style={{marginRight: 4}} /> Interactive builder</span>
                                <h5 className="font-serif">Design Your Dream Ring</h5>
                                <p>Choose from ethically certified lab-grown diamonds and hand-crafted settings.</p>
                                <button onClick={() => onPageChange('customizer')} className="btn btn-primary btn-sm-custom">Start Customizing</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Search Drawer Overlay */}
      <div className={`overlay ${isSearchOpen ? 'active' : ''}`} onClick={() => setIsSearchOpen(false)} />
      <div className={`search-drawer drawer-top ${isSearchOpen ? 'active' : ''}`}>
        <div className="container search-drawer-inner">
          <div className="search-input-wrapper">
            <Search size={20} className="search-input-icon" />
            <input 
              type="text" 
              placeholder="Search by ring style, stone shape, metal..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-field font-serif"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsSearchOpen(false);
                  onPageChange('shop', { search: searchQuery });
                  setSearchQuery('');
                }
              }}
            />
            <button className="close-search-btn" onClick={() => setIsSearchOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="search-suggestions">
            <span className="suggestion-label text-uppercase">Popular Searches:</span>
            <button onClick={() => { setIsSearchOpen(false); onPageChange('shop', { category: 'Engagement', style: 'Solitaire' }); }} className="suggestion-btn">Solitaire Engagement Rings</button>
            <button onClick={() => { setIsSearchOpen(false); onPageChange('shop', { shape: 'Oval' }); }} className="suggestion-btn">Oval Cut Diamonds</button>
            <button onClick={() => { setIsSearchOpen(false); onPageChange('shop', { search: 'Tennis' }); }} className="suggestion-btn">Tennis Bracelets</button>
            <button onClick={() => { setIsSearchOpen(false); onPageChange('shop', { search: 'Yellow Gold' }); }} className="suggestion-btn">Yellow Gold Settings</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`mobile-menu drawer-left ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title font-serif">Menu</span>
          <button className="close-mobile-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="mobile-nav-item">
                <button 
                  onClick={() => handleNavClick(item)}
                  className="mobile-nav-btn font-serif"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Styles specifically for header */}
      <style>{`
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 900;
          background-color: var(--color-bg-white);
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
        }

        .announcement-bar {
          background-color: var(--color-brand);
          color: var(--color-bg-white);
          padding: 8px 16px;
          text-align: center;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
        }

        .announcement-text {
          font-weight: 300;
          margin: 0;
        }

        .header-main-nav {
          display: flex;
          flex-direction: column;
          background-color: var(--color-bg-light);
        }

        .header-container {
          width: 100%;
          max-width: 100% !important;
          padding-left: var(--spacing-xl) !important;
          padding-right: 0 !important;
          display: flex;
          flex-direction: column;
        }

        .header-top-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 16px 0;
          width: 100%;
        }

        .header-top-left-col {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .header-bottom-row {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          border-top: 1px solid var(--color-border);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-links-list {
          display: flex;
          gap: 2.5rem;
        }

        .nav-item-li {
          position: relative;
        }

        .nav-btn {
          font-size: 0.88rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 15px 0;
          font-weight: 600;
          color: var(--color-text-dark);
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border-bottom: 2px solid transparent;
        }

        .nav-chevron {
          transition: var(--transition-fast);
        }

        .nav-item-li:hover .nav-chevron {
          transform: rotate(180deg);
        }

        .nav-btn:hover, .active-nav-btn {
          color: var(--color-brand);
        }

        /* Mega Menu Dropdown */
        .mega-menu {
          position: fixed;
          top: 182px; /* Sum of top announcement (~31px) + Header Top (~106px) + Header Bottom (~45px) */
          left: 0;
          width: 100%;
          background-color: var(--color-bg-white);
          border-top: 1px solid var(--color-border);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: var(--transition-smooth);
          z-index: 800;
        }

        .nav-item-li:hover .mega-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .mega-menu-inner {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: var(--spacing-xl) var(--spacing-xl);
          gap: var(--spacing-xxl);
        }

        .mega-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .mega-title {
          font-size: 1.1rem;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--color-border);
          width: 100%;
          padding-bottom: 8px;
          color: var(--color-text-dark);
        }

        .mega-link {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          transition: var(--transition-fast);
          padding: 2px 0;
          text-align: left;
        }

        .mega-link:hover {
          color: var(--color-brand);
          transform: translateX(4px);
        }

        .mega-featured-col {
          grid-column: span 1;
        }

        .mega-card {
          background-color: var(--color-bg-warm);
          padding: var(--spacing-lg);
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          height: 100%;
        }

        .mega-tag {
          font-size: 0.65rem;
          background-color: var(--color-brand-light);
          color: var(--color-brand);
          padding: 2px 8px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
        }

        .mega-card h5 {
          font-size: 1.1rem;
          color: var(--color-text-dark);
        }

        .mega-card p {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .btn-sm-custom {
          padding: 8px 16px;
          font-size: 0.75rem;
          margin-top: 8px;
        }

        /* Logo Branding */
        .header-logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 910;
        }

        .logo-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: var(--color-text-dark);
          line-height: 1;
        }

        .logo-sub {
          font-size: 0.55rem;
          letter-spacing: 0.45em;
          margin-top: 4px;
          font-weight: 400;
          color: var(--color-text-muted);
          margin-left: 0.45em;
        }

        /* Utilities */
        .header-utilities {
          display: flex;
          justify-content: flex-end;
          gap: 1.25rem;
          align-items: center;
        }

        .header-utilities .util-btn:last-child {
          padding-right: 0;
        }

        .util-btn {
          color: var(--color-text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 8px;
          transition: var(--transition-fast);
        }

        .util-btn:hover {
          color: var(--color-brand);
        }

        .wishlist-icon-btn, .cart-icon-btn {
          position: relative;
        }

        .wishlist-badge, .cart-badge {
          position: absolute;
          top: 0px;
          right: 0px;
        }

        /* Login Dropdown Wrapper */
        .login-dropdown-wrapper {
          position: relative;
        }

        .login-dropdown {
          position: absolute;
          top: 40px;
          right: -10px;
          background-color: var(--color-bg-white);
          border: 1px solid var(--color-border);
          padding: var(--spacing-lg);
          width: 280px;
          z-index: 1000;
          border-radius: var(--radius-sm);
        }

        /* Search Drawer styles */
        .drawer-top {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: var(--color-bg-white);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          z-index: 1002;
          transform: translateY(-100%);
          transition: var(--transition-smooth);
        }

        .drawer-top.active {
          transform: translateY(0);
        }

        .search-drawer-inner {
          padding: 2.5rem var(--spacing-xl);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          border-bottom: 2px solid var(--color-text-dark);
          position: relative;
        }

        .search-input-icon {
          color: var(--color-text-dark);
          margin-right: 1rem;
        }

        .search-field {
          width: 100%;
          font-size: 1.8rem;
          font-weight: 300;
          color: var(--color-text-dark);
          padding: 10px 0;
          border: none;
          background: none;
        }

        .close-search-btn {
          color: var(--color-text-dark);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .close-search-btn:hover {
          color: var(--color-brand);
        }

        .search-suggestions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .suggestion-label {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .suggestion-btn {
          background-color: var(--color-bg-light);
          border: 1px solid var(--color-border);
          padding: 6px 14px;
          font-size: 0.8rem;
          border-radius: 20px;
          color: var(--color-text-dark);
          transition: var(--transition-fast);
        }

        .suggestion-btn:hover {
          background-color: var(--color-brand-light);
          border-color: var(--color-brand);
          color: var(--color-brand);
        }

        /* Mobile Menu Styles */
        .mobile-menu-btn {
          display: none;
        }

        .drawer-left {
          position: fixed;
          top: 0;
          left: 0;
          width: 320px;
          height: 100%;
          background-color: var(--color-bg-white);
          box-shadow: 5px 0 20px rgba(0,0,0,0.05);
          z-index: 1002;
          transform: translateX(-100%);
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
        }

        .drawer-left.active {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid var(--color-border);
        }

        .mobile-menu-title {
          font-size: 1.2rem;
        }

        .mobile-menu-content {
          padding: 20px;
          overflow-y: auto;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-btn {
          font-size: 1.3rem;
          text-align: left;
          width: 100%;
          padding: 8px 0;
          border-bottom: 1px solid var(--color-bg-light);
        }

        @media (max-width: 1150px) {
          .header-container {
            padding-right: var(--spacing-md) !important;
          }

          .header-top-row {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            width: 100%;
            height: 65px;
          }

          .header-bottom-row {
            display: none;
          }

          .header-logo-container {
            justify-content: center;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .logo-btn {
            font-size: 1.2rem;
          }

          .logo-sub {
            font-size: 0.5rem;
            letter-spacing: 0.35em;
          }

          .mega-menu {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
