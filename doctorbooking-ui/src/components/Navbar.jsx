// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { getUser, logout } from "../utils/auth";

// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(getUser());
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   // 🔄 sync auth state
//   useEffect(() => {
//     const handleChange = () => setUser(getUser());
//     window.addEventListener("authChanged", handleChange);

//     return () =>
//       window.removeEventListener("authChanged", handleChange);
//   }, []);

//   // ❌ close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = () => setOpen(false);
//     document.addEventListener("click", handleClickOutside);

//     return () =>
//       document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setUser(null);
//     setOpen(false);
//     window.dispatchEvent(new Event("authChanged"));
//     navigate("/login");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     navigate(`/explore?search=${search}`);
//   };

//   return (
//     <nav style={styles.nav}>
//       {/* LOGO */}
//       <div style={styles.logo} onClick={() => navigate("/")}>
//         🏥 DocBook
//       </div>

//       {/* LINKS */}
//       <div style={styles.links}>
//         <Link to="/" style={styles.link}>Home</Link>
//         <Link to="/explore" style={styles.link}>Explore</Link>
//         <Link to="/add-doctor" style={styles.link}>Add Doctor</Link>
//       </div>

//       {/* SEARCH */}
//       <form onSubmit={handleSearch} style={styles.searchBox}>
//         <input
//           type="text"
//           placeholder="Search doctors..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={styles.searchInput}
//         />
//         <button type="submit" style={styles.searchBtn}>🔍</button>
//       </form>

//       {/* AUTH */}
//       <div style={{ position: "relative" }}>
//         {user ? (
//           <>
//             <img
//               src="https://randomuser.me/api/portraits/men/75.jpg"
//               alt="user"
//               style={styles.avatar}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpen(!open);
//               }}
//             />

//             {open && (
//               <div style={styles.dropdown}>
//                 <p style={styles.item}>👤 {user?.name}</p>

//                 <Link to="/appointments" style={styles.item}>
//                   📅 My Appointments
//                 </Link>

//                 <p onClick={handleLogout} style={styles.item}>
//                   🚪 Logout
//                 </p>
//               </div>
//             )}
//           </>
//         ) : (
//           <button
//             style={styles.loginBtn}
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// const styles = {
//   nav: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "12px 40px",
//     background: "#fff",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   },

//   logo: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#1976d2",
//     cursor: "pointer",
//   },

//   links: {
//     display: "flex",
//     gap: "18px",
//   },

//   link: {
//     textDecoration: "none",
//     color: "#333",
//     fontWeight: "500",
//     padding: "6px 10px",
//     borderRadius: "6px",
//     transition: "0.3s",
//   },

//   searchBox: {
//     display: "flex",
//     alignItems: "center",
//     background: "#f5f5f5",
//     borderRadius: "20px",
//     padding: "5px 10px",
//     width: "250px",
//   },

//   searchInput: {
//     border: "none",
//     outline: "none",
//     background: "transparent",
//     flex: 1,
//   },

//   searchBtn: {
//     border: "none",
//     background: "linear-gradient(135deg, #1976d2, #0d47a1)",
//     color: "#fff",
//     borderRadius: "50%",
//     width: "32px",
//     height: "32px",
//     cursor: "pointer",
//   },

//   avatar: {
//     width: "38px",
//     height: "38px",
//     borderRadius: "50%",
//     cursor: "pointer",
//     border: "2px solid #1976d2",
//   },

//   dropdown: {
//     position: "absolute",
//     right: 0,
//     top: "45px",
//     background: "#fff",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
//     borderRadius: "10px",
//     width: "180px",
//     padding: "10px",
//   },

//   item: {
//     padding: "8px",
//     cursor: "pointer",
//     textDecoration: "none",
//     color: "#333",
//     display: "block",
//   },

//   loginBtn: {
//     background: "#1976d2",
//     color: "#fff",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

// export default Navbar;












