
import React, { useEffect, useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login page loaded 🚀");
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [hoverSignUp, setHoverSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LOGIN SUBMITTED");

    try {
      const response = await login(form);

      console.log("LOGIN RESPONSE:", response.data);

      // ✅ store token
      localStorage.setItem("token", response.data.token);

      // ✅ FIX: store user object
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        })
      );

    // 🔥 trigger navbar update
    window.dispatchEvent(new Event("authChanged"));

      alert("Login Successful ✅");

      // ✅ redirect based on role
      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("ERROR:", error);
      alert(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center" }}>Welcome Back 👋</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputBox}>
            <span>📧</span>
            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              required
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div style={styles.inputBox}>
            <span>🔒</span>
            <input
              type="password"
              style={styles.input}
              name="password"
              placeholder="Password"
              value={form.password}
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>

          <p style={styles.switchText}>
            New user?{" "}
            <span
              onClick={() => navigate("/register")}
              onMouseEnter={() => setHoverSignUp(true)}
              onMouseLeave={() => setHoverSignUp(false)}
              style={
                hoverSignUp ? styles.hoverLink : styles.link
              }
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
  },
  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "15px",
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    background: "#fafafa",
  },
  input: {
    border: "none",
    outline: "none",
    width: "100%",
    marginLeft: "8px",
    background: "transparent",
  },
  switchText: {
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    color: "#1976d2",
    cursor: "pointer",
    transition: "0.3s",
  },
  hoverLink: {
    color: "#0d47a1",
    textDecoration: "underline",
    cursor: "pointer",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;