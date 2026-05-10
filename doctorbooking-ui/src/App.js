// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import DoctorList from "./pages/DoctorList";
// import BookAppointment from "./pages/BookAppointment";
// import MyAppointments from "./pages/MyAppointments";
// import AddDoctor from "./pages/AddDoctor";

// function Layout() {

//   const location = useLocation();

//   // ❌ Hide footer on Add Doctor page
//   const hideFooter = location.pathname === "/add-doctor";

//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<DoctorList />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/book/:doctorId" element={<BookAppointment />} />
//         <Route path="/appointments" element={<MyAppointments />} />
//         <Route path="/add-doctor" element={<AddDoctor />} />
//       </Routes>

//       {/* ✅ Footer visible everywhere except add-doctor */}
//       {!hideFooter && <Footer />}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }

// export default App;







import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar visible everywhere */}
      <Navbar />

      {/* Pages */}
      <AppRouter />

      {/* Footer visible everywhere */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;