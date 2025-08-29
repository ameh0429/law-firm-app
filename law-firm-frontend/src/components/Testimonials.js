// components/Testimonials.js
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Ameh Mathias",
    feedback:
      "The team at Big Palm Legal handled my case with professionalism and genuine care. They explained every step clearly, kept me updated, and fought tirelessly for the best outcome. I’m grateful for their dedication and would highly recommend them to anyone seeking reliable legal support.",
  },
  {
    id: 2,
    name: "Ochapa Dominic",
    feedback: "I cannot thank Big Palm Legal Group enough. They fought for me when I felt powerless and made sure my voice was heard. Truly outstanding service.",
  },
  {
    id: 3,
    name: "Eraga Russel",
    feedback: "Professional, compassionate, and incredibly skilled — that’s how I’d describe the team at Big Palm Legal. They turned a stressful legal battle into a manageable process.",
  },
];

function Testimonials() {
  return (
    <section className="section testimonials">
      <h2>Client Testimonials</h2>
      <div className="testimonial-list">
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial-card">
            <p className="testimonial-text">"{t.feedback}"</p>
            <p className="testimonial-name">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
