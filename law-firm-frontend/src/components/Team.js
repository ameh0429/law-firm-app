import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/team`)
      .then(res => res.json())
      .then(data => {
        setTeam(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching team:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading team members...</p>;

  return (
    <section className="section team" style={{ margin: 0, padding: 0 }}>
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
          src="/images/team-logo.jpg"
          alt="Team Banner"
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
          Our Dynamic Team
        </div>
      </div>

      {/* 🔹 Team Grid */}
      <div style={{ padding: '40px 20px' }}>
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {team.map(member => (
            <div key={member._id} className="team-card">
              <img
                src={member.photoUrl || 'https://via.placeholder.com/150'}
                alt={member.name}
                className="team-photo"
              />
              <h3>{member.name}</h3>
              <p><strong>{member.specialty}</strong></p>
              <Link to={`/team/${member._id}`}>
                <button className="view-profile-btn">View Profile</button>
              </Link>
            </div>
          ))}
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

export default Team;