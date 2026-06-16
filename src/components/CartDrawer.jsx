import React, { useState } from 'react';
import { X, Trash2, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart 
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isCheckoutMockOpen, setIsCheckoutMockOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Info, 2: Completed

  // Calculate prices
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = discountApplied && subtotal >= 1000 ? 100 : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME100') {
      if (subtotal >= 1000) {
        setDiscountApplied(true);
        setCouponError('');
      } else {
        setCouponError('Promo code WELCOME100 requires a minimum order of $1,000.');
      }
    } else {
      setCouponError('Invalid promo code. Try WELCOME100.');
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep(2);
    setTimeout(() => {
      onClearCart();
      setIsCheckoutMockOpen(false);
      setCheckoutStep(1);
      onClose();
    }, 4000);
  };

  return (
    <>
      {/* Background Overlay */}
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />

      {/* Cart Drawer */}
      <div className={`drawer ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3 className="font-serif cart-title">Your Shopping Bag ({cartItems.length})</h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart flex flex-col items-center justify-center">
              <ShoppingBagIconEmpty />
              <p className="empty-title font-serif">Your bag is empty</p>
              <p className="empty-desc font-sans text-muted">Browse our handcrafted collections of lab-grown jewelry to fill your bag.</p>
              <button onClick={onClose} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Continue Shopping</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.cartId} className="cart-item-row">
                  <div className="cart-item-img-container">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="font-serif cart-item-name">{item.name}</h4>
                    
                    {/* Ring Specific Details */}
                    {item.details && (
                      <p className="cart-item-specs font-sans text-muted">
                        {item.details.metal} &bull; {item.details.shape} Shape
                        {item.details.carat && ` &bull; ${item.details.carat} Carat`}
                        {item.details.size && ` &bull; Size ${item.details.size}`}
                      </p>
                    )}

                    <div className="cart-item-qty-price flex justify-between items-center">
                      <div className="qty-controls">
                        <button 
                          className="qty-btn" 
                          onClick={() => onUpdateQty(item.cartId, item.quantity - 1)}
                        >-</button>
                        <span className="qty-val">{item.quantity}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}
                        >+</button>
                      </div>
                      <span className="cart-item-price font-serif">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    className="cart-item-remove" 
                    onClick={() => onRemoveItem(item.cartId)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer Summary */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Application */}
            <form onSubmit={handleApplyCoupon} className="coupon-form flex gap-sm">
              <input 
                type="text" 
                placeholder="Promo Code" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="form-input coupon-input"
                disabled={discountApplied}
              />
              <button 
                type="submit" 
                className="btn btn-secondary coupon-btn"
                disabled={discountApplied}
              >
                Apply
              </button>
            </form>
            {discountApplied && (
              <div className="coupon-success fade-in">
                <Tag size={12} className="text-brand" style={{ marginRight: 6 }} />
                <span>Promo code applied successfully: <strong>-$100.00</strong></span>
              </div>
            )}
            {couponError && (
              <div className="coupon-error fade-in">
                <span>{couponError}</span>
              </div>
            )}

            {/* Calculations */}
            <div className="summary-calculations">
              <div className="calc-row flex justify-between">
                <span className="calc-label text-muted">Subtotal</span>
                <span className="calc-value font-serif">${subtotal.toLocaleString()}.00</span>
              </div>
              
              {discount > 0 && (
                <div className="calc-row flex justify-between text-brand">
                  <span className="calc-label">Welcome Discount</span>
                  <span className="calc-value font-serif">-${discount}.00</span>
                </div>
              )}

              <div className="calc-row flex justify-between">
                <span className="calc-label text-muted flex items-center"><Truck size={14} style={{ marginRight: 6 }} /> Shipping</span>
                <span className="calc-value text-brand font-sans text-uppercase" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Complimentary</span>
              </div>

              <div className="calc-row calc-total flex justify-between">
                <span className="total-label">Estimated Total</span>
                <span className="total-value font-serif">${total.toLocaleString()}.00</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              className="btn btn-primary checkout-btn" 
              onClick={() => setIsCheckoutMockOpen(true)}
            >
              Secure Checkout
            </button>
            
            <div className="security-badges flex justify-center items-center gap-md text-muted" style={{ marginTop: 12 }}>
              <span className="flex items-center" style={{ fontSize: '0.7rem' }}>
                <ShieldCheck size={14} style={{ marginRight: 4, color: 'var(--color-brand)' }} /> Secure SSL Payments
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mock Checkout Modal Dialog */}
      {isCheckoutMockOpen && (
        <div className="checkout-modal-overlay fade-in">
          <div className="checkout-modal-card shadow-heavy">
            <button className="modal-close" onClick={() => setIsCheckoutMockOpen(false)} aria-label="Close modal">
              <X size={20} />
            </button>
            
            {checkoutStep === 1 ? (
              <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                <h3 className="font-serif modal-heading">Secure Checkout</h3>
                
                <div className="form-section">
                  <h4 className="font-serif section-title">Shipping Address</h4>
                  <div className="form-group flex gap-sm">
                    <input type="text" placeholder="First Name" className="form-input" required />
                    <input type="text" placeholder="Last Name" className="form-input" required />
                  </div>
                  <input type="text" placeholder="Street Address" className="form-input" required style={{ marginTop: 8 }} />
                  <div className="form-group flex gap-sm" style={{ marginTop: 8 }}>
                    <input type="text" placeholder="City" className="form-input" required />
                    <input type="text" placeholder="Zip Code" className="form-input" required />
                  </div>
                </div>

                <div className="form-section" style={{ marginTop: 16 }}>
                  <h4 className="font-serif section-title">Payment Method</h4>
                  <input type="text" placeholder="Card Number (Mock)" className="form-input" required />
                  <div className="form-group flex gap-sm" style={{ marginTop: 8 }}>
                    <input type="text" placeholder="MM/YY" className="form-input" required maxLength={5} />
                    <input type="text" placeholder="CVC" className="form-input" required maxLength={3} />
                  </div>
                </div>

                <div className="order-summary-box" style={{ marginTop: 16, backgroundColor: 'var(--color-bg-light)', padding: 12, borderRadius: 2 }}>
                  <div className="flex justify-between font-serif" style={{ fontSize: '1rem' }}>
                    <span>Order Total:</span>
                    <span>${total.toLocaleString()}.00</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 20 }}>
                  Place Order
                </button>
              </form>
            ) : (
              <div className="checkout-completed flex flex-col items-center text-center py-lg">
                <div className="success-checkmark-outer">
                  <Sparkles className="text-brand animate-spin" size={48} />
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', marginTop: 16, color: 'var(--color-brand)' }}>Order Placed!</h3>
                <p className="font-sans text-muted" style={{ marginTop: 8, fontSize: '0.9rem', maxWidth: 350 }}>
                  Thank you for shopping with Derosa Jewels. Your order has been placed successfully. Preparing mock delivery.
                </p>
                <div className="progress-bar-container" style={{ marginTop: 24, width: '100%', height: 4, backgroundColor: 'var(--color-border)', borderRadius: 2, overflow: 'hidden' }}>
                  <div className="progress-bar-fill" style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-brand)', animation: 'fillProgress 4s linear' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Styled Icons */}
      <style>{`
        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--color-border);
        }

        .cart-title {
          font-size: 1.25rem;
          color: var(--color-text-dark);
        }

        .cart-close-btn {
          color: var(--color-text-dark);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .cart-close-btn:hover {
          color: var(--color-brand);
        }

        .cart-body {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-lg);
        }

        .empty-cart {
          height: 80%;
          text-align: center;
          padding: 0 var(--spacing-lg);
        }

        .empty-title {
          font-size: 1.5rem;
          margin-top: var(--spacing-md);
          color: var(--color-text-dark);
        }

        .empty-desc {
          font-size: 0.85rem;
          max-width: 280px;
          margin-top: var(--spacing-sm);
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cart-item-row {
          display: flex;
          gap: var(--spacing-md);
          position: relative;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-bg-light);
        }

        .cart-item-img-container {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--color-bg-warm);
          border: 1px solid var(--color-border);
          flex-shrink: 0;
        }

        .cart-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cart-item-name {
          font-size: 0.95rem;
          color: var(--color-text-dark);
          padding-right: 20px;
        }

        .cart-item-specs {
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .qty-controls {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          margin-top: 8px;
          background-color: var(--color-bg-light);
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: var(--color-text-dark);
          transition: var(--transition-fast);
        }

        .qty-btn:hover {
          color: var(--color-brand);
          background-color: var(--color-border);
        }

        .qty-val {
          padding: 0 10px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .cart-item-price {
          font-size: 1rem;
          color: var(--color-text-dark);
        }

        .cart-item-remove {
          position: absolute;
          top: 0;
          right: 0;
          color: var(--color-text-muted);
          transition: var(--transition-fast);
        }

        .cart-item-remove:hover {
          color: var(--color-brand);
        }

        .cart-footer {
          border-top: 1px solid var(--color-border);
          padding: var(--spacing-lg);
          background-color: var(--color-bg-light);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .coupon-form {
          margin-bottom: 4px;
        }

        .coupon-input {
          flex: 1;
          padding: 0.5rem 0.75rem;
          font-size: 0.8rem;
        }

        .coupon-btn {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          border-color: var(--color-text-dark);
        }

        .coupon-success {
          font-size: 0.75rem;
          color: var(--color-text-dark);
          display: flex;
          align-items: center;
          background-color: var(--color-brand-light);
          border: 1px solid var(--color-brand);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
        }

        .coupon-error {
          font-size: 0.75rem;
          color: var(--color-brand);
          background-color: #FDF0EE;
          border: 1px solid #F8C3B8;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
        }

        .summary-calculations {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: var(--spacing-md);
        }

        .calc-row {
          font-size: 0.85rem;
        }

        .calc-total {
          border-top: 1px solid var(--color-border);
          padding-top: 10px;
          margin-top: 4px;
        }

        .total-label {
          font-weight: 600;
          font-size: 1rem;
        }

        .total-value {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text-dark);
        }

        .checkout-btn {
          width: 100%;
          padding: 0.9rem 2rem;
          font-size: 0.9rem;
        }

        /* Checkout Modal styles */
        .checkout-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(43, 43, 43, 0.6);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .checkout-modal-card {
          background-color: var(--color-bg-white);
          border-radius: var(--radius-sm);
          width: 100%;
          max-width: 480px;
          padding: 2rem;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          color: var(--color-text-muted);
          transition: var(--transition-fast);
        }

        .modal-close:hover {
          color: var(--color-brand);
        }

        .modal-heading {
          font-size: 1.5rem;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 8px;
        }

        .section-title {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          color: var(--color-text-muted);
        }

        .success-checkmark-outer {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--color-brand-light);
          border: 2px dashed var(--color-brand);
        }

        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </>
  );
}

// Simple empty shopping bag icon helper component
function ShoppingBagIconEmpty() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="48" 
      height="48" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="var(--color-border)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ marginBottom: '1rem' }}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}
