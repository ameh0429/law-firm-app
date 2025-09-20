import React from "react";
import { useInView } from "react-intersection-observer";

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
    feedback:
      "I cannot thank Big Palm Legal Group enough. They fought for me when I felt powerless and made sure my voice was heard. Truly outstanding service.",
  },
  {
    id: 3,
    name: "Eraga Russel",
    feedback:
      "Professional, compassionate, and incredibly skilled — that’s how I’d describe the team at Big Palm Legal. They turned a stressful legal battle into a manageable process.",
  },
];

function Testimonials() {
  const { ref: bannerRef, inView: bannerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="section testimonials" style={{ margin: 0, padding: 0 }}>
      {/* 🔹 Animated Banner Image with Overlay Text */}
      <div
        ref={bannerRef}
        style={{
          width: "100vw",
          height: "350px",
          overflow: "hidden",
          position: "relative",
          opacity: bannerInView ? 1 : 0,
          transform: bannerInView ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s ease-out",
        }}
      >
        <img
          src="/images/feedback.jpg" 
          alt="Blog Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            animation: "zoomInOut 12s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontSize: "48px",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            animation: "pulseText 2s ease-in-out infinite",
            zIndex: 2,
          }}
        >
          Feedback
        </div>
      </div>

      {/* 🔹 Testimonials Section */}
      <div style={{ padding: "40px 20px" }}>
        <h2>Client Testimonials</h2>
        <div className="testimonial-list">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <p className="testimonial-text">"{t.feedback}"</p>
              <p className="testimonial-name">— {t.name}</p>
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

export default Testimonials;