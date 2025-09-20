import React from 'react';
import { useInView } from 'react-intersection-observer';

function About() {
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      className="about-section"
      style={{
        backgroundImage: 'url(/images/big-palm-logo.png)', // ✅ Replace with your actual image path
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        // color: '#fff',
        textAlign: 'center',
      }}
    >
      {/* Optional dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: -32,
          // backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      ></div>

      {/* Text Content */}
      <div
        ref={textRef}
        style={{
          zIndex: 2,
          maxWidth: '800px',
          opacity: textInView ? 1 : 0,
          transform: textInView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.5s ease-out',
        }}
      >
        <h3 style={{ fontSize: '32px', marginBottom: '20px' }}>About Us</h3>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Big Palm Legal (BPL) is a full service law firm providing legal services to clients across a broad spectrum of sectors.

          At BPL, we combine our knowledge and expertise to deliver practical and creative solutions, tailor-made to suit each client’s legal and business needs.

          With our office in Lagos, we are centrally located and accessible, not only to our clients in Nigeria but also to those along the West African coast.

          At BPL, we pay attention not only to the finer details of the law but also to all the other issues which have the potential to impact our clients’ businesses.
        </p>
      </div>
    </section>
  );
}

export default About;