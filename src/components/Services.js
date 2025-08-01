import React from 'react';

const services = [
  {
    title: 'Criminal Law',
    description: 'Defending your rights with experience and integrity.'
  },
  {
    title: 'Family Law',
    description: 'Compassionate support in divorce, custody, and more.'
  },
  {
    title: 'Corporate Law',
    description: 'Protecting your business interests legally and ethically.'
  }
];

function Services() {
  return (
    <section className="section services">
      <h2>Our Practice Areas</h2>
      <div className="service-cards">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;