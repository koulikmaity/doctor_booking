import React, { useState } from "react";
import { addDoctor } from "../services/doctorService";

function AddDoctor() {

  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    experience: "",
    availableFrom: "",
    availableTo: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addDoctor(doctor);

      alert("Doctor Added Successfully ✅");

      setDoctor({
        name: "",
        specialization: "",
        experience: "",
        availableFrom: "",
        availableTo: "",
        imageUrl: "",
      });

    } catch (err) {

      console.error(err);

      alert("Failed to add doctor ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #e0f2fe, #f8fafc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background: "#fff",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#0f172a",
            fontSize: "32px",
          }}
        >
          Add Doctor
        </h2>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Doctor Name</label>

            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              placeholder="e.g. Dr Raj Sharma"
              required
              style={inputStyle}
            />
          </div>

          {/* SPECIALIZATION */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Specialization</label>

            <input
              type="text"
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
              placeholder="e.g. Cardiologist"
              required
              style={inputStyle}
            />
          </div>

          {/* EXPERIENCE */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Experience</label>

            <input
              type="number"
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              placeholder="e.g. 10 years"
              required
              style={inputStyle}
            />
          </div>

          {/* AVAILABLE FROM */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Available From</label>

            <input
              type="time"
              name="availableFrom"
              value={doctor.availableFrom}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* AVAILABLE TO */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Available To</label>

            <input
              type="time"
              name="availableTo"
              value={doctor.availableTo}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* IMAGE URL */}
          <div style={{ marginBottom: "25px" }}>
            <label style={labelStyle}>Doctor Image URL</label>

            <input
              type="text"
              name="imageUrl"
              value={doctor.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={inputStyle}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              background:
                "linear-gradient(to right, #0ea5e9, #2563eb)",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#334155",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default AddDoctor;