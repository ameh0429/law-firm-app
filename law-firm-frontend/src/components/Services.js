import React, { useState } from "react";

const services = [
  {
    title: "Criminal Law",
    description:"We have experience in the ICT industry with emphasis on the legal.",
  },
  {
    title: "Family Law",
    description: "Compassionate support in divorce, custody, and more.",
  },
  {
    title: "Corporate Law",
    description: "Protecting your business interests legally and ethically.",
  },
];

function Services() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section services">
      <h2>Our Practice Areas</h2>
      <div className="service-cards">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => toggle(index)}
          >
            <h3>{service.title}</h3>
            {activeIndex === index && <p>{service.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
