// components/Team.js
import React from 'react';
import { Link } from 'react-router-dom';

const team = [
  {
    id: 'ameh-jnr',
    name: 'Ameh Ameh Jnr esq.',
    specialty: 'Corporate Law',
    bio: '15 years of experience in mergers and acquisitions.',
    photo: '/images/ameh jnr.jpeg' 
  },
  {
    id: 'jane-doe',
    name: 'Jane Doe',
    specialty: 'Family Law',
    bio: 'Expert in custody and divorce cases.',
    photo: 'https://via.placeholder.com/150'
  }
];

function Team() {
  return (
    <section className="section team">
      <h2>Meet Our Team</h2>
      <div className="profiles">
        {team.map(team => (
          <div key={team.id} className="profile">
            <img src={team.photo} alt={team.name} />
            <h3>{team.name}</h3>
            <p><strong>{team.specialty}</strong></p>
            <Link to={`/team/${team.id}`}>
              <button className="view-button">View Profile</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;