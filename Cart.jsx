import React from 'react';

const Cart = ({ items, onUpdateQuantity, onRemoveItem, total, onCheckout }) => {
  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <p>Your cart is empty</p>
        <p>Add some products to your cart to continue shopping</p>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img 
            src={item.image} 
            alt={item.name} 
            className="cart-item-image" 
          />
          <div className="cart-item-details">
            <div>
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <button 
                className="cart-quantity-button" 
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="cart-quantity-value">{item.quantity}</span>
              <button 
                className="cart-quantity-button" 
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button 
                className="cart-quantity-button" 
                style={{ marginLeft: '8px' }}
                onClick={() => onRemoveItem(item.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <button className="checkout-button" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
