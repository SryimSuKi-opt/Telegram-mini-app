import React, { useState } from 'react';
import { WebApp } from '@twa-dev/sdk';

const PaymentProcessor = ({ order, onPaymentComplete, onPaymentCancel }) => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, completed, failed

  // In a real implementation, this would call the backend API
  const generatePaymentQR = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call to ABA Payway
      // In production, this would be a real API call to your backend
      // which would then call the ABA Payway API
      setTimeout(() => {
        // Mock QR code URL - in production this would come from ABA Payway
        const mockQrCodeUrl = 'https://via.placeholder.com/300x300?text=KHQR+Payment';
        setQrCode(mockQrCodeUrl);
        setPaymentStatus('processing');
        setLoading(false);
        
        // Simulate payment verification
        // In production, this would be handled by webhooks or polling
        setTimeout(() => {
          setPaymentStatus('completed');
          onPaymentComplete({
            transactionId: `TXN-${Date.now()}`,
            amount: order.total,
            date: new Date().toISOString()
          });
        }, 5000);
      }, 2000);
      
    } catch (err) {
      setError('Failed to generate payment QR code. Please try again.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (paymentStatus === 'processing') {
      // In production, you might want to cancel the payment request
      setPaymentStatus('pending');
    }
    onPaymentCancel();
  };

  return (
    <div className="payment-processor">
      <h2 className="payment-title">Payment</h2>
      
      {paymentStatus === 'pending' && (
        <div className="payment-options">
          <p className="payment-description">
            Please select your preferred payment method:
          </p>
          
          <button 
            className="payment-option-button"
            onClick={generatePaymentQR}
            disabled={loading}
          >
            Pay with KHQR / ABA Payway
          </button>
          
          {error && <p className="payment-error">{error}</p>}
        </div>
      )}
      
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Generating payment QR code...</p>
        </div>
      )}
      
      {paymentStatus === 'processing' && qrCode && (
        <div className="qr-payment">
          <p className="payment-instruction">
            Scan this QR code with your ABA mobile app or any KHQR compatible payment app
          </p>
          
          <div className="qr-container">
            <img src={qrCode} alt="Payment QR Code" className="qr-image" />
          </div>
          
          <div className="payment-details">
            <p><strong>Amount:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Order ID:</strong> {order.id}</p>
          </div>
          
          <p className="payment-note">
            Please do not close this window until payment is complete
          </p>
          
          <button 
            className="cancel-payment-button"
            onClick={handleCancel}
          >
            Cancel Payment
          </button>
        </div>
      )}
      
      {paymentStatus === 'completed' && (
        <div className="payment-success">
          <div className="success-icon">✅</div>
          <h3>Payment Successful!</h3>
          <p>Your payment has been processed successfully.</p>
        </div>
      )}
      
      {paymentStatus === 'failed' && (
        <div className="payment-failed">
          <div className="failed-icon">❌</div>
          <h3>Payment Failed</h3>
          <p>There was an issue processing your payment. Please try again.</p>
          <button 
            className="retry-payment-button"
            onClick={generatePaymentQR}
          >
            Retry Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentProcessor;
