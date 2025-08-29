import React, { useState } from 'react';

function Booking() {
  const [form, setForm] = useState({ name: '', date: '', time: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Appointment booked for ${form.name} on ${form.date} at ${form.time}`);
    setForm({ name: '', date: '', time: '' });
  };

  return (
    <section className="section booking">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="time" type="time" value={form.time} onChange={handleChange} required />
        <button type="submit">Confirm Booking</button>
      </form>
    </section>
  );
}

export default Booking;