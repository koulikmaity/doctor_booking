import API from "./api";

// 🔐 LOGIN
export const login = (data) => {
  return API.post("/auth/login", data);
};

// 📝 REGISTER
export const register = (data) => {
  return API.post("/auth/register", data);
};

// 🚪 LOGOUT
export const logout = () => {
  localStorage.clear();
  window.dispatchEvent(new Event("authChanged"));
};

// 👤 Get logged user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};