import React, { useState } from 'react';
import { generatePaymentQR, checkPaymentStatus } from '../services/paymentService';

const PaymentIntegration = ({ order, onPaymentComplete, onPaymentCancel }) => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, completed, failed
  const [transactionId, setTransactionId] = useState(null);
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);

  // Generate QR code for payment
  const initiatePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call ABA Payway API to generate QR code
      const response = await generatePaymentQR({
        orderId: order.id,
        total: order.total,
        items: order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      });
      
      setQrCode(response.qrCode);
      setTransactionId(response.transactionId);
      setPaymentStatus('processing');
      
      // Start polling for payment status
      const interval = setInterval(async () => {
        try {
          const statusResponse = await checkPaymentStatus(response.transactionId);
          if (statusResponse.paymentStatus === 'completed') {
            clearInterval(interval);
            setPaymentStatus('completed');
            onPaymentComplete({
              transactionId: response.transactionId,
              amount: order.total,
              date: statusResponse.paymentTime
            });
          } else if (statusResponse.paymentStatus === 'failed') {
            clearInterval(interval);
            setPaymentStatus('failed');
            setError('Payment failed. Please try again.');
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
        }
      }, 3000); // Check every 3 seconds
      
      setStatusCheckInterval(interval);
      setLoading(false);
      
    } catch (err) {
      setError('Failed to generate payment QR code. Please try again.');
      setLoading(false);
    }
  };

  // Cancel payment and clean up
  const handleCancel = () => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    
    if (paymentStatus === 'processing' && transactionId) {
      // In production, you would call an API to cancel the payment
      // cancelPayment(transactionId);
    }
    
    setPaymentStatus('pending');
    setQrCode(null);
    setTransactionId(null);
    onPaymentCancel();
  };

  return (
    <div className="payment-integration">
      <h2 className="payment-title">Complete Your Payment</h2>
      
      {paymentStatus === 'pending' && (
        <div className="payment-options">
          <p className="payment-description">
            Please select your preferred payment method to complete your order:
          </p>
          
          <button 
            className="payment-option-button"
            onClick={initiatePayment}
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
          <p>Preparing your payment...</p>
        </div>
      )}
      
      {paymentStatus === 'processing' && qrCode && (
        <div className="qr-payment">
          <p className="payment-instruction">
            Scan this QR code with your ABA mobile app or any KHQR compatible payment app to complete your payment
          </p>
          
          <div className="qr-container">
            <img src={qrCode} alt="Payment QR Code" className="qr-image" />
          </div>
          
          <div className="payment-details">
            <p><strong>Amount:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Transaction ID:</strong> {transactionId}</p>
          </div>
          
          <p className="payment-note">
            Please do not close this window until payment is complete. The QR code will expire in 15 minutes.
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
          <p>Transaction ID: {transactionId}</p>
        </div>
      )}
      
      {paymentStatus === 'failed' && (
        <div className="payment-failed">
          <div className="failed-icon">❌</div>
          <h3>Payment Failed</h3>
          <p>There was an issue processing your payment. Please try again.</p>
          <button 
            className="retry-payment-button"
            onClick={initiatePayment}
          >
            Retry Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentIntegration;
