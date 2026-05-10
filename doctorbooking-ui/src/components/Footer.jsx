

import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      {/* TOP SECTION */}
      <div style={styles.container}>

        {/* BRAND */}
        <div style={styles.section}>
          <h2 style={styles.logo}>🏥 DocBook</h2>

          <p style={styles.desc}>
            Book appointments with trusted doctors and
            healthcare specialists instantly from anywhere.
          </p>

          <div style={styles.socials}>
            <span style={styles.icon}>🌐</span>
            <span style={styles.icon}>📘</span>
            <span style={styles.icon}>📸</span>
            <span style={styles.icon}>💼</span>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Quick Links</h3>

          <Link to="/" style={styles.link}>
            Home
          </Link>

          <Link to="/explore" style={styles.link}>
            Explore Doctors
          </Link>

          <Link to="/appointments" style={styles.link}>
            My Appointments
          </Link>

          {/* CLASSY ADD DOCTOR BUTTON */}
          <a
            href="/add-doctor"
            target="_blank"
            rel="noreferrer"
            style={styles.addDoctorBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-4px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 15px 30px rgba(37,99,235,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.12)";
            }}
          >
            <div style={styles.plusCircle}>+</div>

            <span style={styles.addDoctorText}>
              Add Doctor
            </span>
          </a>
        </div>

        {/* CONTACT */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Contact Us</h3>

          <p style={styles.contact}>
            📧 support@doctorbooking.com
          </p>

          <p style={styles.contact}>
            📞 +91 9876543210
          </p>

          <p style={styles.contact}>
            📍 Kolkata, India
          </p>
        </div>

        {/* NEWSLETTER */}
        <div style={styles.section}>
          <h3 style={styles.heading}>Stay Updated</h3>

          <p style={styles.desc}>
            Get latest healthcare updates and doctor
            availability notifications.
          </p>

          <div style={styles.subscribeBox}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
            />

            <button style={styles.subscribeBtn}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        © 2026 DocBook. All rights reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
    marginTop: "80px",
    paddingTop: "60px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    boxShadow: "0 -5px 20px rgba(0,0,0,0.1)",
  },

  container: {
    maxWidth: "1300px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    padding: "0 40px 50px",
  },

  section: {
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    color: "#60a5fa",
    marginBottom: "15px",
    fontSize: "30px",
  },

  heading: {
    marginBottom: "18px",
    fontSize: "20px",
    color: "#fff",
  },

  desc: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "15px",
  },

  socials: {
    display: "flex",
    gap: "14px",
    marginTop: "20px",
  },

  icon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
    transition: "0.3s",
  },

  link: {
    textDecoration: "none",
    color: "#cbd5e1",
    marginBottom: "12px",
    fontSize: "15px",
    transition: "0.3s",
  },

  contact: {
    color: "#cbd5e1",
    marginBottom: "14px",
    fontSize: "15px",
  },

  subscribeBox: {
    display: "flex",
    marginTop: "15px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "12px",
    overflow: "hidden",
  },

  input: {
    flex: 1,
    padding: "14px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#fff",
  },

  subscribeBtn: {
    padding: "14px 18px",
    border: "none",
    background: "#1976d2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },

  /* CLASSY ADD DOCTOR BUTTON */

  addDoctorBtn: {
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 20px",
    borderRadius: "18px",
    textDecoration: "none",
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    transition: "0.35s ease",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    width: "fit-content",
  },

  plusCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700",
    backdropFilter: "blur(10px)",
  },

  addDoctorText: {
    letterSpacing: "0.5px",
  },

  bottom: {
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    color: "#94a3b8",
    fontSize: "14px",
  },
};

export default Footer;