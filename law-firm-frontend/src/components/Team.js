import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="section team">
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
    </section>
  );
}

export default Team;