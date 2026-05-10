

import API from "./api";

// ✅ Book appointment
export const bookAppointment = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await API.post("/appointments", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ✅ Get my appointments
// export const getMyAppointments = async () => {
//   const res = await API.get(
//     "/appointments/my"
//   );

//   return res.data;
// };
export const getMyAppointments = async () => {
  try {
    // const res = await API.get(
    //   "/appointments/my"
    // );

    // console.log("DATA:", res.data);

    // return res.data;


    const token = localStorage.getItem("token");

  const response = await API.get(
    "/appointments/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
  }catch (err) {

  console.error(
    "GET APPOINTMENTS ERROR:",
    err
  );

  console.error(
    "RESPONSE:",
    err.response?.data
  );

  console.error(
    "STATUS:",
    err.response?.status
  );

  alert(
    err.response?.data?.message ||
    "Error fetching appointments ❌"
  );
}
};

// ✅ Cancel appointment
// export const cancelAppointment = async (id) => {
//   const res = await API.put(
//     `/appointments/${id}/cancel`
//   );

//   return res.data;
// };



export const cancelAppointment = async (id) => {

  const token = localStorage.getItem("token");

  const response = await API.put(
    `/appointments/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};





export const getBookedSlots = async (doctorId, date) => {
  const token = localStorage.getItem("token");

  const res = await API.get(
    `/appointments/doctor/${doctorId}/date/${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};