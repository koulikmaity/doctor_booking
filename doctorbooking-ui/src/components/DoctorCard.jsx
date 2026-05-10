import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 10px rgba(0,0,0,0.1)";
      }}
    >
      {/* Top Section */}
      <div style={styles.topBar}></div>

      <img
        src={
          doctor.imageUrl ||
          "https://randomuser.me/api/portraits/men/1.jpg"
        }
        alt="doctor"
        style={styles.image}
        onError={(e) => {
          e.target.src =
            "https://randomuser.me/api/portraits/men/1.jpg";
        }}
      />

      <h3 style={styles.name}>Dr. {doctor.name}</h3>

      <div style={styles.badge}>
        {doctor.specialization}
      </div>

      <p style={styles.exp}>
        ⭐ {doctor.experience} years experience
      </p>

      <button
        style={styles.button}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/book/${doctor.id}`);
        }}
      >
        Book Appointment
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    height: "300px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: "15px",
    textAlign: "center",
    transition: "0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "6px",
    background: "linear-gradient(90deg, #1976d2, #42a5f5)",
  },

  image: {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    objectFit: "cover",
    marginTop: "20px",
    border: "3px solid #1976d2",
  },

  name: {
    margin: "10px 0 5px",
    color: "#222",
    fontSize: "18px",
    fontWeight: "600",
  },

  badge: {
    display: "inline-block",
    background: "#e3f2fd",
    color: "#1976d2",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    marginTop: "5px",
    fontWeight: "500",
  },

  exp: {
    fontSize: "13px",
    color: "#666",
    marginTop: "8px",
  },

  button: {
    marginTop: "15px",
    padding: "8px 14px",
    background: "linear-gradient(90deg, #1976d2, #42a5f5)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
  },
};

export default DoctorCard;