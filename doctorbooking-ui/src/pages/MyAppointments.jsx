// // import React, { useEffect, useState } from "react";

// // function MyAppointments() {
// //   const [appointments, setAppointments] = useState([]);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       alert("Please login first ❌");
// //       return;
// //     }

// //     fetch("http://localhost:8081/api/appointments/my", {
// //       method: "GET",
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     })
// //       .then((res) => {
// //         if (!res.ok) {
// //           throw new Error("Failed to fetch appointments");
// //         }
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setAppointments(data);
// //       })
// //       .catch((err) => {
// //         console.error(err);
// //         alert("Error fetching appointments ❌");
// //       });
// //   }, []);

// //   const cancelAppointment = (id) => {
// //     const token = localStorage.getItem("token");

// //     fetch(`http://localhost:8081/api/appointments/${id}/cancel`, {
// //       method: "PUT",
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     })
// //       .then((res) => res.json())
// //       .then(() => {
// //         // update UI after cancel
// //         setAppointments((prev) =>
// //           prev.map((a) =>
// //             a.id === id ? { ...a, status: "CANCELLED" } : a
// //           )
// //         );
// //       })
// //       .catch((err) => console.error(err));
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>My Appointments</h2>

// //       {appointments.length === 0 ? (
// //         <p>No appointments found</p>
// //       ) : (
// //         appointments.map((a) => (
// //           <div
// //             key={a.id}
// //             style={{
// //               border: "1px solid #ccc",
// //               margin: "10px 0",
// //               padding: "10px",
// //               borderRadius: "8px",
// //             }}
// //           >
// //             <p><b>Doctor ID:</b> {a.doctor?.id}</p>
// //             <p><b>Date:</b> {a.appointmentDate}</p>
// //             <p><b>Time:</b> {a.timeSlot}</p>
// //             <p><b>Status:</b> {a.status}</p>

// //             {a.status === "BOOKED" && (
// //               <button
// //                 onClick={() => cancelAppointment(a.id)}
// //                 style={{
// //                   background: "red",
// //                   color: "#fff",
// //                   border: "none",
// //                   padding: "6px 10px",
// //                   borderRadius: "5px",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //             )}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }

// // export default MyAppointments;













// import React, { useEffect, useState } from "react";

// import {
//   getMyAppointments,
//   cancelAppointment,
// } from "../services/appointmentService";

// function MyAppointments() {
//   const [appointments, setAppointments] = useState([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   // ✅ FETCH APPOINTMENTS
//   const fetchAppointments = async () => {
//     try {
//       const data = await getMyAppointments();

//       setAppointments(data || []);
//     } catch (err) {

//       setAppointments([]);
//       console.error(err);

//       alert(
//         "Error fetching appointments ❌"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CANCEL APPOINTMENT
//   const handleCancel = async (id) => {
//     try {
//       await cancelAppointment(id);

//       setAppointments((prev) =>
//         prev.map((a) =>
//           a.id === id
//             ? {
//               ...a,
//               status: "CANCELLED",
//             }
//             : a
//         )
//       );

//       alert(
//         "Appointment cancelled successfully ✅"
//       );
//     } catch (err) {
//       console.error(err);

//       alert("Cancel failed ❌");
//     }
//   };

//   if (loading) {
//     return (
//       <div style={styles.loading}>
//         Loading Appointments...
//       </div>
//     );
//   }

//   return (
//     <div style={styles.page}>
//       {/* HEADER */}
//       <div style={styles.header}>
//         <h1 style={styles.title}>
//           📅 My Appointments
//         </h1>

//         <p style={styles.subTitle}>
//           Manage your booked appointments
//         </p>
//       </div>

//       {/* EMPTY */}
//       {appointments.length === 0 ? (
//         <div style={styles.emptyCard}>
//           <h2>No appointments found</h2>

//           <p>
//             Book your first appointment
//             now.
//           </p>
//         </div>
//       ) : (
//         <div style={styles.grid}>
//           {appointments?.map((a) => (
//             <div
//               key={a.id}
//               style={styles.card}
//             >
//               {/* TOP */}
//               <div style={styles.top}>
//                 <img
//                   src={
//                     a.doctor?.imageUrl ||
//                     "https://randomuser.me/api/portraits/men/75.jpg"
//                   }
//                   alt="doctor"
//                   style={styles.image}
//                 />

//                 <div>
//                   <h2 style={styles.doctorName}>
//                     {a.doctor?.name ||
//                       "Doctor"}
//                   </h2>

//                   <p
//                     style={
//                       styles.specialization
//                     }
//                   >
//                     {
//                       a.doctor
//                         ?.specialization
//                     }
//                   </p>
//                 </div>
//               </div>

