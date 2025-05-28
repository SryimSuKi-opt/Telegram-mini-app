import React, { useState, useEffect } from 'react';
import { WebApp } from '@twa-dev/sdk';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import { getProducts } from './services/productService';

const App = () => {
  const [view, setView] = useState('products'); // products, detail, cart, checkout, confirmation
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set Telegram WebApp theme
  useEffect(() => {
    // Set the header color to match Telegram theme
    document.body.style.backgroundColor = WebApp.backgroundColor;
    document.body.style.color = WebApp.textColor;
    
    // Load products
    fetchProducts();
    
    // Setup back button handler
    WebApp.BackButton.onClick(() => handleBackButton());
    
    // Enable closing confirmation
    WebApp.enableClosingConfirmation();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from Firebase
      const productData = await getProducts();
      setProducts(productData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleBackButton = () => {
    if (view === 'detail') {
      setView('products');
      WebApp.BackButton.hide();
    } else if (view === 'cart') {
      setView('products');
      WebApp.BackButton.hide();
    } else if (view === 'checkout') {
      setView('cart');
    } else if (view === 'confirmation') {
      setView('products');
      WebApp.BackButton.hide();
    }
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setView('detail');
    WebApp.BackButton.show();
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    
    WebApp.HapticFeedback.notificationOccurred('success');
  };

  const updateCartItem = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity } 
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    WebApp.HapticFeedback.notificationOccurred('warning');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToCheckout = () => {
    setView('checkout');
    WebApp.BackButton.show();
  };

  const placeOrder = (customerInfo) => {
    // In a real app, this would send the order to Firebase
    const newOrder = {
      id: `ORDER-${Date.now()}`,
      items: cart,
      total: calculateTotal(),
      customer: customerInfo,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    setOrder(newOrder);
    setCart([]);
    setView('confirmation');
    WebApp.BackButton.show();
    WebApp.HapticFeedback.notificationOccurred('success');
  };

  const renderView = () => {
    switch (view) {
      case 'products':
        return <ProductList 
                products={products} 
                onProductClick={viewProduct} 
                loading={loading} 
              />;
      case 'detail':
        return <ProductDetail 
                product={selectedProduct} 
                onAddToCart={addToCart} 
              />;
      case 'cart':
        return <Cart 
                items={cart} 
                onUpdateQuantity={updateCartItem} 
                onRemoveItem={removeFromCart} 
                total={calculateTotal()} 
                onCheckout={proceedToCheckout} 
              />;
      case 'checkout':
        return <Checkout 
                items={cart} 
                total={calculateTotal()} 
                onPlaceOrder={placeOrder} 
              />;
      case 'confirmation':
        return <OrderConfirmation order={order} />;
      default:
        return <ProductList 
                products={products} 
                onProductClick={viewProduct} 
                loading={loading} 
              />;
    }
  };

  return (
    <div className="app">
      <Header 
        cartItemCount={cart.length} 
        onCartClick={() => setView('cart')} 
        currentView={view}
      />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
