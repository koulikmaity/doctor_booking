import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { getAllDoctors } from "../services/doctorService";

function ExploreDoctors() {

  const [doctors, setDoctors] = useState([]);

  const [selectedSpecialization, setSelectedSpecialization] =
    useState("");

  const [minExperience, setMinExperience] = useState("");

  const [availability, setAvailability] = useState("");

  const [maxFees, setMaxFees] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {

      const res = await getAllDoctors();

      const updatedDoctors = res.data.map((doc) => ({
        ...doc,
        fees: doc.experience * 50,
      }));

      setDoctors(updatedDoctors);

    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 FILTER LOGIC
  const filteredDoctors = doctors.filter((doc) => {

  const specializationMatch =
    !selectedSpecialization ||
    doc.specialization
      .toLowerCase()
      .includes(
        selectedSpecialization.toLowerCase()
      );

  const experienceMatch =
    !minExperience ||
    doc.experience >= Number(minExperience);

  // ✅ TIME FILTER FIX
  const availabilityMatch =
    !availability ||
    (
      availability.padStart(5, "0") >=
        doc.availableFrom.padStart(5, "0") &&
      availability.padStart(5, "0") <=
        doc.availableTo.padStart(5, "0")
    );

  const feesMatch =
    !maxFees ||
    doc.fees <= Number(maxFees);

  return (
    specializationMatch &&
    experienceMatch &&
    availabilityMatch &&
    feesMatch
  );
});

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.hero}>
        <h1 style={styles.heading}>
          Explore Doctors
        </h1>

        <p style={styles.subHeading}>
          Find the best specialists based on
          experience, fees and availability.
        </p>
      </div>

      <div style={styles.mainLayout}>

        {/* SIDEBAR */}
        <div style={styles.sidebar}>

          <h2 style={styles.filterTitle}>
            🔍 Filters
          </h2>

          {/* SPECIALIZATION */}
          <div style={styles.filterGroup}>
            <label style={styles.label}>
              Specialization
            </label>

            <select
              style={styles.input}
              value={selectedSpecialization}
              onChange={(e) =>
                setSelectedSpecialization(e.target.value)
              }
            >
              <option value="">All</option>

              {[
                ...new Set(
                  doctors.map((doc) => doc.specialization)
                ),
              ].map((specialization) => (
                <option
                  key={specialization}
                  value={specialization}
                >
                  {specialization}
                </option>
              ))}
            </select>
          </div>

          {/* EXPERIENCE */}
          <div style={styles.filterGroup}>
            <label style={styles.label}>
              Minimum Experience
            </label>

            <input
              type="number"
              placeholder="5 years"
              style={styles.input}
              value={minExperience}
              onChange={(e) =>
                setMinExperience(e.target.value)
              }
            />
          </div>

          {/* FEES */}
          <div style={styles.filterGroup}>
            <label style={styles.label}>
              Max Fees
            </label>

            <input
              type="number"
              placeholder="₹1000"
              style={styles.input}
              value={maxFees}
              onChange={(e) =>
                setMaxFees(e.target.value)
              }
            />
          </div>

          {/* AVAILABILITY */}
          <div style={styles.filterGroup}>
            <label style={styles.label}>
              Available Time
            </label>

            <input
              type="time"
              style={styles.input}
              value={availability}
              onChange={(e) =>
                setAvailability(e.target.value)
              }
            />
          </div>

          {/* RESET */}
          <button
            style={styles.resetBtn}
            onClick={() => {
              setSelectedSpecialization("");
              setMinExperience("");
              setAvailability("");
              setMaxFees("");
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div style={styles.rightContent}>

          <div style={styles.resultHeader}>
            <h2>
              Available Doctors
            </h2>

            <p>
              {filteredDoctors.length} doctors found
            </p>
          </div>

          <div style={styles.container}>
            {filteredDoctors.map((doc) => (
              <div key={doc.id}>
                <DoctorCard doctor={doc} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {

  page: {
    background: "#f4f7fb",
    minHeight: "100vh",
    paddingBottom: "50px",
  },

  hero: {
    background:
      "linear-gradient(135deg, #0f172a, #1976d2)",
    padding: "60px",
    color: "#fff",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  },

  heading: {
    fontSize: "48px",
    marginBottom: "15px",
  },

  subHeading: {
    fontSize: "18px",
    opacity: 0.9,
  },

  mainLayout: {
    display: "flex",
    gap: "30px",
    padding: "40px 60px",
    alignItems: "flex-start",
  },

  sidebar: {
    width: "280px",
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    position: "sticky",
    top: "100px",
  },

  filterTitle: {
    marginBottom: "25px",
    color: "#0f172a",
  },

  filterGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #dbeafe",
    background: "#f8fafc",
    outline: "none",
    fontSize: "14px",
  },

  resetBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#1976d2",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },

  rightContent: {
    flex: 1,
  },

  resultHeader: {
    marginBottom: "25px",
  },

  container: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "65px",
  },
};

export default ExploreDoctors;