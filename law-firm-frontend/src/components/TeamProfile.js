import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function TeamProfile() {
  const { teamId } = useParams();
  const [member, setMember] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/team/${teamId}`)
      .then(res => res.json())
      .then(data => setMember(data.data))
      .catch(err => console.error('Error fetching profile:', err));
  }, [teamId]);

  if (!member) return <p>Loading profile...</p>;

  return (
    <section
      className="team-profile"
      style={{
        backgroundImage: 'url(/images/big-palm-logo.png)', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Optional overlay for readability */}
      <div
        style={{
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '800px',
        }}
      >
        <img
          src={member.photoUrl}
          alt={member.name}
          className="profile-photo"
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        />
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>{member.name}</h2>
        <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>{member.specialty}</p>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>{member.bio}</p>
      </div>
    </section>
  );
}

export default TeamProfile;