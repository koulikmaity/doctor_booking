import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById } from "../services/doctorService";
import { getBookedSlots, bookAppointment } from "../services/appointmentService";
import { isLoggedIn } from "../utils/auth";

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      const res = await getDoctorById(doctorId);
      setDoctor(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDate]);

  const fetchBookedSlots = async () => {
    try {
      const res = await getBookedSlots(doctorId, selectedDate);

      const slots = Array.isArray(res)
        ? res
        : res?.data || [];

      setBookedSlots(slots);
    } catch (err) {
      console.error(err);
      setBookedSlots([]);
    }
  };

  // ✅ Generate 30 min slots
  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];

    let start = new Date(`1970-01-01T${startTime}`);
    let end = new Date(`1970-01-01T${endTime}`);

    while (start < end) {
      const next = new Date(start);
      next.setMinutes(start.getMinutes() + 30);

      const startStr = start.toTimeString().slice(0, 5);
      const endStr = next.toTimeString().slice(0, 5);

      slots.push({
        value: startStr,
        label: `${startStr} - ${endStr}`,
      });

      start = next;
    }

    return slots;
  };

  const isPastTime = (date, time) => {
    if (!date) return false;

    const selectedDateTime = new Date(`${date}T${time}`);
    return selectedDateTime < new Date();
  };

  const timeSlots = generateTimeSlots(
    doctor?.availableFrom,
    doctor?.availableTo
  );

  const handleBooking = async () => {
    if (!isLoggedIn()) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select date & time");
      return;
    }

    try {
      // ✅ get logged-in user
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      // ✅ payload
      const payload = {
        userId: user.id,
        doctorId: Number(doctorId),
        appointmentDate: selectedDate,
        timeSlot: selectedTime,
      };

      console.log("BOOK PAYLOAD:", payload);

      await bookAppointment(payload);

      alert("Appointment Booked Successfully ✅");

      setSelectedTime("");

      await fetchBookedSlots();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking Failed ❌");
    }
  };

  if (!doctor) {
    return (
      <div style={styles.loadingContainer}>
        <h2>Loading Doctor Details...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        {/* LEFT CARD */}
        <div style={styles.doctorCard}>
          <img
            src={
              doctor.imageUrl ||
              "https://randomuser.me/api/portraits/men/75.jpg"
            }
            alt="doctor"
            style={styles.image}
          />

          <h2 style={styles.doctorName}>{doctor.name}</h2>

          <p style={styles.specialization}>
            {doctor.specialization}
          </p>

          <div style={styles.infoBox}>
            <p>
              <strong>Experience:</strong>{" "}
              {doctor.experience} Years
            </p>

            <p>
              <strong>Available:</strong>{" "}
              {doctor.availableFrom} -{" "}
              {doctor.availableTo}
            </p>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div style={styles.bookingCard}>
          <h2 style={styles.heading}>
            Book Your Appointment
          </h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Select Appointment Date
            </label>

            <input
              type="date"
              style={styles.input}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
            />
          </div>

          <div style={styles.slotContainer}>
            <h3 style={styles.slotHeading}>
              Available Time Slots
            </h3>

            <div style={styles.slots}>
              {timeSlots.map((slot) => {
                const isBooked = (bookedSlots || []).includes(slot.value);

                const isPast = isPastTime(
                  selectedDate,
                  slot.value
                );

                return (
                  <button
                    key={slot.value}
                    disabled={isBooked || isPast}
                    style={
                      isBooked
                        ? styles.disabledSlot
                        : isPast
                          ? styles.pastSlot
                          : selectedTime === slot.value
                            ? styles.selectedSlot
                            : styles.slot
                    }
                    onClick={() => {
                      if (!isBooked && !isPast) {
                        setSelectedTime(slot.value);
                      }
                    }}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            style={styles.bookBtn}
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #eef2ff, #f8fbff)",
    padding: "40px 20px",
    // padding: "120px 20px 40px",
  },

  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  doctorCard: {
    width: "320px",
    background: "#fff",
    borderRadius: "24px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
  },

  image: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #1976d2",
    marginBottom: "20px",
  },

  doctorName: {
    margin: "0",
    color: "#1a237e",
    fontSize: "28px",
    fontWeight: "700",
  },

  specialization: {
    color: "#1976d2",
    fontSize: "18px",
    marginTop: "8px",
    fontWeight: "600",
  },

  infoBox: {
    marginTop: "25px",
    background: "#f5f8ff",
    borderRadius: "16px",
    padding: "18px",
    lineHeight: "1.8",
    color: "#333",
  },

  bookingCard: {
    flex: 1,
    minWidth: "350px",
    background: "#fff",
    borderRadius: "24px",
    padding: "35px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
  },

  heading: {
    marginBottom: "30px",
    color: "#1a237e",
    fontSize: "30px",
    fontWeight: "700",
  },

  inputGroup: {
    marginBottom: "30px",
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "600",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
  },

  slotContainer: {
    marginTop: "20px",
  },

  slotHeading: {
    marginBottom: "15px",
    color: "#222",
  },

  slots: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },

  slot: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #1976d2",
    background: "#fff",
    color: "#1976d2",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },

  selectedSlot: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #1976d2",
    background: "#1976d2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 5px 15px rgba(25,118,210,0.4)",
  },

  disabledSlot: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    background: "#e0e0e0",
    color: "#777",
    cursor: "not-allowed",
  },

  pastSlot: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "#f2f2f2",
    color: "#aaa",
    cursor: "not-allowed",
  },

  bookBtn: {
    width: "100%",
    marginTop: "35px",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background:
      "linear-gradient(135deg, #1976d2, #0d47a1)",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(25,118,210,0.35)",
    transition: "0.3s",
  },

  loadingContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default BookAppointment;