import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { getUser, logout } from "../utils/auth";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(getUser());
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Sync auth state
  useEffect(() => {
    const handleChange = () => setUser(getUser());

    window.addEventListener(
      "authChanged",
      handleChange
    );

    return () =>
      window.removeEventListener(
        "authChanged",
        handleChange
      );
  }, []);

  // ✅ Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = () =>
      setOpen(false);

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    logout();

    setUser(null);

    setOpen(false);

    window.dispatchEvent(
      new Event("authChanged")
    );

    navigate("/login");
  };

  // ✅ SEARCH ROUTE IMPLEMENTED
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/explore?search=${encodeURIComponent(
        search
      )}`
    );
  };

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <div
        style={styles.logo}
        onClick={() => navigate("/")}
      >
        🏥 DocBook
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        <Link
          to="/"
          style={{
            ...styles.link,
            ...(location.pathname === "/"
              ? styles.activeLink
              : {}),
          }}
        >
          Home
        </Link>

        <Link
          to="/explore-doctors"
          style={{
            ...styles.link,
            ...(location.pathname === "/explore-doctors"
              ? styles.activeLink
              : {}),
          }}
        >
          Explore Doctors
        </Link>

        <Link
          to="/add-doctor"
          style={{
            ...styles.link,
            ...(location.pathname ===
            "/add-doctor"
              ? styles.activeLink
              : {}),
          }}
        >
          ➕ Add Doctor
        </Link>
      </div>

      {/* CLASSY SEARCH */}
      <form
        onSubmit={handleSearch}
        style={styles.searchWrapper}
      >
        <div style={styles.searchIcon}>
          🔍
        </div>

        <input
          type="text"
          placeholder="Search doctors, specialization..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.searchInput}
        />

        <button
          type="submit"
          style={styles.searchBtn}
        >
          Search
        </button>
      </form>

      {/* AUTH */}
      <div style={{ position: "relative" }}>
        {user ? (
          <>
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="user"
              style={styles.avatar}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            />

            {open && (
              <div style={styles.dropdown}>
                <p style={styles.userName}>
                  👋 {user?.name}
                </p>

                <Link
                  to="/appointments"
                  style={styles.item}
                >
                  📅 My Appointments
                </Link>

                <p
                  onClick={handleLogout}
                  style={styles.logoutItem}
                >
                  🚪 Logout
                </p>
              </div>
            )}
          </>
        ) : (
          <button
            style={styles.loginBtn}
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 45px",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 4px 20px rgba(0,0,0,0.06)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: "28px",
    fontWeight: "800",
    background:
      "linear-gradient(135deg,#1976d2,#0d47a1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "pointer",
  },

  links: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    color: "#334155",
    fontWeight: "600",
    padding: "10px 16px",
    borderRadius: "12px",
    transition: "0.3s",
  },

  activeLink: {
    background:
      "linear-gradient(135deg,#1976d2,#0d47a1)",
    color: "#fff",
    boxShadow:
      "0 6px 18px rgba(25,118,210,0.25)",
  },

  // ✅ SEARCH DESIGN
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "50px",
    padding: "6px 8px 6px 16px",
    width: "420px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
    transition: "0.3s",
  },

  searchIcon: {
    fontSize: "18px",
    marginRight: "10px",
    color: "#64748b",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "15px",
    color: "#1e293b",
    background: "transparent",
  },

  searchBtn: {
    border: "none",
    background:
      "linear-gradient(135deg,#1976d2,#0d47a1)",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "40px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow:
      "0 6px 15px rgba(25,118,210,0.3)",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "3px solid #1976d2",
    objectFit: "cover",
    boxShadow:
      "0 5px 15px rgba(25,118,210,0.2)",
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: "55px",
    background: "#fff",
    borderRadius: "18px",
    width: "220px",
    overflow: "hidden",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.12)",
    border: "1px solid #f1f5f9",
  },

  userName: {
    padding: "16px",
    margin: 0,
    fontWeight: "700",
    background: "#f8fafc",
    borderBottom: "1px solid #eee",
    color: "#0f172a",
  },

  item: {
    display: "block",
    padding: "14px 16px",
    textDecoration: "none",
    color: "#334155",
    fontWeight: "500",
    transition: "0.3s",
  },

  logoutItem: {
    padding: "14px 16px",
    cursor: "pointer",
    color: "#ef4444",
    fontWeight: "600",
    margin: 0,
    borderTop: "1px solid #f1f5f9",
  },

  loginBtn: {
    border: "none",
    background:
      "linear-gradient(135deg,#1976d2,#0d47a1)",
    color: "#fff",
    padding: "11px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    boxShadow:
      "0 8px 20px rgba(25,118,210,0.25)",
  },
};

export default Navbar;