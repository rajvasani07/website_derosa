import React, { useState } from 'react';
import { Sparkles, ArrowRight, Star, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import heroRing from '../assets/hero_diamond_ring.png';
import studs from '../assets/diamond_earrings.png';
import bracelet from '../assets/tennis_bracelet.png';
import band from '../assets/mens_wedding_band.png';
import necklace from '../assets/diamond_necklace.png';
import exampleRing from '../assets/example_ring.png';
import CanvasDiamond from '../components/CanvasDiamond';

export default function Home({ onPageChange, onAddWishlist, wishlist }) {
  const [active4C, setActive4C] = useState('carat');
  const [caratWeight, setCaratWeight] = useState(1.5);
  const [activeCut, setActiveCut] = useState('ideal');
  const [hoveredShape, setHoveredShape] = useState(null);

  // Diamond shapes listing
  const shapes = [
    { name: 'Round', svg: <svg viewBox="0 0 100 100"><polygon points="50,5 80,20 95,50 80,80 50,95 20,80 5,50 20,20" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1"/><line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1"/><line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="1"/><circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/></svg> },
    { name: 'Oval', svg: <svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1"/><path d="M30,30 L70,70 M70,30 L30,70" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Cushion', svg: <svg viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" rx="20" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="1"/><line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1"/><line x1="25" y1="25" x2="75" y2="75" stroke="currentColor" strokeWidth="1"/><line x1="75" y1="25" x2="25" y2="75" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Emerald', svg: <svg viewBox="0 0 100 100"><rect x="20" y="10" width="60" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="28" y="18" width="44" height="64" rx="4" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="10" x2="28" y2="18" stroke="currentColor" strokeWidth="1"/><line x1="80" y1="10" x2="72" y2="18" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="90" x2="28" y2="82" stroke="currentColor" strokeWidth="1"/><line x1="80" y1="90" x2="72" y2="82" stroke="currentColor" strokeWidth="1"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Pear', svg: <svg viewBox="0 0 100 100"><path d="M50,10 C20,50 20,80 50,90 C80,80 80,50 50,10 Z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1"/><path d="M30,60 Q50,70 70,60" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="28" y1="55" x2="72" y2="55" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Radiant', svg: <svg viewBox="0 0 100 100"><polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1"/><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1"/><line x1="30" y1="10" x2="70" y2="90" stroke="currentColor" strokeWidth="1"/><line x1="70" y1="10" x2="30" y2="90" stroke="currentColor" strokeWidth="1"/></svg> }
  ];

  // Featured Products
  const featuredProducts = [
    { id: 'f1', name: 'Aura Round Lab Diamond Studs', price: 1290, image: exampleRing, rating: 5, reviews: 42, details: { metal: '14k White Gold', shape: 'Round', carat: 1.0 } },
    { id: 'f2', name: 'Elysian Diamond Tennis Bracelet', price: 3450, image: exampleRing, rating: 5, reviews: 19, details: { metal: '14k White Gold', shape: 'Round', carat: 4.0 } },
    { id: 'f3', name: 'Atlas Platinum Wedding Band', price: 950, image: exampleRing, rating: 4.9, reviews: 68, details: { metal: 'Platinum', shape: 'Classic Round' } },
    { id: 'f4', name: 'De Rosa Diamond Suite Necklace', price: 8500, image: exampleRing, rating: 5, reviews: 14, details: { metal: 'Platinum', shape: 'Pear & Round', carat: 12.5 } }
  ];

  const backgroundShapes = [
    { name: 'Round', style: { top: '15%', left: '10%' }, svg: <svg viewBox="0 0 100 100"><polygon points="50,5 80,20 95,50 80,80 50,95 20,80 5,50 20,20" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1"/><line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="1"/><line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="1"/><circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/></svg> },
    { name: 'Radiant', style: { top: '42%', left: '14%' }, svg: <svg viewBox="0 0 100 100"><polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1"/><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1"/><line x1="30" y1="10" x2="70" y2="90" stroke="currentColor" strokeWidth="1"/><line x1="70" y1="10" x2="30" y2="90" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Emerald', style: { top: '70%', left: '8%' }, svg: <svg viewBox="0 0 100 100"><rect x="20" y="10" width="60" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="28" y="18" width="44" height="64" rx="4" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="10" x2="28" y2="18" stroke="currentColor" strokeWidth="1"/><line x1="80" y1="10" x2="72" y2="18" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="90" x2="28" y2="82" stroke="currentColor" strokeWidth="1"/><line x1="80" y1="90" x2="72" y2="82" stroke="currentColor" strokeWidth="1"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Heart', style: { top: '20%', right: '12%' }, svg: <svg viewBox="0 0 100 100"><path d="M50,30 C35,10 10,25 10,50 C10,75 50,95 50,95 C50,95 90,75 90,50 C90,25 65,10 50,30 Z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="30" x2="50" y2="95" stroke="currentColor" strokeWidth="1"/><path d="M50,30 Q30,55 20,50" fill="none" stroke="currentColor" strokeWidth="1"/><path d="M50,30 Q70,55 80,50" fill="none" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Marquise', style: { top: '48%', right: '10%' }, svg: <svg viewBox="0 0 100 100"><path d="M50,5 C25,35 25,65 50,95 C75,65 75,35 50,5 Z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1"/><line x1="32" y1="50" x2="68" y2="50" stroke="currentColor" strokeWidth="1"/><path d="M50,30 L32,50 L50,70 L68,50 Z" fill="none" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Pear', style: { top: '75%', right: '15%' }, svg: <svg viewBox="0 0 100 100"><path d="M50,10 C20,50 20,80 50,90 C80,80 80,50 50,10 Z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1"/><path d="M30,60 Q50,70 70,60" fill="none" stroke="currentColor" strokeWidth="1"/><line x1="28" y1="55" x2="72" y2="55" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Oval', style: { top: '10%', left: '32%' }, svg: <svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1"/><path d="M30,30 L70,70 M70,30 L30,70" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Princess', style: { top: '12%', right: '35%' }, svg: <svg viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="1"/><line x1="85" y1="15" x2="15" y2="85" stroke="currentColor" strokeWidth="1"/><line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="1"/><line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1"/><polygon points="50,32 68,50 50,68 32,50" fill="none" stroke="currentColor" strokeWidth="1"/></svg> },
    { name: 'Cushion', style: { bottom: '10%', left: '46%' }, svg: <svg viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="70" rx="20" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="1"/><line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1"/><line x1="25" y1="25" x2="75" y2="75" stroke="currentColor" strokeWidth="1"/><line x1="75" y1="25" x2="25" y2="75" stroke="currentColor" strokeWidth="1"/></svg> }
  ];

  return (
    <div className="home-container">
      {/* Hero Section Banner */}
      <section className="hero-section">
        {/* Scattered Background Diamond Shapes */}
        {backgroundShapes.map((shape, index) => {
          const isShapeHovered = hoveredShape === shape.name;
          return (
            <div 
              key={shape.name} 
              className={`hero-bg-shape ${isShapeHovered ? 'hovered' : ''}`}
              style={shape.style}
              onClick={() => onPageChange('shop', { shape: shape.name })}
              onMouseEnter={() => setHoveredShape(shape.name)}
              onMouseLeave={() => setHoveredShape(null)}
              title={`View ${shape.name} Jewelry`}
            >
              <div className="shape-canvas-wrapper">
                <CanvasDiamond shape={shape.name} isHovered={isShapeHovered} size={130} />
              </div>
              <span className="shape-label font-sans">{shape.name}</span>
            </div>
          );
        })}

        <div className="container hero-content-container flex flex-col justify-center items-center fade-in">
          <h1 className="hero-title font-serif">
            Where Brilliance<br />
            <span className="hero-title-italic">Meets Legacy</span>
          </h1>
          <p className="hero-description font-sans">
            Discover exquisite lab-grown diamond jewelry. Handcrafted rings, necklaces, earrings, and bracelets configured to your exact specifications.
          </p>
        </div>
      </section>

      {/* Shop By Shape */}
      <section className="shape-section py-xxl">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title-large font-serif">Shop Diamonds by Shape</h2>
            <p className="section-subtitle-text font-sans text-muted">Select a shape to begin exploring our certified lab diamond catalog</p>
          </div>
          <div className="shapes-grid grid grid-cols-6 gap-lg" style={{ marginTop: '3rem' }}>
            {shapes.map((shape) => (
              <button 
                key={shape.name} 
                className="shape-card flex flex-col items-center gap-md"
                onClick={() => onPageChange('shop', { shape: shape.name })}
              >
                <div className="shape-svg-container">
                  {shape.svg}
                </div>
                <span className="shape-name font-sans">{shape.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Builder Callout Banner */}
      <section className="builder-callout">
        <div className="container builder-grid">
          <div className="builder-info flex flex-col justify-center gap-md">
            <span className="builder-tag text-uppercase">The De Rosa Customizer</span>
            <h2 className="font-serif builder-title">Your Ring. Your Way.</h2>
            <p className="builder-desc font-sans text-muted">
              Create a custom lab-grown diamond engagement ring that matches your unique love story. Select your setting design, pick your metal (yellow, white, rose gold, or platinum), and match it with a certified, hand-selected diamond.
            </p>
            <div>
              <button onClick={() => onPageChange('customizer')} className="btn btn-primary builder-cta">
                Start Customizing <ArrowRight size={16} style={{ marginLeft: 8 }} />
              </button>
            </div>
          </div>
          <div className="builder-visual flex items-center justify-center">
            <div className="visual-circle-glow">
              <img src={heroRing} alt="Custom Diamond Ring" className="visual-ring animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="featured-section py-xxl">
        <div className="container">
          <div className="section-header flex justify-between items-end">
            <div>
              <h2 className="section-title-large font-serif" style={{ textAlign: 'left' }}>Featured Fine Jewelry</h2>
              <p className="section-subtitle-text font-sans text-muted" style={{ textAlign: 'left' }}>Sought-after lab-grown jewelry designs, crafted to perfection.</p>
            </div>
            <button onClick={() => onPageChange('shop')} className="btn-text text-uppercase flex items-center">
              View All <ArrowUpRight size={14} style={{ marginLeft: 4 }} />
            </button>
          </div>
          
          <div className="products-grid grid grid-cols-4 gap-xl" style={{ marginTop: '3rem' }}>
            {featuredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id} 
                  className="product-card shadow-subtle hover-zoom"
                  onClick={() => onPageChange('product-detail', { productId: product.id })}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-image-box">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <button 
                      className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddWishlist(product.id);
                      }}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={18} fill={isWishlisted ? 'var(--color-brand)' : 'none'} />
                    </button>
                  </div>
                  <div className="product-info-box">
                    <div className="product-reviews flex items-center gap-xs">
                      <div className="stars flex text-brand">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                      <span className="review-count font-sans">({product.reviews})</span>
                    </div>
                    <h3 className="product-card-title font-serif">{product.name}</h3>
                    <p className="product-card-specs font-sans text-muted">{product.details.metal} &bull; {product.details.carat} ctw</p>
                    <span className="product-card-price font-serif">${product.price.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive 4Cs Diamond Education Section */}
      <section id="education-section" className="education-section py-xxl">
        <div className="container">
          <div className="section-header text-center">
            <span className="builder-tag text-uppercase">Gemological Education</span>
            <h2 className="section-title-large font-serif">Understanding the 4Cs</h2>
            <p className="section-subtitle-text font-sans text-muted">Learn how diamonds are evaluated to make a confident, educated decision</p>
          </div>

          <div className="education-widget" style={{ marginTop: '3rem' }}>
            {/* Tabs */}
            <div className="education-tabs flex justify-center">
              {['carat', 'cut', 'color', 'clarity'].map((tab) => (
                <button 
                  key={tab} 
                  className={`edu-tab-btn font-sans text-uppercase ${active4C === tab ? 'active' : ''}`}
                  onClick={() => setActive4C(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="education-content-card grid grid-cols-2 gap-xl shadow-premium">
              {active4C === 'carat' && (
                <>
                  <div className="edu-visual flex flex-col items-center justify-center gap-lg">
                    {/* Simulated Diamond Scaling */}
                    <div className="diamond-carat-simulator flex items-center justify-center">
                      <div className="finger-background">
                        <div 
                          className="simulated-diamond animate-sparkle" 
                          style={{ 
                            transform: `scale(${0.6 + (caratWeight * 0.4)})`,
                            opacity: 0.95
                          }}
                        >
                          <svg viewBox="0 0 100 100" className="simulated-diamond-svg">
                            <polygon points="50,10 75,25 90,50 75,75 50,90 25,75 10,50 25,25" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5"/>
                            <line x1="50" y1="10" x2="50" y2="90" stroke="#0ea5e9" strokeWidth="0.5"/>
                            <line x1="10" y1="50" x2="90" y2="50" stroke="#0ea5e9" strokeWidth="0.5"/>
                            <line x1="25" y1="25" x2="75" y2="75" stroke="#0ea5e9" strokeWidth="0.5"/>
                            <line x1="75" y1="25" x2="25" y2="75" stroke="#0ea5e9" strokeWidth="0.5"/>
                            <polygon points="50,22 68,36 78,50 68,64 50,78 32,64 22,50 32,36" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="0.5" opacity="0.8"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="carat-slider-control flex flex-col items-center w-full">
                      <span className="carat-value-indicator font-serif text-brand">{caratWeight.toFixed(2)} Carats</span>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="4.0" 
                        step="0.1" 
                        value={caratWeight}
                        onChange={(e) => setCaratWeight(parseFloat(e.target.value))}
                        className="carat-slider"
                      />
                      <span className="text-muted font-sans" style={{ fontSize: '0.75rem', marginTop: 4 }}>Drag to change carat weight</span>
                    </div>
                  </div>
                  <div className="edu-description flex flex-col justify-center gap-md">
                    <h3 className="font-serif edu-header">Carat Weight</h3>
                    <p className="font-sans text-muted">
                      Carat measures a diamond's weight, not its physical dimensions. However, as the carat weight increases, the physical size of the stone changes. 
                    </p>
                    <p className="font-sans text-muted">
                      A larger carat weight highlights diamond clarity and color. Our lab-grown diamonds allow you to purchase a **significantly larger carat size** (up to 40% more) for the same budget as a mined diamond of equivalent grade.
                    </p>
                    <ul className="edu-points font-sans">
                      <li className="flex items-center"><ShieldCheck size={16} className="text-brand" style={{marginRight: 8}}/> 1 Carat = 200 Milligrams</li>
                      <li className="flex items-center"><ShieldCheck size={16} className="text-brand" style={{marginRight: 8}}/> Lab-grown lets you afford bigger stones easily</li>
                    </ul>
                  </div>
                </>
              )}

              {active4C === 'cut' && (
                <>
                  <div className="edu-visual flex flex-col justify-center gap-md">
                    <div className="cut-visual-container flex justify-center gap-lg">
                      <button 
                        className={`cut-toggle-card ${activeCut === 'ideal' ? 'active' : ''}`}
                        onClick={() => setActiveCut('ideal')}
                      >
                        <svg viewBox="0 0 100 100" className="cut-svg"><polygon points="50,15 80,30 90,55 50,90 10,55 20,30" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M50,15 L50,90 M20,30 L50,90 M80,30 L50,90 M10,55 L90,55 M20,30 L80,30" stroke="currentColor" strokeWidth="1"/><path d="M50,30 L45,50 L50,70 L55,50 Z" fill="rgba(158, 55, 30, 0.1)" stroke="var(--color-brand)" strokeWidth="1"/><path d="M50,15 L50,2" stroke="var(--color-brand)" strokeWidth="2" strokeDasharray="2,2"/><path d="M15,25 L10,5" stroke="var(--color-brand)" strokeWidth="2" strokeDasharray="2,2"/><path d="M85,25 L90,5" stroke="var(--color-brand)" strokeWidth="2" strokeDasharray="2,2"/></svg>
                        <span className="font-sans" style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginTop: 8 }}>Ideal Cut (Maximum Fire)</span>
                      </button>
                      <button 
                        className={`cut-toggle-card ${activeCut === 'poor' ? 'active' : ''}`}
                        onClick={() => setActiveCut('poor')}
                      >
                        <svg viewBox="0 0 100 100" className="cut-svg"><polygon points="50,25 80,35 90,55 50,80 10,55 20,35" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M50,25 L50,80 M20,35 L50,80 M80,35 L50,80 M10,55 L90,55" stroke="currentColor" strokeWidth="1"/><path d="M50,25 L35,55 L75,10" stroke="var(--color-brand)" strokeWidth="1.5" fill="none" opacity="0.6"/></svg>
                        <span className="font-sans" style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginTop: 8 }}>Shallow/Deep Cut (Light Escapes)</span>
                      </button>
                    </div>
                  </div>
                  <div className="edu-description flex flex-col justify-center gap-md">
                    <h3 className="font-serif edu-header">Cut Quality</h3>
                    <p className="font-sans text-muted">
                      Cut refers to how well a diamond's facets interact with light. It is widely considered the **most important of the 4Cs**, as it directly determines how much a diamond will sparkle.
                    </p>
                    <p className="font-sans text-muted">
                      An *Ideal* cut reflects light directly back up through the top table, giving off optimal brilliance and fire. A poorly cut stone lets light leak out of the sides or bottom, leaving the diamond looking dull or glassy.
                    </p>
                    <ul className="edu-points font-sans">
                      <li className="flex items-center"><ShieldCheck size={16} className="text-brand" style={{marginRight: 8}}/> Ideal cuts hide minor inclusions</li>
                      <li className="flex items-center"><ShieldCheck size={16} className="text-brand" style={{marginRight: 8}}/> All De Rosa diamonds are Ideal-to-Excellent cut</li>
                    </ul>
                  </div>
                </>
              )}

              {active4C === 'color' && (
                <>
                  <div className="edu-visual flex justify-center items-center gap-md">
                    <div className="color-stones-line flex justify-center gap-md">
                      <div className="color-stone-card flex flex-col items-center">
                        <div className="stone-color-circle d-color"></div>
                        <span className="font-serif font-bold" style={{ fontSize: '1rem', marginTop: 8 }}>D Grade</span>
                        <span className="font-sans text-muted" style={{ fontSize: '0.7rem' }}>Colorless</span>
                      </div>
                      <div className="color-stone-card flex flex-col items-center">
                        <div className="stone-color-circle g-color"></div>
                        <span className="font-serif font-bold" style={{ fontSize: '1rem', marginTop: 8 }}>G Grade</span>
                        <span className="font-sans text-muted" style={{ fontSize: '0.7rem' }}>Near Colorless</span>
                      </div>
                      <div className="color-stone-card flex flex-col items-center">
                        <div className="stone-color-circle j-color"></div>
                        <span className="font-serif font-bold" style={{ fontSize: '1rem', marginTop: 8 }}>J Grade</span>
                        <span className="font-sans text-muted" style={{ fontSize: '0.7rem' }}>Warm Tint</span>
                      </div>
                    </div>
                  </div>
                  <div className="edu-description flex flex-col justify-center gap-md">
                    <h3 className="font-serif edu-header">Color Grading</h3>
                    <p className="font-sans text-muted">
                      The gemological color scale evaluates a white diamond's lack of color. A chemically pure and structurally perfect diamond has no hue, graded as **D (completely colorless)**.
                    </p>
                    <p className="font-sans text-muted">
                      Grades progress down the alphabet toward Z as traces of color (typically yellow or brown) appear. D, E, and F are colorless, while G, H, I, and J are near colorless and offer an exceptional balance of visual quality and value.
                    </p>
                    <ul className="edu-points font-sans">
                      <li className="flex items-center"><ShieldCheck size={16} className="text-brand" style={{marginRight: 8}}/> Colorless (D-F) is set beautifully in white gold</li>
                      <li className="flex items-center"><ShieldCheck size={16} className="text-brand" style={{marginRight: 8}}/> Warm yellow gold settings look beautiful with G-J</li>
                    </ul>
                  </div>
                </>
              )}

              {active4C === 'clarity' && (
                <>
                  <div className="edu-visual flex justify-center items-center">
                    <div className="clarity-zoom-box flex flex-col items-center gap-md">
                      <div className="clarity-magnifier-lens">
                        {/* Simulation of magnification showing inclusions */}
                        <div className="magnified-view">
                          <div className="magnified-inclusions">
                            <span className="inclusion-dot dot-1"></span>
                            <span className="inclusion-dot dot-2"></span>
                          </div>
                        </div>
                      </div>
                      <span className="font-sans" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-brand)' }}>Magnified View (10x Loupe)</span>
                    </div>
                  </div>
                  <div className="edu-description flex flex-col justify-center gap-md">
                    <h3 className="font-serif edu-header">Clarity Grades</h3>
                    <p className="font-sans text-muted">
                      Clarity evaluates the presence of internal characteristics (inclusions) and surface flaws (blemishes). Virtually all diamonds contain microscopic birthmarks from crystallization.
                    </p>
                    <p className="font-sans text-muted">
                      The scale ranges from **FL (Flawless)** down to **I3 (Included)**. Most inclusions are microscopic and cannot be seen by the naked eye. We specialize in "Eye-Clean" diamonds (VVS1 to SI1), ensuring your diamond looks flawless in person.
                    </p>
                    <ul className="edu-points font-sans">
                      <li className="flex items-center"><ShieldCheck size={16} className="text-brand" style={{marginRight: 8}}/> VVS/VS: inclusions invisible without microscope</li>
                      <li className="flex items-center"><ShieldCheck size={16} className="text-brand" style={{marginRight: 8}}/> SI1/SI2: excellent value, eye-clean stones available</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="testimonials-section py-xxl">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title-large font-serif">What Our Guests Say</h2>
            <p className="section-subtitle-text font-sans text-muted">Read reviews from real couples who found their dream diamond at De Rosa</p>
          </div>
          <div className="testimonials-grid grid grid-cols-3 gap-xl" style={{ marginTop: '3.5rem' }}>
            <div className="testimonial-card flex flex-col justify-between shadow-subtle">
              <div className="stars flex text-brand" style={{ marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="testimonial-quote font-serif">"The custom ring builder was incredibly easy to use. I was able to customize the metal and pick the perfect oval diamond within my budget. It arrived beautifully packaged!"</p>
              <div className="testimonial-author font-sans" style={{ marginTop: 20 }}>
                <strong>David K.</strong>
                <span className="text-muted" style={{ display: 'block', fontSize: '0.75rem' }}>Verified Purchaser &bull; Solitaire Oval Ring</span>
              </div>
            </div>

            <div className="testimonial-card flex flex-col justify-between shadow-subtle">
              <div className="stars flex text-brand" style={{ marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="testimonial-quote font-serif">"I was hesitant about lab-grown, but the certification and educational guides made me feel so comfortable. Side by side with my friend's mined ring, mine is cleaner, larger, and sparkles twice as much!"</p>
              <div className="testimonial-author font-sans" style={{ marginTop: 20 }}>
                <strong>Sophia L.</strong>
                <span className="text-muted" style={{ display: 'block', fontSize: '0.75rem' }}>Verified Purchaser &bull; Elysian Tennis Bracelet</span>
              </div>
            </div>

            <div className="testimonial-card flex flex-col justify-between shadow-subtle">
              <div className="stars flex text-brand" style={{ marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="testimonial-quote font-serif">"Excellent customer service. They helped me pick a matching band for my engagement ring, and using coupon WELCOME100 saved me $100 off the order. Cannot recommend them enough."</p>
              <div className="testimonial-author font-sans" style={{ marginTop: 20 }}>
                <strong>Marcus R.</strong>
                <span className="text-muted" style={{ display: 'block', fontSize: '0.75rem' }}>Verified Purchaser &bull; Aura Diamond studs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          position: relative;
          height: 85vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-dark);
          overflow: hidden;
          background: radial-gradient(circle at center, #151515 0%, #000000 100%);
          text-align: center;
          border-bottom: 1px solid var(--color-border);
        }

        .hero-content-container {
          position: relative;
          z-index: 10;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-tag {
          font-size: 0.72rem;
          color: #D4AF37;
          letter-spacing: 0.22em;
          font-weight: 600;
          text-transform: uppercase;
          border: 1px solid rgba(212, 175, 55, 0.35);
          padding: 6px 18px;
          border-radius: 20px;
          margin-bottom: 2rem;
          display: inline-block;
        }

        .hero-title {
          font-size: 5.25rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #FFFFFF;
        }

        .hero-title-italic {
          font-style: italic;
          color: #D4AF37; /* Gold/yellow italic font */
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 3.5rem;
          }
        }

        .hero-description {
          font-size: 1.05rem;
          margin-bottom: 2.5rem;
          line-height: 1.65;
          color: #9CA3AF;
          font-weight: 300;
          max-width: 640px;
          text-align: center;
        }

        .hero-bespoke-btn {
          background: transparent;
          border: 1.5px solid #FFFFFF;
          color: #FFFFFF;
          font-size: 0.82rem;
          letter-spacing: 0.18em;
          font-weight: 600;
          padding: 12px 36px;
          margin-bottom: 2rem;
          border-radius: var(--radius-sm);
          transition: var(--transition-smooth);
        }

        .hero-bespoke-btn:hover {
          background: #FFFFFF;
          color: #000000;
          border-color: #FFFFFF;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.35);
        }

        .hero-details-line {
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          color: #6B7280;
          text-transform: uppercase;
          font-weight: 500;
        }

        .hero-bg-shape {
          position: absolute;
          width: 200px;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 12;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-bg-shape .shape-canvas-wrapper {
          width: 130px;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 6px 15px rgba(0, 0, 0, 0.6));
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-bg-shape:hover .shape-canvas-wrapper {
          transform: scale(1.2);
          filter: drop-shadow(0 0 25px rgba(224, 242, 254, 0.75)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }

        .hero-bg-shape .shape-label {
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 14px;
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.4s ease;
          transform: translateY(6px);
          color: #D4AF37;
          font-weight: 600;
          pointer-events: none;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.9);
        }

        .hero-bg-shape:hover .shape-label {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .hero-bg-shape {
            display: none !important;
          }
        }

        /* Shape Browser */
        .section-title-large {
          font-size: 2rem;
          color: var(--color-text-dark);
          margin-bottom: 8px;
        }

        .shape-card {
          padding: var(--spacing-md);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          transition: var(--transition-smooth);
          cursor: pointer;
          background-color: var(--color-bg-light);
        }

        .shape-card:hover {
          background-color: var(--color-bg-warm);
          border-color: var(--color-brand);
          transform: translateY(-4px);
          box-shadow: var(--shadow-subtle);
        }

        .shape-svg-container {
          width: 60px;
          height: 60px;
          color: var(--color-text-dark);
          transition: var(--transition-smooth);
        }

        .shape-card:hover .shape-svg-container {
          color: var(--color-brand);
          transform: rotate(5deg);
        }

        .shape-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-dark);
        }

        /* Builder Banner Callout */
        .builder-callout {
          background-color: var(--color-bg-warm);
          padding: 6rem 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .builder-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        @media (max-width: 768px) {
          .builder-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .builder-tag {
          font-size: 0.7rem;
          color: var(--color-brand);
          letter-spacing: 0.15em;
          font-weight: 600;
        }

        .builder-title {
          font-size: 2.5rem;
          color: var(--color-text-dark);
          line-height: 1.2;
        }

        .builder-desc {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .visual-circle-glow {
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,231,219,0.8) 0%, rgba(252,249,240,0) 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .visual-ring {
          width: 80%;
          height: 80%;
          object-fit: contain;
          z-index: 10;
        }

        .animate-float {
          animation: floatRing 6s ease-in-out infinite;
        }

        @keyframes floatRing {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }



        /* 4Cs Education */
        .education-section {
          background-color: var(--color-bg-light);
          border-top: 1px solid var(--color-border);
        }

        .education-widget {
          max-width: 1000px;
          margin: 0 auto;
        }

        .education-tabs {
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--color-border);
          gap: 1.5rem;
        }

        .edu-tab-btn {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 12px 20px;
          color: var(--color-text-muted);
          border-bottom: 2px solid transparent;
          transition: var(--transition-fast);
        }

        .edu-tab-btn:hover, .edu-tab-btn.active {
          color: var(--color-brand);
          border-bottom-color: var(--color-brand);
        }

        .education-content-card {
          background-color: var(--color-bg-white);
          border-radius: var(--radius-sm);
          padding: 3rem;
          min-height: 400px;
        }

        @media (max-width: 768px) {
          .education-content-card {
            grid-template-columns: 1fr;
            padding: 1.5rem;
            gap: 2rem;
          }
        }

        .edu-visual {
          border-right: 1px solid var(--color-border);
          padding-right: 3rem;
        }

        @media (max-width: 768px) {
          .edu-visual {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 2rem;
          }
        }

        .diamond-carat-simulator {
          width: 200px;
          height: 200px;
          position: relative;
          background-color: var(--color-bg-light);
          border: 1px dashed var(--color-border);
          border-radius: 50%;
        }

        .simulated-diamond {
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .simulated-diamond-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 8px rgba(14, 165, 233, 0.15));
        }

        .carat-value-indicator {
          font-size: 1.8rem;
          margin-bottom: 12px;
        }

        .carat-slider {
          -webkit-appearance: none;
          width: 80%;
          height: 3px;
          background: var(--color-border);
          outline: none;
          border-radius: 2px;
        }

        .carat-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-brand);
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .carat-slider::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }

        .edu-header {
          font-size: 1.8rem;
          color: var(--color-text-dark);
          margin-bottom: 8px;
        }

        .edu-points {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Cut simulation styles */
        .cut-toggle-card {
          border: 1px solid var(--color-border);
          background-color: var(--color-bg-light);
          padding: 1.5rem;
          border-radius: var(--radius-sm);
          width: 160px;
          text-align: center;
          transition: var(--transition-fast);
        }

        .cut-toggle-card.active {
          border-color: var(--color-brand);
          background-color: var(--color-brand-light);
          color: var(--color-brand);
        }

        .cut-svg {
          width: 70px;
          height: 70px;
        }

        /* Color simulation styles */
        .color-stones-line {
          width: 100%;
        }

        .stone-color-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 1.5px solid var(--color-border);
          box-shadow: inset 0 8px 12px rgba(255,255,255,0.9);
        }

        .d-color { background-color: #f8fafc; border-color: #e2e8f0; }
        .g-color { background-color: #fefaf0; border-color: #e2e8f0; }
        .j-color { background-color: #fef0c7; border-color: #fcd34d; }

        /* Clarity simulation styles */
        .clarity-magnifier-lens {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 6px solid var(--color-text-dark);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          background-color: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .magnified-view {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .magnified-inclusions {
          position: relative;
          width: 30px;
          height: 30px;
        }

        .inclusion-dot {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: #475569;
          border-radius: 50%;
        }

        .inclusion-dot.dot-1 { top: 10px; left: 8px; opacity: 0.7; }
        .inclusion-dot.dot-2 { top: 18px; left: 22px; width: 1.5px; height: 1.5px; opacity: 0.5; }

        /* Testimonials */
        .testimonial-card {
          background-color: var(--color-bg-white);
          padding: 2.5rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
        }

        .testimonial-quote {
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--color-text-dark);
          font-style: italic;
        }

        /* Sparkle animation */
        .animate-sparkle {
          animation: diamondSparkle 4s ease-in-out infinite;
        }

        @keyframes diamondSparkle {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(14, 165, 233, 0.15)); }
          50% { filter: drop-shadow(0 0 16px rgba(14, 165, 233, 0.45)); }
        }
      `}</style>
    </div>
  );
}
