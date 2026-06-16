import React, { useState, useEffect } from 'react';
import { Heart, SlidersHorizontal, ChevronDown, Check, X, Star } from 'lucide-react';
import studs from '../assets/diamond_earrings.png';
import bracelet from '../assets/tennis_bracelet.png';
import band from '../assets/mens_wedding_band.png';
import ringHero from '../assets/hero_diamond_ring.png';
import necklace from '../assets/diamond_necklace.png';

// Master List of Products
const MASTER_PRODUCTS = [
  { id: 'p1', name: 'Classic Solitaire Engagement Ring', category: 'Engagement', price: 1250, shape: 'Round', metal: '14k White Gold', style: 'Solitaire', rating: 4.8, reviews: 29, image: ringHero },
  { id: 'p2', name: 'Aura Round Lab Diamond Studs', category: 'Fine Jewelry', price: 1290, shape: 'Round', metal: '14k White Gold', style: 'Studs', rating: 5.0, reviews: 42, image: studs },
  { id: 'p3', name: 'Elysian Diamond Tennis Bracelet', category: 'Fine Jewelry', price: 3450, shape: 'Round', metal: '14k White Gold', style: 'Bracelet', rating: 5.0, reviews: 19, image: bracelet },
  { id: 'p4', name: 'Atlas Platinum Wedding Band', category: 'Wedding', price: 950, shape: 'Classic Round', metal: 'Platinum', style: 'Classic Band', rating: 4.9, reviews: 68, image: band },
  { id: 'p5', name: 'Elysian Halo Diamond Ring', category: 'Engagement', price: 2100, shape: 'Round', metal: '14k Yellow Gold', style: 'Halo', rating: 4.7, reviews: 15, image: ringHero },
  { id: 'p6', name: 'Venezia Oval Solitaire Ring', category: 'Engagement', price: 1850, shape: 'Oval', metal: '14k Rose Gold', style: 'Solitaire', rating: 4.9, reviews: 31, image: ringHero },
  { id: 'p7', name: 'Empress Emerald Three-Stone Ring', category: 'Engagement', price: 2900, shape: 'Emerald', metal: 'Platinum', style: 'Three-Stone', rating: 5.0, reviews: 8, image: ringHero },
  { id: 'p8', name: 'Sienna Diamond Eternity Band', category: 'Wedding', price: 1950, shape: 'Round', metal: '14k White Gold', style: 'Eternity Band', rating: 4.8, reviews: 24, image: ringHero },
  { id: 'p9', name: 'Sienna Rose Gold Wedding Band', category: 'Wedding', price: 850, shape: 'Classic Round', metal: '14k Rose Gold', style: 'Classic Band', rating: 4.6, reviews: 11, image: band },
  { id: 'p10', name: 'Luna Marquise Pavé Ring', category: 'Engagement', price: 2400, shape: 'Marquise', metal: '14k Yellow Gold', style: 'Pavé', rating: 4.8, reviews: 14, image: ringHero },
  { id: 'p11', name: 'De Rosa Diamond Suite Necklace', category: 'Fine Jewelry', price: 8500, shape: 'Pear', metal: 'Platinum', style: 'Necklace', rating: 5.0, reviews: 14, image: necklace },
  { id: 'p12', name: 'Radiant Cut Halo Engagement Ring', category: 'Engagement', price: 2750, shape: 'Radiant', metal: '14k White Gold', style: 'Halo', rating: 4.9, reviews: 12, image: ringHero },
  { id: 'p13', name: 'Amara Heart Solitaire Pendant', category: 'Fine Jewelry', price: 1550, shape: 'Heart', metal: '14k Rose Gold', style: 'Necklace', rating: 4.8, reviews: 7, image: necklace },
  { id: 'p14', name: 'Princess Cut Classic Studs', category: 'Fine Jewelry', price: 1150, shape: 'Princess', metal: '14k Yellow Gold', style: 'Studs', rating: 4.7, reviews: 18, image: studs },
  { id: 'p15', name: 'Cushion Cut Three-Stone Ring', category: 'Engagement', price: 3100, shape: 'Cushion', metal: 'Platinum', style: 'Three-Stone', rating: 4.9, reviews: 16, image: ringHero }
];

