import React from 'react';

const Header = ({ cartItemCount, onCartClick, currentView }) => {
  const getTitle = () => {
    switch (currentView) {
      case 'products':
        return 'Product Catalog';
      case 'detail':
        return 'Product Details';
      case 'cart':
        return 'Shopping Cart';
      case 'checkout':
        return 'Checkout';
      case 'confirmation':
        return 'Order Confirmation';
      default:
        return 'E-commerce Store';
    }
  };

  return (
    <header className="header">
      <div className="header-title">{getTitle()}</div>
      {currentView !== 'cart' && currentView !== 'checkout' && currentView !== 'confirmation' && (
        <button className="cart-button" onClick={onCartClick}>
          🛒
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </button>
      )}
    </header>
  );
};

export default Header;
