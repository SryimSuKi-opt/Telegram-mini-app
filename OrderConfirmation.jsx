import React from 'react';

const OrderConfirmation = ({ order }) => {
  if (!order) {
    return <div>No order information available</div>;
  }
  
  return (
    <div className="confirmation-container">
      <div className="confirmation-icon">✅</div>
      <h2 className="confirmation-title">Order Placed Successfully!</h2>
      <p className="confirmation-message">
        Thank you for your order. We will process it as soon as possible.
      </p>
      
      <div className="order-id">
        <strong>Order ID:</strong> {order.id}
      </div>
      
      <div className="order-summary">
        <h3 className="order-summary-title">Order Summary</h3>
        {order.items.map(item => (
          <div key={item.id} className="order-item">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="order-total">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <p className="confirmation-message" style={{ marginTop: '24px' }}>
        You will receive a payment confirmation shortly.
      </p>
    </div>
  );
};

export default OrderConfirmation;
