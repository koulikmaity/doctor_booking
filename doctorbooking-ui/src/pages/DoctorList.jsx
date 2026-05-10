import React, { useEffect, useRef, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { getAllDoctors } from "../services/doctorService";

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    // ✅ prevent duplicate API call
    const fetched = useRef(false);

    useEffect(() => {
        // ✅ already fetched
        if (fetched.current) return;

        fetched.current = true;
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await getAllDoctors();

            console.log("DOCTORS:", res.data);

            setDoctors(res.data);
        } catch (error) {
            console.error("ERROR FETCHING DOCTORS:", error);
        }
    };

    return (
        <div style={styles.page}>
            {/* HERO SECTION */}
            <div style={styles.heroSection}>
                <div style={styles.overlay}></div>

                <div style={styles.heroContent}>
                    <div>
                        <h1 style={styles.heading}>
                            Find The Best Doctors Near You
                        </h1>

                        <p style={styles.subHeading}>
                            Book appointments instantly with trusted doctors,
                            specialists and healthcare experts.
                        </p>

                        <div style={styles.heroButtons}>
                            <button
                                style={styles.primaryBtn}
                                onClick={() =>
                                    window.location.href = "/explore-doctors"
                                }
                            >
                                🩺 Explore Doctors
                            </button>

                            <button style={styles.secondaryBtn}>
                                📅 Book Appointment
                            </button>
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div style={styles.heroCard}>
                        <h3 style={{ marginBottom: "15px" }}>
                            Healthcare Services
                        </h3>

                        <div style={styles.cardItem}>
                            ❤️ Heart Specialist
                        </div>

                        <div style={styles.cardItem}>
                            🦷 Dental Care
                        </div>

                        <div style={styles.cardItem}>
                            👶 Child Specialist
                        </div>

                        <div style={styles.cardItem}>
                            🧠 Neurologist
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION TITLE */}
            <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                    Top Doctors Available
                </h2>

                <p style={styles.sectionSub}>
                    Choose from highly experienced doctors
                </p>
            </div>

            {/* DOCTORS GRID */}
            <div style={styles.container}>
                {doctors.map((doc) => (
                    <div key={doc.id} style={styles.cardWrapper}>
                        <DoctorCard doctor={doc} />
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f4f7fb",
    },

    /* HERO */
    heroSection: {
        position: "relative",
        minHeight: "420px",
        background:
            "linear-gradient(135deg, #0f172a, #1976d2)",
        overflow: "hidden",
        borderBottomLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    },

    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 40%)",
    },

    heroContent: {
        position: "relative",
        zIndex: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "70px 60px",
        flexWrap: "wrap",
        gap: "40px",
    },

    heading: {
        color: "#fff",
        fontSize: "52px",
        fontWeight: "700",
        marginBottom: "20px",
        maxWidth: "650px",
        lineHeight: "1.2",
    },

    subHeading: {
        color: "rgba(255,255,255,0.85)",
        fontSize: "18px",
        maxWidth: "550px",
        lineHeight: "1.7",
        marginBottom: "30px",
    },

    heroButtons: {
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
    },

    primaryBtn: {
        padding: "14px 28px",
        border: "none",
        borderRadius: "12px",
        background: "#fff",
        color: "#1976d2",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },

    secondaryBtn: {
        padding: "14px 28px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.12)",
        color: "#fff",
        cursor: "pointer",
        fontSize: "15px",
        backdropFilter: "blur(8px)",
    },

    /* RIGHT CARD */
    heroCard: {
        width: "300px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "24px",
        padding: "25px",
        color: "#fff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    },

    cardItem: {
        padding: "14px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.08)",
        marginBottom: "12px",
        fontSize: "15px",
    },

    /* SECTION */
    sectionHeader: {
        textAlign: "center",
        marginTop: "50px",
    },

    sectionTitle: {
        fontSize: "36px",
        color: "#0f172a",
        marginBottom: "10px",
    },

    sectionSub: {
        color: "#64748b",
        fontSize: "16px",
    },

    /* GRID */
    container: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 280px))",
            justifyContent: "center",
        gap: "50px",
        padding: "50px 60px",
    },

    cardWrapper: {
        transition: "0.3s",
    },
};

export default DoctorList;