//               {/* INFO */}
//               <div style={styles.info}>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {a.appointmentDate}
//                 </p>

//                 <p>
//                   <strong>Time:</strong>{" "}
//                   {a.timeSlot}
//                 </p>

//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span
//                     style={{
//                       padding: "4px 10px",
//                       borderRadius: "999px",
//                       fontSize: "12px",
//                       fontWeight: "700",
//                       color: a.status === "BOOKED" ? "#166534" : "#991b1b",
//                       background:
//                         a.status === "BOOKED" ? "#dcfce7" : "#fee2e2",
//                     }}
//                   >
//                     {a.status}
//                   </span>
//                 </p>
//               </div>

//               {/* BUTTON */}
//               {a.status === "BOOKED" && (
//                 <button
//                   onClick={() =>
//                     handleCancel(a.id)
//                   }
//                   style={styles.cancelBtn}
//                 >
//                   Cancel Appointment
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // const styles = {
// //   page: {
// //     minHeight: "100vh",
// //     background:
// //       "linear-gradient(135deg,#eef4ff,#f8fbff)",
// //     padding: "50px 30px",
// //   },

// //   header: {
// //     textAlign: "center",
// //     marginBottom: "40px",
// //   },

// //   title: {
// //     fontSize: "42px",
// //     color: "#0f172a",
// //     marginBottom: "10px",
// //   },

// //   subTitle: {
// //     color: "#64748b",
// //     fontSize: "16px",
// //   },

// //   grid: {
// //     maxWidth: "1200px",
// //     margin: "0 auto",
// //     display: "grid",
// //     gridTemplateColumns:
// //       "repeat(auto-fit,minmax(320px,1fr))",
// //     gap: "28px",
// //   },

// //   card: {
// //     background: "#fff",
// //     borderRadius: "24px",
// //     padding: "28px",
// //     boxShadow:
// //       "0 10px 35px rgba(0,0,0,0.08)",
// //   },

// //   top: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "18px",
// //     marginBottom: "20px",
// //   },

// //   image: {
// //     width: "80px",
// //     height: "80px",
// //     borderRadius: "50%",
// //     objectFit: "cover",
// //     border: "4px solid #1976d2",
// //   },

// //   doctorName: {
// //     margin: 0,
// //     color: "#0f172a",
// //     fontSize: "22px",
// //   },

// //   specialization: {
// //     marginTop: "6px",
// //     color: "#1976d2",
// //     fontWeight: "600",
// //   },

// //   info: {
// //     background: "#f8fbff",
// //     borderRadius: "16px",
// //     padding: "18px",
// //     lineHeight: "1.9",
// //     color: "#334155",
// //   },

// //   cancelBtn: {
// //     width: "100%",
// //     marginTop: "22px",
// //     padding: "14px",
// //     border: "none",
// //     borderRadius: "14px",
// //     background:
// //       "linear-gradient(135deg,#ef4444,#dc2626)",
// //     color: "#fff",
// //     fontWeight: "700",
// //     cursor: "pointer",
// //     fontSize: "15px",
// //   },

// //   emptyCard: {
// //     maxWidth: "500px",
// //     margin: "80px auto",
// //     background: "#fff",
// //     borderRadius: "24px",
// //     padding: "50px",
// //     textAlign: "center",
// //     boxShadow:
// //       "0 10px 30px rgba(0,0,0,0.08)",
// //   },

// //   loading: {
// //     height: "100vh",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     fontSize: "24px",
// //     fontWeight: "700",
// //   },
// // };


// const styles = {
//   page: {
//     minHeight: "100vh",
//     background:
//       "linear-gradient(135deg, #e0f2ff 0%, #f6f9ff 50%, #eef2ff 100%)",
//     padding: "60px 25px",
//     fontFamily: "system-ui, -apple-system, sans-serif",
//   },

//   header: {
//     textAlign: "center",
//     marginBottom: "50px",
//   },

//   title: {
//     fontSize: "44px",
//     fontWeight: "800",
//     color: "#0f172a",
//     letterSpacing: "-0.5px",
//   },

//   subTitle: {
//     color: "#64748b",
//     fontSize: "16px",
//     marginTop: "8px",
//   },

//   grid: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
//     gap: "26px",
//   },

//   card: {
//     background: "rgba(255,255,255,0.85)",
//     backdropFilter: "blur(10px)",
//     borderRadius: "22px",
//     padding: "24px",
//     boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
//     border: "1px solid rgba(255,255,255,0.4)",
//     transition: "all 0.25s ease",
//     cursor: "pointer",
//   },

//   top: {
//     display: "flex",
//     alignItems: "center",
//     gap: "16px",
//     marginBottom: "18px",
//   },

