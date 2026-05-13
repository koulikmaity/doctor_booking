import React, { useEffect, useRef, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { getAllDoctors } from "../services/doctorService";
import { useSearchParams } from "react-router-dom";

function ExploreDoctors() {

const [allDoctors, setAllDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const [minExperience, setMinExperience] = useState("");

  const [availability, setAvailability] = useState("");

  const [maxFees, setMaxFees] = useState("");

  const [allSpecializations, setAllSpecializations] = useState([]);


  const [searchParams, setSearchParams] = useSearchParams();




  // ---------------- LOAD MASTER DATA (dropdown only) ----------------
  useEffect(() => {
    const loadInitialData = async () => {
      const res = await getAllDoctors(); // NO FILTERS

      const specs = [...new Set(res.data.map(d => d.specialization))];
      setAllSpecializations(specs);
    };

    loadInitialData();
  }, []);

  // ---------------- SYNC URL → STATE ----------------
  useEffect(() => {
    const spec = searchParams.get("specialization") || "";
    const exp = searchParams.get("experience") || "";
    const fees = searchParams.get("fees") || "";
    const avail = searchParams.get("availability") || "";

    setSelectedSpecialization(spec);
    setMinExperience(exp);
    setMaxFees(fees);
    setAvailability(avail);

    fetchDoctors(spec, exp, fees, avail);
  }, [searchParams]);

  // ---------------- FETCH ----------------
  const fetchDoctors = async (spec, exp, fees, avail) => {
    const params = {};

    if (spec) params.specialization = spec;
    if (exp) params.experience = exp;
    if (fees) params.maxFees = fees;
    if (avail) params.availability = avail;

    const res = await getAllDoctors(params);

    setDoctors(
      res.data.map(doc => ({
        ...doc,
        fees: doc.experience * 50,
      }))
    );
  };

  // ---------------- UPDATE URL ----------------
  const updateURL = (filters) => {
    const params = {};

    if (filters.specialization) params.specialization = filters.specialization;
    if (filters.experience) params.experience = filters.experience;
    if (filters.fees) params.fees = filters.fees;
    if (filters.availability) params.availability = filters.availability;

    setSearchParams(params);
  };

  // ---------------- HANDLERS ----------------
  const handleSpecialization = (value) => {
    setSelectedSpecialization(value);

    updateURL({
      specialization: value,
      experience: minExperience,
      fees: maxFees,
      availability,
    });
  };

  const handleExperience = (value) => {
    setMinExperience(value);

    updateURL({
      specialization: selectedSpecialization,
      experience: value,
      fees: maxFees,
      availability,
    });
  };

  const handleFees = (value) => {
    setMaxFees(value);

    updateURL({
      specialization: selectedSpecialization,
      experience: minExperience,
      fees: value,
      availability,
    });
  };

  const handleAvailability = (value) => {
    setAvailability(value);

    updateURL({
      specialization: selectedSpecialization,
      experience: minExperience,
      fees: maxFees,
      availability: value,
    });
  };

  // ---------------- RESET ----------------
  const resetFilters = () => {
    setSearchParams({}); // ONLY THIS triggers everything cleanly
  };










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
                handleSpecialization(e.target.value)
              }
            >
              <option value="">All</option>
              {allSpecializations.map((specialization) => (
                <option key={ specialization} value={specialization} >
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
                handleExperience(e.target.value)
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
                handleFees(e.target.value)
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
            onClick={resetFilters}
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
              {doctors.length} doctors found
            </p>
          </div>

          <div style={styles.container}>
            {doctors.map((doc) => (
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