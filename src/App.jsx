import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Customizer from './pages/Customizer';

export default function App() {
  // Routing State
  const [currentPage, setCurrentPage] = useState('home');
  const [routeParams, setRouteParams] = useState({});

  // Cart & Wishlist State (persisted via localStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('derosa_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('derosa_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('derosa_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('derosa_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Page Routing handler
  const handlePageChange = (page, params = {}) => {
    setCurrentPage(page);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Handlers
  const handleAddCart = (newItem) => {
    setCart((prevCart) => {
      // Find if exact same product with same details already exists
      const existingItemIndex = prevCart.findIndex((item) => {
        if (item.id !== newItem.id) return false;
        // Check details matching
        if (!item.details || !newItem.details) return item.id === newItem.id;
        return (
          item.details.metal === newItem.details.metal &&
          item.details.size === newItem.details.size &&
          item.details.carat === newItem.details.carat
        );
      });

      if (existingItemIndex > -1) {
        // Increment quantity
        const updated = [...prevCart];
        updated[existingItemIndex].quantity += 1;
        return updated;
      } else {
        // Add new item
        const itemWithId = {
          ...newItem,
          cartId: newItem.cartId || `item-${Date.now()}`
        };
        return [...prevCart, itemWithId];
      }
    });
  };

  const handleUpdateQty = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prevCart) => 
      prevCart.map((item) => item.cartId === cartId ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveItem = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handler
  const handleAddWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  // Count totals
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-wrapper flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Shared Site Header */}
      <Header 
        cartCount={totalCartCount} 
        wishlistCount={wishlist.length} 
        onPageChange={handlePageChange}
        onOpenCart={() => setIsCartOpen(true)}
        currentPage={currentPage}
      />

      {/* Main Content Pages Router */}
      <main className="app-main-content" style={{ flex: '1 0 auto' }}>
        {currentPage === 'home' && (
          <Home 
            onPageChange={handlePageChange} 
            onAddWishlist={handleAddWishlist}
            wishlist={wishlist}
          />
        )}
        
        {currentPage === 'shop' && (
          <Shop 
            filters={routeParams} 
            onPageChange={handlePageChange}
            onAddWishlist={handleAddWishlist}
            wishlist={wishlist}
          />
        )}
        
        {currentPage === 'product-detail' && (
          <ProductDetail 
            productId={routeParams.productId}
            onAddCart={handleAddCart}
            onAddWishlist={handleAddWishlist}
            wishlist={wishlist}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
        
        {currentPage === 'customizer' && (
          <Customizer 
            onAddCart={handleAddCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
      </main>

      {/* Shared Shopping bag Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Shared Site Footer */}
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}
