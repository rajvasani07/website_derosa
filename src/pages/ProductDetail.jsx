import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, Share2, Sparkles, ChevronDown } from 'lucide-react';
import studs from '../assets/diamond_earrings.png';
import bracelet from '../assets/tennis_bracelet.png';
import band from '../assets/mens_wedding_band.png';
import ringHero from '../assets/hero_diamond_ring.png';
import necklace from '../assets/diamond_necklace.png';
import exampleRing from '../assets/example_ring.png';

// Master List of Products (same as in Shop.jsx)
const PRODUCTS_MAP = {
  'p1': { id: 'p1', name: 'Classic Solitaire Engagement Ring', category: 'Engagement', basePrice: 1250, shape: 'Round', style: 'Solitaire', image: ringHero, reviews: 29 },
  'p2': { id: 'p2', name: 'Aura Round Lab Diamond Studs', category: 'Fine Jewelry', basePrice: 1290, shape: 'Round', style: 'Studs', image: studs, reviews: 42 },
  'p3': { id: 'p3', name: 'Elysian Diamond Tennis Bracelet', category: 'Fine Jewelry', basePrice: 3450, shape: 'Round', style: 'Bracelet', image: bracelet, reviews: 19 },
  'p4': { id: 'p4', name: 'Atlas Platinum Wedding Band', category: 'Wedding', basePrice: 950, shape: 'Classic Round', style: 'Classic Band', image: band, reviews: 68 },
  'p5': { id: 'p5', name: 'Elysian Halo Diamond Ring', category: 'Engagement', basePrice: 2100, shape: 'Round', style: 'Halo', image: ringHero, reviews: 15 },
  'p6': { id: 'p6', name: 'Venezia Oval Solitaire Ring', category: 'Engagement', basePrice: 1850, shape: 'Oval', style: 'Solitaire', image: ringHero, reviews: 31 },
  'p7': { id: 'p7', name: 'Empress Emerald Three-Stone Ring', category: 'Engagement', basePrice: 2900, shape: 'Emerald', style: 'Three-Stone', image: ringHero, reviews: 8 },
  'p8': { id: 'p8', name: 'Sienna Diamond Eternity Band', category: 'Wedding', basePrice: 1950, shape: 'Round', style: 'Eternity Band', image: ringHero, reviews: 24 },
  'p9': { id: 'p9', name: 'Sienna Rose Gold Wedding Band', category: 'Wedding', basePrice: 850, shape: 'Classic Round', style: 'Classic Band', image: band, reviews: 11 },
  'p10': { id: 'p10', name: 'Luna Marquise Pavé Ring', category: 'Engagement', basePrice: 2400, shape: 'Marquise', style: 'Pavé', image: ringHero, reviews: 14 },
  'p11': { id: 'p11', name: 'De Rosa Diamond Suite Necklace', category: 'Fine Jewelry', basePrice: 8500, shape: 'Pear & Round', style: 'Necklace', image: necklace, reviews: 14 },
  
  // Featured list mappings (from Home page)
  'f1': { id: 'f1', name: 'Aura Round Lab Diamond Studs', category: 'Fine Jewelry', basePrice: 1290, shape: 'Round', style: 'Studs', image: exampleRing, reviews: 42 },
  'f2': { id: 'f2', name: 'Elysian Diamond Tennis Bracelet', category: 'Fine Jewelry', basePrice: 3450, shape: 'Round', style: 'Bracelet', image: exampleRing, reviews: 19 },
  'f3': { id: 'f3', name: 'Atlas Platinum Wedding Band', category: 'Wedding', basePrice: 950, shape: 'Classic Round', style: 'Classic Band', image: exampleRing, reviews: 68 },
  'f4': { id: 'f4', name: 'De Rosa Diamond Suite Necklace', category: 'Fine Jewelry', basePrice: 8500, shape: 'Pear & Round', style: 'Necklace', image: exampleRing, reviews: 14 }
};

