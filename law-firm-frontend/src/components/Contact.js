import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.2 });

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
    <section className="section contact" style={{ margin: 0, padding: 0 }}>
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
          src="/images/contact-us.jpg"
          alt="Contact Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            animation: 'zoomInOut 10s ease-in-out infinite',
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
          Let’s Talk
        </div>
      </div>

      {/* 🔹 Contact Form + Address Side by Side */}
      <div style={{ padding: '40px 220px' }}>
        <h2>Contact Us</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ flex: 1, minWidth: '300px' }}
          >
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
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>

          {/* Address */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3>Our Office</h3>
            <p>
              Big Palm Legal<br />
              64 Thomas Animashaun Street<br />
              Aguda Surulere, Lagos<br />
              Nigeria<br />
              Phone: +234 703 429 6575<br />
              Email: bigpalmlegal@gmail.com
            </p>
          </div>
        </div>
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

export default Contact;