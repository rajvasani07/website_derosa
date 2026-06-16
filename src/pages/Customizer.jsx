import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles, ShieldAlert, Star } from 'lucide-react';
import ringHero from '../assets/hero_diamond_ring.png';

// Mock Settings
const SETTINGS_LIST = [
  { id: 's1', name: 'Classic Solitaire Setting', basePrice: 850, style: 'Solitaire', description: 'Timeless and elegant, highlighting the center stone with minimal metal interruption.' },
  { id: 's2', name: 'Aura Halo Setting', basePrice: 1450, style: 'Halo', description: 'A circle of micro-pavé diamonds surrounds the center stone for maximum light reflection.' },
  { id: 's3', name: 'Empress Three-Stone Setting', basePrice: 1850, style: 'Three-Stone', description: 'Three diamonds sit side-by-side, symbolizing your past, present, and future together.' },
  { id: 's4', name: 'Venezia Pavé Setting', basePrice: 1250, style: 'Pavé', description: 'Dainty diamonds set along the band, adding extra sparkle to a classic silhouette.' }
];

// Mock Diamonds List
const DIAMONDS_LIST = [
  { id: 'd1', shape: 'Round', carat: 1.0, color: 'D', clarity: 'VVS1', price: 1200 },
  { id: 'd2', shape: 'Round', carat: 1.5, color: 'E', clarity: 'VS1', price: 2100 },
  { id: 'd3', shape: 'Round', carat: 2.0, color: 'F', clarity: 'VS2', price: 3400 },
  { id: 'd4', shape: 'Oval', carat: 1.0, color: 'E', clarity: 'VS1', price: 1150 },
  { id: 'd5', shape: 'Oval', carat: 1.5, color: 'F', clarity: 'VS2', price: 1950 },
  { id: 'd6', shape: 'Oval', carat: 2.0, color: 'G', clarity: 'SI1', price: 2800 },
  { id: 'd7', shape: 'Cushion', carat: 1.2, color: 'F', clarity: 'VS1', price: 1400 },
  { id: 'd8', shape: 'Cushion', carat: 1.7, color: 'G', clarity: 'VS2', price: 2200 },
  { id: 'd9', shape: 'Emerald', carat: 1.5, color: 'D', clarity: 'VVS2', price: 2400 },
  { id: 'd10', shape: 'Emerald', carat: 2.0, color: 'F', clarity: 'VS1', price: 3500 },
  { id: 'd11', shape: 'Pear', carat: 1.1, color: 'E', clarity: 'VS1', price: 1350 },
  { id: 'd12', shape: 'Pear', carat: 1.6, color: 'F', clarity: 'VS2', price: 2150 },
  { id: 'd13', shape: 'Radiant', carat: 1.5, color: 'G', clarity: 'VS1', price: 1800 }
];

const METALS = [
  { name: '14k White Gold', hex: '#E5E4E2', diff: 0 },
  { name: '14k Yellow Gold', hex: '#ECE0C8', diff: 0 },
  { name: '14k Rose Gold', hex: '#ECC8C8', diff: 50 },
  { name: 'Platinum', hex: '#D2D1CE', diff: 300 }
];