//   image: {
//     width: "72px",
//     height: "72px",
//     borderRadius: "50%",
//     objectFit: "cover",
//     border: "3px solid #3b82f6",
//   },

//   doctorName: {
//     margin: 0,
//     fontSize: "20px",
//     fontWeight: "700",
//     color: "#0f172a",
//   },

//   specialization: {
//     marginTop: "4px",
//     color: "#3b82f6",
//     fontWeight: "600",
//     fontSize: "14px",
//   },

//   info: {
//     background: "rgba(241,245,249,0.7)",
//     borderRadius: "14px",
//     padding: "14px",
//     lineHeight: "1.8",
//     color: "#334155",
//     fontSize: "14px",
//   },

//   cancelBtn: {
//     width: "100%",
//     marginTop: "18px",
//     padding: "12px",
//     borderRadius: "12px",
//     border: "none",
//     background: "linear-gradient(135deg,#ef4444,#dc2626)",
//     color: "#fff",
//     fontWeight: "700",
//     cursor: "pointer",
//     fontSize: "14px",
//     transition: "0.2s",
//   },

//   emptyCard: {
//     maxWidth: "420px",
//     margin: "90px auto",
//     background: "rgba(255,255,255,0.9)",
//     borderRadius: "22px",
//     padding: "45px",
//     textAlign: "center",
//     boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
//   },

//   loading: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "22px",
//     fontWeight: "600",
//     color: "#475569",
//   },
// };


// export default MyAppointments;

























import React, { useEffect, useState } from "react";
import {
  getMyAppointments,
  cancelAppointment,
} from "../services/appointmentService";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data || []);
    } catch (err) {
      console.error(err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: "CANCELLED" } : a
        )
      );
    } catch (err) {
      console.error(err);
      alert("Cancel failed ❌");
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>Loading Appointments...</div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>My Appointments</h1>
        <p style={styles.subtitle}>
          View and manage your bookings
        </p>
      </div>

      {/* EMPTY */}
      {appointments.length === 0 ? (
        <div style={styles.empty}>
          No Appointments Found
        </div>
      ) : (
        <div style={styles.grid}>
          {appointments.map((a) => (
            <div key={a.id} style={styles.card}>
              {/* CARD HEADER */}
              <div style={styles.cardHeader}>
                <img
                  src={
                    a.doctor?.imageUrl ||
                    "https://randomuser.me/api/portraits/men/75.jpg"
                  }
                  alt="doctor"
                  style={styles.avatar}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={styles.doctorName}>
                    {a.doctor?.name || "Doctor"}
                  </h3>

                  <p style={styles.specialization}>
                    {a.doctor?.specialization}
                  </p>
                </div>

                {/* STATUS BADGE */}
                <span
                  style={{
                    ...styles.badge,
                    background:
                      a.status === "BOOKED"
                        ? "#dcfce7"
                        : "#fee2e2",
                    color:
                      a.status === "BOOKED"
                        ? "#166534"
                        : "#991b1b",
                  }}
                >
                  {a.status}
                </span>
              </div>

              {/* CARD BODY */}
              <div style={styles.cardBody}>
                <div style={styles.row}>
                  <span style={styles.label}>📅 Date</span>
                  <span style={styles.value}>
                    {a.appointmentDate}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>⏰ Time</span>
                  <span style={styles.value}>
                    {a.timeSlot}
                  </span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>🏥 Doctor</span>
                  <span style={styles.value}>
                    {a.doctor?.specialization}
                  </span>
                </div>
              </div>

              {/* ACTION */}
              {a.status === "BOOKED" && (
                <button
                  onClick={() => handleCancel(a.id)}
                  style={styles.cancelBtn}
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background:
      "linear-gradient(135deg, #eef2ff, #f8fbff)",
    fontFamily: "system-ui",
  },

  header: {
    textAlign: "center",
    marginBottom: "35px",
  },

  title: {
    fontSize: "38px",
    fontWeight: "800",
    color: "#0f172a",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "6px",
  },

  grid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "22px",
  },

  /* CARD */
  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "0.3s",
    border: "1px solid #f1f5f9",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },

  avatar: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #3b82f6",
  },

  doctorName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
  },

  specialization: {
    margin: 0,
    fontSize: "13px",
    color: "#3b82f6",
    fontWeight: "600",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "700",
  },

  cardBody: {
    background: "#f8fafc",
    padding: "12px",
    borderRadius: "12px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    fontSize: "14px",
  },

  label: {
    color: "#64748b",
    fontWeight: "500",
  },

  value: {
    color: "#0f172a",
    fontWeight: "600",
  },

  cancelBtn: {
    marginTop: "14px",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    marginTop: "80px",
    fontSize: "18px",
    color: "#64748b",
  },

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "600",
  },
};

export default MyAppointments;