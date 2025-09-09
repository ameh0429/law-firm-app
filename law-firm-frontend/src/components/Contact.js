import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } else {
      alert(data.message || 'Failed to send message');
    }
  } catch (err) {
    console.error('Error sending message:', err);
    alert('Server error');
  }
};

  return (
    <section className="section contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;