export default function Customizer({ onAddCart, onOpenCart }) {
  const [step, setStep] = useState(1); // 1: Choose Setting, 2: Choose Diamond, 3: Review Ring
  
  // Customizer Selections State
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(METALS[0]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [ringSize, setRingSize] = useState('6.0');

  // Diamond Filters state
  const [shapeFilter, setShapeFilter] = useState('All');
  const [caratFilter, setCaratFilter] = useState('All');
  const [colorFilter, setColorFilter] = useState('All');

  // Filtered diamonds logic
  const filteredDiamonds = DIAMONDS_LIST.filter((diamond) => {
    if (shapeFilter !== 'All' && diamond.shape !== shapeFilter) return false;
    if (colorFilter !== 'All' && diamond.color !== colorFilter) return false;
    
    if (caratFilter !== 'All') {
      if (caratFilter === '1ct' && diamond.carat > 1.2) return false;
      if (caratFilter === '1.5ct' && (diamond.carat <= 1.2 || diamond.carat > 1.7)) return false;
      if (caratFilter === '2ct' && diamond.carat <= 1.7) return false;
    }
    return true;
  });

  // Calculations
  const settingPrice = selectedSetting ? selectedSetting.basePrice + selectedMetal.diff : 0;
  const diamondPrice = selectedDiamond ? selectedDiamond.price : 0;
  const totalPrice = settingPrice + diamondPrice;

  // Complete customizations and add bag
  const handleAddCustomRingToBag = () => {
    if (!selectedSetting || !selectedMetal || !selectedDiamond) return;

    const cartItem = {
      cartId: `custom-${Date.now()}`,
      id: `custom-ring-${selectedSetting.id}`,
      name: `Customized Ring: ${selectedDiamond.carat} ct ${selectedDiamond.shape} Diamond`,
      price: totalPrice,
      image: ringHero,
      quantity: 1,
      details: {
        metal: selectedMetal.name,
        shape: selectedDiamond.shape,
        carat: `${selectedDiamond.carat} ct`,
        setting: selectedSetting.name,
        size: ringSize
      }
    };

    onAddCart(cartItem);
    setTimeout(() => {
      onOpenCart();
    }, 200);
  };

  return (
    <div className="customizer-page-wrapper py-xl">
      <div className="container">
        
        {/* Page Title & Wizard Progress Breadcrumbs */}
        <div className="customizer-header flex justify-between items-center">
          <div>
            <h1 className="font-serif page-title">Design Your Ring</h1>
            <p className="font-sans text-muted" style={{ fontSize: '0.9rem' }}>Create your perfect lab-grown engagement ring in three simple steps.</p>
          </div>
          
          <div className="customizer-steps flex gap-lg">
            <button 
              className={`step-indicator ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
              onClick={() => step > 1 && setStep(1)}
            >
              1. Choose Setting
            </button>
            <button 
              className={`step-indicator ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
              onClick={() => {
                if (selectedSetting) setStep(2);
              }}
              disabled={!selectedSetting}
            >
              2. Choose Diamond
            </button>
            <button 
              className={`step-indicator ${step === 3 ? 'active' : ''}`}
              disabled={!selectedSetting || !selectedDiamond}
            >
              3. Review & Order
            </button>
          </div>
        </div>

        <div className="divider" style={{ margin: '2rem 0' }} />

        {/* Wizard step Content */}
        
        {/* STEP 1: CHOOSE SETTING & METAL */}
        {step === 1 && (
          <div className="step-grid grid grid-cols-2 gap-xl">
            {/* Left: Settings grid list */}
            <div className="settings-selection-area flex flex-col gap-lg">
              <h2 className="font-serif step-title">Step 1: Choose Ring Setting</h2>
              <div className="settings-list-grid flex flex-col gap-md">
                {SETTINGS_LIST.map((setting) => (
                  <div 
                    key={setting.id}
                    className={`setting-card flex gap-md shadow-subtle ${selectedSetting?.id === setting.id ? 'active' : ''}`}
                    onClick={() => setSelectedSetting(setting)}
                  >
                    <div className="setting-card-img-wrapper">
                      <img src={ringHero} alt={setting.name} />
                    </div>
                    <div className="setting-card-info flex flex-col justify-center">
                      <div className="flex justify-between items-center">
                        <h4 className="font-serif setting-name">{setting.name}</h4>
                        <span className="setting-price font-serif">${(setting.basePrice + selectedMetal.diff).toLocaleString()}</span>
                      </div>
                      <p className="setting-desc font-sans text-muted" style={{ fontSize: '0.8rem', marginTop: 4 }}>{setting.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Preview setting, Metal configuration */}
            <div className="preview-config-area flex flex-col gap-lg shadow-premium" style={{ backgroundColor: 'var(--color-bg-light)', padding: '3rem', borderRadius: 4 }}>
              <div className="setting-preview-viewport flex items-center justify-center" style={{ backgroundColor: '#000000', borderRadius: 2, height: 300, border: '1px solid var(--color-border)' }}>
                <img src={ringHero} alt="Setting preview" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </div>

              <div className="metal-config">
                <span className="option-label-header font-sans" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 8 }}>Select Ring Metal:</span>
                <div className="metals-row flex gap-md">
                  {METALS.map((metal) => (
                    <button 
                      key={metal.name}
                      className={`metal-selector-btn ${selectedMetal.name === metal.name ? 'active' : ''}`}
                      onClick={() => setSelectedMetal(metal)}
                      style={{ backgroundColor: metal.hex }}
                      title={metal.name}
                    />
                  ))}
                </div>
                <span className="font-sans text-muted" style={{ fontSize: '0.8rem', display: 'block', marginTop: 6 }}>Current Metal: <strong>{selectedMetal.name}</strong> {selectedMetal.diff > 0 && `(+$${selectedMetal.diff})`}</span>
              </div>

              <div className="wizard-actions flex justify-between items-center" style={{ marginTop: 'auto' }}>
                <div className="price-summary-card font-serif">
                  <span className="text-muted font-sans" style={{ fontSize: '0.75rem', display: 'block' }}>Setting Price</span>
                  <span>${settingPrice.toLocaleString()}</span>
                </div>
                <button 
                  className="btn btn-primary" 
                  disabled={!selectedSetting}
                  onClick={() => setStep(2)}
                >
                  Choose Diamond <ArrowRight size={16} style={{ marginLeft: 8 }} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE DIAMOND */}
        {step === 2 && (
          <div className="step-grid grid grid-cols-2 gap-xl">
            {/* Left: Filterable Diamond List */}
            <div className="diamond-selection-area flex flex-col gap-md">
              <h2 className="font-serif step-title">Step 2: Match Your Diamond</h2>
              
              {/* Diamond Filters */}
              <div className="diamond-filters-grid grid grid-cols-3 gap-sm" style={{ marginBottom: 12 }}>
                <div className="filter-wrapper flex flex-col">
                  <span className="filter-label font-sans" style={{ marginBottom: 4 }}>Shape</span>
                  <select value={shapeFilter} onChange={(e) => setShapeFilter(e.target.value)} className="form-input">
                    <option value="All">All Shapes</option>
                    <option value="Round">Round</option>
                    <option value="Oval">Oval</option>
                    <option value="Cushion">Cushion</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Pear">Pear</option>
                  </select>
                </div>
                
                <div className="filter-wrapper flex flex-col">
                  <span className="filter-label font-sans" style={{ marginBottom: 4 }}>Carat</span>
                  <select value={caratFilter} onChange={(e) => setCaratFilter(e.target.value)} className="form-input">
                    <option value="All">All Carats</option>
                    <option value="1ct">~1.0 ct</option>
                    <option value="1.5ct">~1.5 ct</option>
                    <option value="2ct">~2.0 ct</option>
                  </select>
                </div>

                <div className="filter-wrapper flex flex-col">
                  <span className="filter-label font-sans" style={{ marginBottom: 4 }}>Color</span>
                  <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)} className="form-input">
                    <option value="All">All Colors</option>
                    <option value="D">D (Colorless)</option>
                    <option value="E">E (Colorless)</option>
                    <option value="F">F (Colorless)</option>
                    <option value="G">G (Near Colorless)</option>
                  </select>
                </div>
              </div>

              {/* Diamond List Grid */}
              <div className="diamonds-list-container" style={{ maxHeight: '420px', overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 2 }}>
                {filteredDiamonds.length === 0 ? (
                  <div className="empty-filter flex flex-col items-center justify-center py-xl">
                    <span className="text-muted font-sans" style={{ fontSize: '0.85rem' }}>No diamonds match the filter requirements.</span>
                  </div>
                ) : (
                  <table className="diamonds-table">
                    <thead>
                      <tr className="font-sans">
                        <th>Shape</th>
                        <th>Carat</th>
                        <th>Color</th>
                        <th>Clarity</th>
                        <th>Price</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDiamonds.map((diamond) => (
                        <tr 
                          key={diamond.id} 
                          className={`diamond-row font-sans ${selectedDiamond?.id === diamond.id ? 'active' : ''}`}
                          onClick={() => setSelectedDiamond(diamond)}
                        >
                          <td>{diamond.shape}</td>
                          <td className="font-bold">{diamond.carat} ct</td>
                          <td>{diamond.color}</td>
                          <td>{diamond.clarity}</td>
                          <td className="font-serif" style={{ color: 'var(--color-brand)', fontWeight: 600 }}>${diamond.price.toLocaleString()}</td>
                          <td>
                            <button className="select-row-indicator">
                              {selectedDiamond?.id === diamond.id ? <Check size={14} className="text-brand" /> : <span className="dot" />}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Right: Review Setting Summary + Selection preview */}
            <div className="preview-config-area flex flex-col gap-lg shadow-premium" style={{ backgroundColor: 'var(--color-bg-light)', padding: '3rem', borderRadius: 4 }}>
              <div className="selected-summary-box flex flex-col gap-sm">
                <span className="builder-tag text-uppercase">Summary selections</span>
                <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
                  <span className="font-sans">Setting Selected:</span>
                  <span className="font-bold">{selectedSetting.name} ({selectedMetal.name})</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
                  <span className="font-sans">Setting Cost:</span>
                  <span className="font-bold">${settingPrice.toLocaleString()}</span>
                </div>
                {selectedDiamond && (
                  <div className="flex justify-between" style={{ fontSize: '0.9rem', borderTop: '1px solid var(--color-border)', paddingTop: 8 }}>
                    <span className="font-sans">Diamond Selected:</span>
                    <span className="font-bold">{selectedDiamond.carat} ct {selectedDiamond.shape} ({selectedDiamond.color}/{selectedDiamond.clarity})</span>
                  </div>
                )}
              </div>

              <div className="wizard-actions flex justify-between items-center" style={{ marginTop: 'auto' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setStep(1)}
                  style={{ display: 'inline-flex', gap: 6 }}
                >
                  <ArrowLeft size={16} /> Settings
                </button>
                <div className="price-summary-card font-serif text-right">
                  <span className="text-muted font-sans" style={{ fontSize: '0.75rem', display: 'block' }}>Total Custom Ring Price</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <button 
                  className="btn btn-primary" 
                  disabled={!selectedDiamond}
                  onClick={() => setStep(3)}
                >
                  Review Ring <ArrowRight size={16} style={{ marginLeft: 8 }} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW CUSTOM RING */}
        {step === 3 && (
          <div className="step-grid grid grid-cols-2 gap-xl">
            {/* Left: Complete Visual Ring Preview */}
            <div className="setting-preview-viewport flex flex-col items-center justify-center shadow-subtle" style={{ backgroundColor: '#000000', borderRadius: 4, height: 450 }}>
              <img src={ringHero} alt="Complete Customized Ring" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
              <div className="sparkle-tag text-uppercase font-sans" style={{ position: 'relative', top: 12 }}>
                <Sparkles size={12} style={{ marginRight: 6 }} /> Perfect Match
              </div>
            </div>

            {/* Right: Spec summaries, ring size & add bag */}
            <div className="review-spec-panel flex flex-col gap-lg">
              <div>
                <span className="builder-tag text-uppercase">Review Custom Design</span>
                <h2 className="font-serif" style={{ fontSize: '2rem', marginTop: 6 }}>Your Customized Engagement Ring</h2>
                <div className="product-rating flex items-center gap-xs" style={{ marginTop: 6 }}>
                  <div className="stars flex text-brand">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="review-count font-sans text-muted" style={{ fontSize: '0.75rem' }}>IGI Certified Gemstones &bull; Hand-Crafted Settings</span>
                </div>
              </div>

              <div className="custom-spec-list flex flex-col gap-sm">
                <div className="spec-row flex justify-between font-sans" style={{ borderBottom: '1px solid var(--color-bg-light)', paddingBottom: 6, fontSize: '0.9rem' }}>
                  <span className="text-muted">Ring Setting:</span>
                  <span className="font-bold">{selectedSetting.name}</span>
                </div>
                <div className="spec-row flex justify-between font-sans" style={{ borderBottom: '1px solid var(--color-bg-light)', paddingBottom: 6, fontSize: '0.9rem' }}>
                  <span className="text-muted">Precious Metal:</span>
                  <span className="font-bold">{selectedMetal.name}</span>
                </div>
                <div className="spec-row flex justify-between font-sans" style={{ borderBottom: '1px solid var(--color-bg-light)', paddingBottom: 6, fontSize: '0.9rem' }}>
                  <span className="text-muted">Diamond Shape:</span>
                  <span className="font-bold">{selectedDiamond.shape} Cut</span>
                </div>
                <div className="spec-row flex justify-between font-sans" style={{ borderBottom: '1px solid var(--color-bg-light)', paddingBottom: 6, fontSize: '0.9rem' }}>
                  <span className="text-muted">Diamond Specifications:</span>
                  <span className="font-bold">{selectedDiamond.carat} ct &bull; Color {selectedDiamond.color} &bull; Clarity {selectedDiamond.clarity}</span>
                </div>
              </div>

              {/* Ring Size Selection */}
              <div className="option-group">
                <span className="option-label-header font-sans" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 8 }}>Choose Ring Size:</span>
                <select value={ringSize} onChange={(e) => setRingSize(e.target.value)} className="form-input" style={{ maxWidth: '200px' }}>
                  {['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'].map((sz) => (
                    <option key={sz} value={sz}>Size {sz}</option>
                  ))}
                </select>
              </div>

              <div className="divider" />

              {/* Pricing & Add Bag Checkout */}
              <div className="customizer-actions-footer flex justify-between items-center" style={{ marginTop: 'auto' }}>
                <div className="price-display-wrapper font-serif">
                  <span className="text-muted font-sans" style={{ fontSize: '0.8rem', display: 'block' }}>Ring Design Total</span>
                  <span style={{ fontSize: '2rem', color: 'var(--color-brand)', fontWeight: 500 }}>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex gap-md">
                  <button className="btn btn-secondary" onClick={() => setStep(2)}>
                    <ArrowLeft size={16} style={{ marginRight: 6 }} /> Diamond
                  </button>
                  <button className="btn btn-primary" onClick={handleAddCustomRingToBag}>
                    Add Custom Ring to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .customizer-page-wrapper {
          background-color: var(--color-bg-white);
        }

        .step-indicator {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 8px 16px;
          color: var(--color-text-muted);
          border-bottom: 2px solid transparent;
          transition: var(--transition-fast);
        }

        .step-indicator.active {
          color: var(--color-brand);
          border-bottom-color: var(--color-brand);
        }

        .step-indicator.completed {
          color: var(--color-text-dark);
          border-bottom-color: var(--color-text-dark);
        }

        /* Settings selection step */
        .setting-card {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--spacing-md);
          cursor: pointer;
          background-color: var(--color-bg-white);
          transition: var(--transition-smooth);
        }

        .setting-card:hover, .setting-card.active {
          border-color: var(--color-brand);
          box-shadow: var(--shadow-subtle);
        }

        .setting-card-img-wrapper {
          width: 70px;
          height: 70px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--color-bg-light);
          flex-shrink: 0;
        }

        .setting-card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .setting-card-info {
          flex: 1;
        }

        .setting-name {
          font-size: 1.05rem;
          color: var(--color-text-dark);
        }

        .setting-price {
          font-size: 1rem;
          color: var(--color-text-dark);
          font-weight: 500;
        }

        /* Diamonds Table step */
        .diamonds-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .diamonds-table th {
          background-color: var(--color-bg-light);
          padding: 12px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          border-bottom: 1px solid var(--color-border);
        }

        .diamonds-table td {
          padding: 12px;
          font-size: 0.85rem;
          border-bottom: 1px solid var(--color-bg-light);
          color: var(--color-text-dark);
        }

        .diamond-row {
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .diamond-row:hover {
          background-color: var(--color-bg-light);
        }

        .diamond-row.active {
          background-color: var(--color-brand-light);
        }

        .select-row-indicator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .select-row-indicator .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-border);
          display: inline-block;
        }

        .diamonds-list-container::-webkit-scrollbar {
          width: 6px;
        }

        .diamonds-list-container::-webkit-scrollbar-thumb {
          background-color: var(--color-border);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
