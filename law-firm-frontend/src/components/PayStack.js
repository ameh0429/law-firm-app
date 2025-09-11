import React from 'react';

function Paystack({ email, amount, metadata, onSuccess }) {
  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      currency: 'NGN',
      metadata,
      callback: function (response) {
        alert(`Payment successful! Reference: ${response.reference}`);

        // Trigger backend verification
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

        fetch(`${API_BASE_URL}/api/paystack/verify/${response.reference}`)
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log('Payment verified:', data.data);
              if (onSuccess) onSuccess(response.reference);
            } else {
              console.warn('Payment verification failed:', data.message);
              alert('Payment could not be verified. Please contact support.');
            }
          })
          .catch(err => {
            console.error('Verification error:', err);
            alert('Server error during payment verification.');
          });
      },
      onClose: function () {
        alert('Transaction was not completed');
      },
    });

    handler.openIframe();
  };

  return <button onClick={payWithPaystack}>Pay ₦{amount} & Confirm Booking</button>;
}

export default Paystack;