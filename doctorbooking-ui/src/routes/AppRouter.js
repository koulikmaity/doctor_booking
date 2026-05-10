import React from "react";
import { Routes, Route } from "react-router-dom";

import DoctorList from "../pages/DoctorList";
import ExploreDoctors from "../pages/ExploreDoctors";
import BookAppointment from "../pages/BookAppointment";
import AddDoctor from "../pages/AddDoctor";
import Login from "../pages/Login";
import MyAppointments from "../pages/MyAppointments";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DoctorList />} />
      <Route path="/explore-doctors" element={<ExploreDoctors />} />
      <Route path="/book/:doctorId" element={<BookAppointment />} />
      <Route path="/add-doctor" element={<AddDoctor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/appointments" element={<MyAppointments />} />
    </Routes>
  );
}

export default AppRouter;