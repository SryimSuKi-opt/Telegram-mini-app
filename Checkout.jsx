import React, { useState } from 'react';

const Checkout = ({ items, total, onPlaceOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(formData);
  };
  
  const isFormValid = () => {
    return formData.name && formData.phone && formData.address && formData.city;
  };
  
  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Delivery Address</label>
          <input
            type="text"
            name="address"
            className="form-input"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-input"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Additional Notes</label>
          <textarea
            name="notes"
            className="form-input"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <div className="order-summary">
          <h3 className="order-summary-title">Order Summary</h3>
          {items.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="place-order-button"
          disabled={!isFormValid()}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
