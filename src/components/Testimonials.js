import React from 'react';

const testimonials = [
  { name: 'Alice', feedback: 'Lex & Partners helped me win my case with professionalism.' },
  { name: 'Michael', feedback: 'Their legal advice was spot-on and timely.' }
];

function Testimonials() {
  return (
    <section className="section">
      <h2>Client Testimonials</h2>
      {testimonials.map((t, index) => (
        <div key={index} className="testimonial">
          <p>"{t.feedback}"</p>
          <p><strong>- {t.name}</strong></p>
        </div>
      ))}
    </section>
  );
}

export default Testimonials;