import React from "react";
import { useInView } from "react-intersection-observer";

function ServiceCard({ service, isActive, onToggle }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      onClick={onToggle}
      style={{
        backgroundImage: `url(${service.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "12px",
        padding: "20px",
        color: "#fff",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s ease-out",
        position: "relative",
        height: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",

      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
      maxHeight: "80%",
      overflowY: "auto",

        }}
      >
        <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>{service.title}</h3>
        {isActive && (
      <p style={{ fontSize: "14px", lineHeight: "1.5" }}>{service.description}</p>
    )}
      </div>
    </div>
  );
}

export default ServiceCard;