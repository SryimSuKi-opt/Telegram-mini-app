import React, { useState } from 'react';

const ProductList = ({ products, onProductClick, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="search-container">
        <input 
          type="text" 
          className="form-input" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="empty-products">
          <p>No products found. Try a different search term.</p>
        </div>
      ) : (
        <div className="product-list">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => onProductClick(product)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image" 
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
