import API from "./api";

// 🧑‍⚕️ Get all doctors
// export const getAllDoctors = () => {
//   return API.get("/doctors");
// };

export const getAllDoctors = ( filters = {} ) => {
  return API.get( "/doctors", { params: filters,});
};

// 🔍 Get doctor by ID
export const getDoctorById = (id) => {
  return API.get(`/doctors/${id}`);
};



// ➕ Add doctor
export const addDoctor = (data) => {
  return API.post("/doctors", data);
};

// ✏️ Update doctor
export const updateDoctor = (id, data) => {
  return API.put(`/doctors/${id}`, data);
};

// ❌ Delete doctor
export const deleteDoctor = (id) => {
  return API.delete(`/doctors/${id}`);
};