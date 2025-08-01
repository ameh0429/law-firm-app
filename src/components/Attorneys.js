import React from 'react';

const lawyers = [
  {
    name: 'Ameh Ameh Jnr',
    specialty: 'Corporate Law',
    bio: '15 years of experience in mergers and acquisitions.',
    photo: '/images/ameh jnr.jpeg'

  },
  {
    name: 'John Smith',
    specialty: 'Family Law',
    bio: 'Expert in custody and divorce cases.',
    photo: 'https://via.placeholder.com/150'
  }
];

function Attorneys() {
  return (
    <section className="section">
      <h2>Meet Our Attorneys</h2>
      <div className="profiles">
        {lawyers.map((lawyer, index) => (
          <div key={index} className="profile">
            <img src={lawyer.photo} alt={lawyer.name} />
            <h3>{lawyer.name}</h3>
            <p><strong>{lawyer.specialty}</strong></p>
            <p>{lawyer.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Attorneys;