import React, { useState } from 'react';

const ProductDetail = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div className="product-detail">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-detail-image" 
      />
      <h2 className="product-detail-name">{product.name}</h2>
      <p className="product-detail-price">${product.price.toFixed(2)}</p>
      <p className="product-detail-description">{product.description}</p>
      
      <div className="quantity-selector">
        <button className="quantity-button" onClick={decreaseQuantity}>-</button>
        <span className="quantity-value">{quantity}</span>
        <button className="quantity-button" onClick={increaseQuantity}>+</button>
      </div>
      
      <button 
        className="add-to-cart-button"
        onClick={() => onAddToCart(product, quantity)}
      >
        Add to Cart - ${(product.price * quantity).toFixed(2)}
      </button>
    </div>
  );
};

export default ProductDetail;
