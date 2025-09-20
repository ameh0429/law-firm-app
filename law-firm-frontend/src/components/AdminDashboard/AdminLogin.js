// // components/AdminLogin.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 

// function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Initialize navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();

//   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         setMessage(data.message || 'Login successful');

//         // Redirect to dashboard
//         console.log('Redirecting to dashboard...');
//         navigate('/admin/dashboard');
//       } else {
//         setMessage(data.message || 'Login failed');
//       }
      
      
//     } catch (err) {
//       console.error('Login error:', err);
//       setMessage('Server error');
//     }
//   };

//   return (
//     <div className="admin-login">
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Admin Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleLogin = async (e) => {
    e.preventDefault();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage(data.message || 'Login successful');
        navigate('/admin/dashboard');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Server error');
    }
  };

  return (
    <section className="admin-login" style={{ margin: 0, padding: 0 }}>
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
          src="/images/admin.jpg" // ✅ Replace with your actual image
          alt="Admin Banner"
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
          Admin
        </div>
      </div>

      {/* 🔹 Centered Login Form */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 350px)',
          padding: '40px 20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
            />
            <button type="submit" style={{ width: '100%', padding: '10px' }}>
              Login
            </button>
          </form>
          {message && <p style={{ marginTop: '15px', textAlign: 'center' }}>{message}</p>}
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

export default AdminLogin;