export default function ProductDetail({ 
  productId, 
  onAddCart, 
  onAddWishlist, 
  wishlist,
  onOpenCart 
}) {
  // Find product by id, default to p1 if not found
  const product = PRODUCTS_MAP[productId] || PRODUCTS_MAP['p1'];

  // State options
  const [selectedMetal, setSelectedMetal] = useState('14k White Gold');
  const [caratSize, setCaratSize] = useState(1.5);
  const [ringSize, setRingSize] = useState('6.0');
  const [activeTab, setActiveTab] = useState('specs');
  const [isAddedText, setIsAddedText] = useState(false);

  // Metal pricing adjustments
  const getMetalPriceDiff = () => {
    if (selectedMetal === 'Platinum') return 300;
    if (selectedMetal === '14k Rose Gold') return 50;
    return 0; // Yellow Gold and White Gold are base price
  };

  // Carat size pricing scaling
  const getCaratMultiplier = () => {
    if (product.category === 'Engagement') {
      if (caratSize === 1.0) return 0.8;
      if (caratSize === 1.5) return 1.0;
      if (caratSize === 2.0) return 1.35;
      if (caratSize === 3.0) return 1.95;
    }
    return 1.0; // Non-engagement jewelry has static scaling or is pre-calculated
  };

  const currentPrice = Math.round((product.basePrice * getCaratMultiplier()) + getMetalPriceDiff());

  const handleAddBag = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: product.image,
      quantity: 1,
      details: {
        metal: selectedMetal,
        shape: product.shape,
        carat: product.category === 'Engagement' ? `${caratSize} ct` : null,
        size: product.category !== 'Fine Jewelry' ? ringSize : null
      }
    };
    onAddCart(cartItem);
    setIsAddedText(true);
    setTimeout(() => {
      setIsAddedText(false);
      onOpenCart(); // Slide open the cart drawer automatically
    }, 800);
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="detail-page-wrapper py-xxl">
      <div className="container grid grid-cols-2 gap-xl">
        
        {/* Left Column: Image Gallery */}
        <div className="detail-gallery flex flex-col gap-md">
          <div className="main-image-viewport shadow-subtle">
            <img src={product.image} alt={product.name} className="main-gallery-img" />
            
            {product.category === 'Engagement' && (
              <span className="sparkle-tag text-uppercase font-sans">
                <Sparkles size={10} style={{ marginRight: 4 }} /> Ethical Lab Diamond
              </span>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="gallery-thumbnails flex gap-md">
            <button className="thumbnail-btn active"><img src={product.image} alt="Angle 1" /></button>
            <button className="thumbnail-btn" onClick={() => alert('Alternate detail view (Mock)')}><img src={product.image} alt="Angle 2" style={{ transform: 'rotate(90deg)' }} /></button>
            <button className="thumbnail-btn" onClick={() => alert('Alternate zoom view (Mock)')}><img src={product.image} alt="Angle 3" style={{ transform: 'scale(1.2)' }} /></button>
          </div>
        </div>

        {/* Right Column: Customizer & Checkout options */}
        <div className="detail-panel flex flex-col gap-lg">
          <div className="panel-header">
            <div className="product-meta flex justify-between items-center">
              <span className="meta-category text-uppercase text-muted font-sans" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{product.category}</span>
              <div className="meta-actions flex gap-md">
                <button className="icon-action-btn" onClick={() => alert('Copied share link to clipboard!')} aria-label="Share product"><Share2 size={16} /></button>
                <button className="icon-action-btn" onClick={() => onAddWishlist(product.id)} aria-label="Add to wishlist"><Heart size={16} fill={isWishlisted ? 'var(--color-brand)' : 'none'} className={isWishlisted ? 'text-brand' : ''} /></button>
              </div>
            </div>
            
            <h1 className="font-serif product-title" style={{ fontSize: '2.2rem', marginTop: 8, lineHeight: 1.2 }}>{product.name}</h1>
            
            <div className="product-rating flex items-center gap-xs" style={{ marginTop: 8 }}>
              <div className="stars flex text-brand">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="review-count font-sans text-muted" style={{ fontSize: '0.85rem' }}>4.9 out of 5 stars ({product.reviews} reviews)</span>
            </div>
            
            <div className="product-price-display font-serif text-brand" style={{ fontSize: '2rem', marginTop: 12, fontWeight: 500 }}>
              ${currentPrice.toLocaleString()}
            </div>
          </div>

          <div className="divider" />

          {/* Configuration options */}
          <div className="options-selector flex flex-col gap-lg">
            
            {/* 1. Metal selection */}
            <div className="option-group">
              <div className="option-label-header flex justify-between font-sans" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>
                <span>Metal: <strong style={{ color: 'var(--color-text-dark)' }}>{selectedMetal}</strong></span>
                {selectedMetal === 'Platinum' && <span className="text-brand">(+$300)</span>}
              </div>
              <div className="metals-row flex gap-md">
                <button 
                  className={`metal-selector-btn ${selectedMetal === '14k White Gold' ? 'active' : ''}`}
                  onClick={() => setSelectedMetal('14k White Gold')}
                  style={{ backgroundColor: 'var(--color-platinum)' }}
                  title="14k White Gold"
                />
                <button 
                  className={`metal-selector-btn ${selectedMetal === '14k Yellow Gold' ? 'active' : ''}`}
                  onClick={() => setSelectedMetal('14k Yellow Gold')}
                  style={{ backgroundColor: '#ECE0C8' }}
                  title="14k Yellow Gold"
                />
                <button 
                  className={`metal-selector-btn ${selectedMetal === '14k Rose Gold' ? 'active' : ''}`}
                  onClick={() => setSelectedMetal('14k Rose Gold')}
                  style={{ backgroundColor: '#ECC8C8' }}
                  title="14k Rose Gold"
                />
                <button 
                  className={`metal-selector-btn ${selectedMetal === 'Platinum' ? 'active' : ''}`}
                  onClick={() => setSelectedMetal('Platinum')}
                  style={{ backgroundColor: '#D2D1CE', border: '1.5px solid #AFAFA8' }}
                  title="Platinum"
                />
              </div>
            </div>

            {/* 2. Carat selection (only for Engagement rings) */}
            {product.category === 'Engagement' && (
              <div className="option-group">
                <span className="option-label-header font-sans" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 8 }}>Diamond Carat Size:</span>
                <div className="carat-options-grid flex gap-sm">
                  {[1.0, 1.5, 2.0, 3.0].map((ct) => (
                    <button 
                      key={ct} 
                      className={`carat-opt-btn font-sans ${caratSize === ct ? 'active' : ''}`}
                      onClick={() => setCaratSize(ct)}
                    >
                      {ct.toFixed(1)} Carats
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Ring Size selection (only for Rings/Bands) */}
            {product.category !== 'Fine Jewelry' && (
              <div className="option-group">
                <span className="option-label-header font-sans" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 8 }}>US Ring Size:</span>
                <div className="select-size-wrapper">
                  <select 
                    value={ringSize} 
                    onChange={(e) => setRingSize(e.target.value)}
                    className="form-input size-select"
                  >
                    {['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'].map((sz) => (
                      <option key={sz} value={sz}>Size {sz}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

          </div>

          {/* Add to Bag action */}
          <div className="action-buttons-group flex flex-col gap-sm" style={{ marginTop: '1rem' }}>
            <button 
              className={`btn btn-primary add-bag-btn font-sans ${isAddedText ? 'success' : ''}`}
              onClick={handleAddBag}
              disabled={isAddedText}
            >
              {isAddedText ? 'Added to Bag!' : 'Add to Shopping Bag'}
            </button>
          </div>

          {/* Shipping Policy and details */}
          <div className="shipping-info-bullet-grid grid grid-cols-2 gap-md" style={{ marginTop: '1rem' }}>
            <div className="shipping-bullet flex items-center gap-sm">
              <Truck size={18} className="text-brand" />
              <div>
                <span className="font-sans font-bold" style={{ fontSize: '0.8rem', display: 'block' }}>Free Secure Shipping</span>
                <span className="font-sans text-muted" style={{ fontSize: '0.7rem' }}>Insured dispatch, arrives in 4-6 days</span>
              </div>
            </div>
            <div className="shipping-bullet flex items-center gap-sm">
              <RotateCcw size={18} className="text-brand" />
              <div>
                <span className="font-sans font-bold" style={{ fontSize: '0.8rem', display: 'block' }}>30-Day Free Returns</span>
                <span className="font-sans text-muted" style={{ fontSize: '0.7rem' }}>100% money back guarantee</span>
              </div>
            </div>
          </div>

          <div className="divider" style={{ marginTop: '1rem' }} />

          {/* Specifications Accordion / Tab Panels */}
          <div className="specs-accordion flex flex-col">
            <div className="accordion-tabs flex gap-md" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <button 
                className={`accordion-tab-btn font-sans text-uppercase ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Jewelry Details
              </button>
              <button 
                className={`accordion-tab-btn font-sans text-uppercase ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Returns
              </button>
            </div>
            <div className="accordion-content py-md font-sans text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              {activeTab === 'specs' ? (
                <div className="specs-table-grid flex flex-col gap-sm">
                  <div className="specs-row flex justify-between"><span className="label">Diamond Grading Certification</span><span className="val font-bold">IGI Certified (Independent Gemological Institute)</span></div>
                  <div className="specs-row flex justify-between"><span className="label">Diamond Color Grade</span><span className="val font-bold">F-G (Colorless / Near-Colorless)</span></div>
                  <div className="specs-row flex justify-between"><span className="label">Diamond Clarity Grade</span><span className="val font-bold">VS1-VS2 (Very Slightly Included)</span></div>
                  <div className="specs-row flex justify-between"><span className="label">Metal Purity</span><span className="val font-bold">{selectedMetal === 'Platinum' ? '950 Platinum' : '14k Gold'}</span></div>
                  <div className="specs-row flex justify-between"><span className="label">Conflict-Free Certification</span><span className="val font-bold">100% Carbon-Neutral Lab Grown</span></div>
                </div>
              ) : (
                <p>
                  Every De Rosa order comes beautifully packaged in our signature luxury presentation box, accompanied by the independent gemological laboratory grading certificate. All orders are shipped via complimentary fully-insured FedEx 2-Day shipping, requiring an adult signature upon delivery for security. We gladly accept returns and exchanges on all unworn items within 30 days of delivery.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .detail-page-wrapper {
          background-color: var(--color-bg-white);
        }

        .main-image-viewport {
          position: relative;
          background-color: #000000;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          height: 550px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .main-gallery-img {
          width: 90%;
          height: 90%;
          object-fit: contain;
        }

        .sparkle-tag {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: var(--color-brand-light);
          color: var(--color-brand);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.65rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.1em;
          border: 1px solid var(--color-brand);
        }

        .gallery-thumbnails {
          justify-content: flex-start;
        }

        .thumbnail-btn {
          width: 80px;
          height: 80px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background-color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .thumbnail-btn:hover, .thumbnail-btn.active {
          border-color: var(--color-brand);
          box-shadow: var(--shadow-subtle);
        }

        .thumbnail-btn img {
          width: 80%;
          height: 80%;
          object-fit: contain;
        }

        .detail-panel {
          padding-left: var(--spacing-lg);
        }

        .icon-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          transition: var(--transition-fast);
          cursor: pointer;
        }

        .icon-action-btn:hover {
          color: var(--color-brand);
          border-color: var(--color-brand);
          background-color: var(--color-brand-light);
        }

        .divider {
          height: 1px;
          background-color: var(--color-border);
          width: 100%;
        }

        /* Options */
        .metal-selector-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          cursor: pointer;
          transition: var(--transition-fast);
          position: relative;
        }

        .metal-selector-btn.active {
          outline: 1.5px solid var(--color-brand);
          outline-offset: 3px;
        }

        .carat-opt-btn {
          background-color: var(--color-bg-light);
          border: 1px solid var(--color-border);
          padding: 8px 16px;
          font-size: 0.85rem;
          color: var(--color-text-dark);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
          flex: 1;
        }

        .carat-opt-btn:hover {
          border-color: var(--color-brand);
        }

        .carat-opt-btn.active {
          background-color: var(--color-brand);
          border-color: var(--color-brand);
          color: var(--color-bg-white);
        }

        .size-select {
          max-width: 200px;
          cursor: pointer;
        }

        .add-bag-btn {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        .add-bag-btn.success {
          background-color: #10b981;
          color: #fff;
          border-color: #10b981;
        }

        .shipping-bullet {
          background-color: var(--color-bg-light);
          padding: var(--spacing-md);
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
        }

        /* Specs Accordion */
        .accordion-tab-btn {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 10px 16px 8px;
          color: var(--color-text-muted);
          border-bottom: 2px solid transparent;
          transition: var(--transition-fast);
        }

        .accordion-tab-btn:hover, .accordion-tab-btn.active {
          color: var(--color-brand);
          border-bottom-color: var(--color-brand);
        }

        .specs-table-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .specs-row {
          border-bottom: 1px solid var(--color-bg-light);
          padding-bottom: 6px;
        }

        .specs-row .label {
          color: var(--color-text-muted);
        }

        .specs-row .val {
          color: var(--color-text-dark);
        }
      `}</style>
    </div>
  );
}