export default function Shop({ 
  filters = {}, 
  onPageChange, 
  onAddWishlist, 
  wishlist 
}) {
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'All');
  const [selectedMetal, setSelectedMetal] = useState(filters.metal || 'All');
  const [selectedShape, setSelectedShape] = useState(filters.shape || 'All');
  const [selectedStyle, setSelectedStyle] = useState(filters.style || 'All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('best-sellers');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if initial filters change (e.g. from mega-menu navigation)
  useEffect(() => {
    if (filters.category) setSelectedCategory(filters.category);
    if (filters.metal) setSelectedMetal(filters.metal);
    if (filters.shape) setSelectedShape(filters.shape);
    if (filters.style) setSelectedStyle(filters.style);
  }, [filters]);

  // Handle clearing all filters
  const handleClearAll = () => {
    setSelectedCategory('All');
    setSelectedMetal('All');
    setSelectedShape('All');
    setSelectedStyle('All');
    setPriceRange('All');
  };

  // Filter products logic
  const filteredProducts = MASTER_PRODUCTS.filter((product) => {
    // 1. Wishlist Check
    if (filters.wishlistOnly && !wishlist.includes(product.id)) {
      return false;
    }

    // 2. Search query check
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchMetal = product.metal.toLowerCase().includes(q);
      return matchName || matchCat || matchMetal;
    }

    // 3. Dropdown filter check
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Rings') {
        const isRing = product.category === 'Engagement' || product.category === 'Wedding' || product.style.toLowerCase().includes('ring') || product.name.toLowerCase().includes('ring') || product.name.toLowerCase().includes('band');
        if (!isRing) return false;
      } else if (selectedCategory === 'Earrings') {
        const isEarring = product.style === 'Studs' || product.name.toLowerCase().includes('studs') || product.name.toLowerCase().includes('earring');
        if (!isEarring) return false;
      } else if (selectedCategory === 'Necklaces') {
        const isNecklace = product.style === 'Necklace' || product.name.toLowerCase().includes('necklace') || product.name.toLowerCase().includes('suite');
        if (!isNecklace) return false;
      } else if (selectedCategory === 'Bracelets') {
        const isBracelet = product.style === 'Bracelet' || product.name.toLowerCase().includes('bracelet');
        if (!isBracelet) return false;
      } else if (selectedCategory === 'Unique') {
        const isUnique = product.style === 'Three-Stone' || product.style === 'Pavé' || product.style === 'Necklace' || product.price > 2000;
        if (!isUnique) return false;
      } else {
        if (product.category !== selectedCategory) return false;
      }
    }
    if (selectedMetal !== 'All' && !product.metal.includes(selectedMetal)) return false;
    if (selectedShape !== 'All' && product.shape !== selectedShape) return false;
    if (selectedStyle !== 'All' && product.style !== selectedStyle) return false;

    // 4. Price range check
    if (priceRange !== 'All') {
      if (priceRange === 'under-1000' && product.price >= 1000) return false;
      if (priceRange === '1000-2500' && (product.price < 1000 || product.price > 2500)) return false;
      if (priceRange === '2500-5000' && (product.price < 2500 || product.price > 5000)) return false;
      if (priceRange === 'above-5000' && product.price <= 5000) return false;
    }

    return true;
  });

  // Sort products logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews; // Default to best sellers (most reviews)
  });

  return (
    <div className="shop-page-wrapper py-xl">
      <div className="container">
        
        {/* Shop Header Title */}
        <div className="shop-title-section text-center">
          <h1 className="font-serif shop-title">
            {filters.wishlistOnly ? 'Your Wishlist' : filters.search ? `Search Results for "${filters.search}"` : `${selectedCategory !== 'All' ? selectedCategory : 'Lab-Grown Fine'} Jewelry`}
          </h1>
          <p className="font-sans text-muted shop-desc">
            {filters.wishlistOnly 
              ? 'Your curated selection of favorite hand-crafted pieces.' 
              : 'Discover certified lab diamonds, ethically grown and masterfully set in our signature styles.'}
          </p>
        </div>

        {/* Filter and Sort Bar */}
        {!filters.wishlistOnly && (
          <div className="filter-sort-bar flex justify-between items-center shadow-subtle">
            <button className="mobile-filter-trigger btn btn-secondary" onClick={() => setShowMobileFilters(true)}>
              <SlidersHorizontal size={16} style={{ marginRight: 8 }} /> Filters
            </button>

            <div className="desktop-filters flex gap-md">
              {/* Category Filter */}
              <div className="filter-select-wrapper">
                <span className="filter-label font-sans">Category:</span>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Categories</option>
                  <option value="Rings">Rings</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Unique">Unique Designs</option>
                </select>
              </div>

              {/* Metal Filter */}
              <div className="filter-select-wrapper">
                <span className="filter-label font-sans">Metal:</span>
                <select 
                  value={selectedMetal} 
                  onChange={(e) => setSelectedMetal(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Metals</option>
                  <option value="White Gold">14k White Gold</option>
                  <option value="Yellow Gold">14k Yellow Gold</option>
                  <option value="Rose Gold">14k Rose Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>

              {/* Shape Filter */}
              <div className="filter-select-wrapper">
                <span className="filter-label font-sans">Diamond Shape:</span>
                <select 
                  value={selectedShape} 
                  onChange={(e) => setSelectedShape(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Shapes</option>
                  <option value="Round">Round</option>
                  <option value="Radiant">Radiant</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Heart">Heart</option>
                  <option value="Marquise">Marquise</option>
                  <option value="Pear">Pear</option>
                  <option value="Oval">Oval</option>
                  <option value="Princess">Princess</option>
                  <option value="Cushion">Cushion</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="filter-select-wrapper">
                <span className="filter-label font-sans">Price:</span>
                <select 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Prices</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="above-5000">Above $5,000</option>
                </select>
              </div>
            </div>

            {/* Sorting */}
            <div className="sorting-select-wrapper flex items-center">
              <span className="filter-label font-sans text-muted" style={{ marginRight: 8 }}>Sort By:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select sort-select"
              >
                <option value="best-sellers">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {!filters.wishlistOnly && (
          <div className="active-filter-tags-area flex items-center flex-wrap gap-sm">
            {(selectedCategory !== 'All' || selectedMetal !== 'All' || selectedShape !== 'All' || selectedStyle !== 'All' || priceRange !== 'All') && (
              <>
                <span className="active-filter-label font-sans text-muted">Active Filters:</span>
                
                {selectedCategory !== 'All' && (
                  <span className="filter-tag">{selectedCategory} <button onClick={() => setSelectedCategory('All')}><X size={10} /></button></span>
                )}
                {selectedMetal !== 'All' && (
                  <span className="filter-tag">{selectedMetal} <button onClick={() => setSelectedMetal('All')}><X size={10} /></button></span>
                )}
                {selectedShape !== 'All' && (
                  <span className="filter-tag">{selectedShape} Shape <button onClick={() => setSelectedShape('All')}><X size={10} /></button></span>
                )}
                {selectedStyle !== 'All' && (
                  <span className="filter-tag">{selectedStyle} <button onClick={() => setSelectedStyle('All')}><X size={10} /></button></span>
                )}
                {priceRange !== 'All' && (
                  <span className="filter-tag">{priceRange === 'under-1000' ? 'Under $1,000' : priceRange === '1000-2500' ? '$1,000 - $2,500' : priceRange === '2500-5000' ? '$2,500 - $5,000' : 'Above $5,000'} <button onClick={() => setPriceRange('All')}><X size={10} /></button></span>
                )}

                <button onClick={handleClearAll} className="clear-all-filters-btn font-sans">Clear All</button>
              </>
            )}
          </div>
        )}

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="no-products-found flex flex-col items-center justify-center py-xxl">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" style={{marginBottom: 16}}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z"/></svg>
            <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--color-text-dark)' }}>No Jewelry Found</h3>
            <p className="font-sans text-muted" style={{ marginTop: 8, fontSize: '0.9rem', maxWidth: 300, textAlign: 'center' }}>We couldn't find any items matching your selected filters. Try adjusting your selections.</p>
            <button onClick={handleClearAll} className="btn btn-primary" style={{ marginTop: 24 }}>Reset All Filters</button>
          </div>
        ) : (
          <div className="shop-products-grid grid grid-cols-4 gap-xl">
            {sortedProducts.map((product) => {
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
                    <p className="product-card-specs font-sans text-muted">{product.metal} &bull; {product.shape} Shape</p>
                    <span className="product-card-price font-serif">${product.price.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer Modal */}
      {showMobileFilters && (
        <div className="mobile-filter-modal fade-in">
          <div className="mobile-filter-card shadow-heavy">
            <div className="mobile-filter-header flex justify-between items-center">
              <h3 className="font-serif">Filter Jewelry</h3>
              <button onClick={() => setShowMobileFilters(false)}><X size={24} /></button>
            </div>
            
            <div className="mobile-filter-body flex flex-col gap-lg py-md">
              {/* Category */}
              <div className="m-filter-group">
                <span className="m-filter-label font-sans">Category</span>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="form-input">
                  <option value="All">All Categories</option>
                  <option value="Rings">Rings</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Unique">Unique Designs</option>
                </select>
              </div>

              {/* Metal */}
              <div className="m-filter-group">
                <span className="m-filter-label font-sans">Precious Metal</span>
                <select value={selectedMetal} onChange={(e) => setSelectedMetal(e.target.value)} className="form-input">
                  <option value="All">All Metals</option>
                  <option value="White Gold">14k White Gold</option>
                  <option value="Yellow Gold">14k Yellow Gold</option>
                  <option value="Rose Gold">14k Rose Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>

              {/* Shape */}
              <div className="m-filter-group">
                <span className="m-filter-label font-sans">Diamond Shape</span>
                <select value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)} className="form-input">
                  <option value="All">All Shapes</option>
                  <option value="Round">Round</option>
                  <option value="Radiant">Radiant</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Heart">Heart</option>
                  <option value="Marquise">Marquise</option>
                  <option value="Pear">Pear</option>
                  <option value="Oval">Oval</option>
                  <option value="Princess">Princess</option>
                  <option value="Cushion">Cushion</option>
                </select>
              </div>

              {/* Price */}
              <div className="m-filter-group">
                <span className="m-filter-label font-sans">Price Range</span>
                <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="form-input">
                  <option value="All">All Prices</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="above-5000">Above $5,000</option>
                </select>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowMobileFilters(false)}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <style>{`
        .shop-page-wrapper {
          background-color: var(--color-bg-white);
        }

        .shop-title-section {
          max-width: 600px;
          margin: 0 auto 3rem;
        }

        .shop-title {
          font-size: 2.8rem;
          color: var(--color-text-dark);
          margin-bottom: 8px;
        }

        .shop-desc {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .filter-sort-bar {
          background-color: var(--color-bg-light);
          border: 1px solid var(--color-border);
          padding: 1rem 1.5rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
        }

        .filter-select-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .filter-select {
          background: transparent;
          border: 1px solid var(--color-border);
          padding: 6px 12px;
          font-size: 0.85rem;
          color: var(--color-text-dark);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .filter-select:hover {
          border-color: var(--color-brand);
        }

        .sort-select {
          border-color: transparent;
          font-weight: 500;
        }

        .active-filter-tags-area {
          margin-bottom: 2.5rem;
          min-height: 30px;
        }

        .active-filter-label {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .filter-tag {
          font-size: 0.75rem;
          background-color: var(--color-brand-light);
          border: 1px solid var(--color-brand);
          color: var(--color-brand);
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .filter-tag button {
          color: var(--color-brand);
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .clear-all-filters-btn {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 500;
          border-bottom: 1px dashed var(--color-text-muted);
          cursor: pointer;
        }

        .clear-all-filters-btn:hover {
          color: var(--color-brand);
          border-color: var(--color-brand);
        }

        .shop-products-grid {
          margin-top: 2rem;
        }

        .mobile-filter-trigger {
          display: none;
        }

        /* Mobile filter modal styling */
        .mobile-filter-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(43, 43, 43, 0.4);
          z-index: 1200;
          display: flex;
          justify-content: flex-end;
        }

        .mobile-filter-card {
          background-color: var(--color-bg-white);
          width: 320px;
          height: 100%;
          padding: var(--spacing-xl);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .mobile-filter-header {
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 12px;
        }

        .m-filter-label {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          font-weight: 600;
          margin-bottom: 8px;
        }

        @media (max-width: 1024px) {
          .desktop-filters {
            display: none;
          }

          .mobile-filter-trigger {
            display: inline-flex;
          }
        }
      `}</style>
    </div>
  );
}
