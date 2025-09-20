import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Paystack from './PayStack.js';

function Booking() {
  const [form, setForm] = useState({ name: '', date: '', time: '', email: '' });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const amount = 50000; // ₦50000 consultation fee

  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${API_BASE_URL}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Booking confirmed!');
        setForm({ name: '', date: '', time: '', email: '' });
        setPaymentConfirmed(false);
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Server error');
    }
  };

  const handlePaymentSuccess = reference => {
    console.log('Payment successful:', reference);
    setPaymentConfirmed(true);
    handleSubmit(); // Submit booking after payment
  };

  const metadata = {
    custom_fields: [
      { display_name: "Name", variable_name: "name", value: form.name },
      { display_name: "Date", variable_name: "date", value: form.date },
      { display_name: "Time", variable_name: "time", value: form.time }
    ]
  };

  return (
    <section className="section booking" style={{ margin: 0, padding: 0 }}>
      {/* 🔹 Animated Banner Image with Overlay Text */}
      <div
        ref={bannerRef}
        style={{
          width: '100vw',
          height: '350px',
          overflow: 'hidden',
          position: 'relative',
          opacity: bannerInView ? 1 : 0,
          transform: bannerInView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s ease-out',
        }}
      >
        <img
          src="/images/booking.jpg"
          alt="Booking Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            animation: 'zoomInOut 12s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontSize: '48px',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            animation: 'pulseText 2s ease-in-out infinite',
            zIndex: 2,
          }}
        >
          Booking
        </div>
      </div>

      {/* 🔹 Booking Form */}
      <div style={{ padding: '40px 20px' }}>
        <h2>Book an Appointment</h2>
        <form onSubmit={e => e.preventDefault()}>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <Paystack
            email={form.email}
            amount={amount}
            metadata={metadata}
            onSuccess={handlePaymentSuccess}
          />
        </form>
      </div>

      {/* 🔹 Animation Styles */}
      <style>
        {`
          @keyframes pulseText {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }

          @keyframes zoomInOut {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </section>
  );
}

export default Booking;