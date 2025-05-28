// ABA Payway API service for payment integration
// This is a mock implementation for development
// In production, this would connect to the actual ABA Payway API

export const generatePaymentQR = async (orderData) => {
  // In production, this would make a real API call to your backend
  // which would then call the ABA Payway QR API
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        // Mock response that mimics ABA Payway API response
        const response = {
          status: 'success',
          qrCode: 'https://via.placeholder.com/300x300?text=KHQR+Payment',
          transactionId: `TXN-${Date.now()}`,
          amount: orderData.total,
          currency: 'USD',
          expiryTime: new Date(Date.now() + 15 * 60000).toISOString(), // 15 minutes from now
        };
        resolve(response);
      } catch (error) {
        reject(new Error('Failed to generate payment QR code'));
      }
    }, 1500);
  });
};

export const checkPaymentStatus = async (transactionId) => {
  // In production, this would make a real API call to check payment status
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Mock response - in production this would be the actual status from ABA Payway
      const response = {
        status: 'success',
        paymentStatus: 'completed',
        transactionId: transactionId,
        paymentTime: new Date().toISOString()
      };
      resolve(response);
    }, 1000);
  });
};

export const cancelPayment = async (transactionId) => {
  // In production, this would make a real API call to cancel a payment
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Mock response
      const response = {
        status: 'success',
        message: 'Payment cancelled successfully'
      };
      resolve(response);
    }, 800);
  });
};
