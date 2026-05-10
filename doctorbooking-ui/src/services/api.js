import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ✅ Always attach token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "➡️ API:",
      config.method?.toUpperCase(),
      `${config.baseURL}${config.url}`
    );

    return config;
  },

  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
API.interceptors.response.use(

  (response) => response,

  (error) => {

    console.error(
      "❌ API ERROR:",
      error.response?.data || error.message
    );

    // ✅ TOKEN EXPIRED / UNAUTHORIZED
    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {

      // ✅ Clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ✅ Prevent multiple alerts
      if (
        !window.location.pathname.includes("/login")
      ) {

        alert(
          "Session expired. Please login again."
        );

        // ✅ Redirect login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;