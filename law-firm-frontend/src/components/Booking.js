import { useState } from 'react';
import Paystack from './PayStack.js';

function Booking() {
  const [form, setForm] = useState({ name: '', date: '', time: '', email: '' });
  const setPaymentConfirmed = useState(false);
  const amount = 100000; // ₦100000 consultation fee

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
    <section className="section booking">
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
    </section>
  );
}

export default Booking;