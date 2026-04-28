package com.km.doctorbooking.service;

import com.km.doctorbooking.entity.Appointment;
import com.km.doctorbooking.entity.Doctor;
import com.km.doctorbooking.entity.User;
import com.km.doctorbooking.repository.AppointmentRepository;
import com.km.doctorbooking.repository.DoctorRepository;
import com.km.doctorbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private UserRepository userRepo;

    // 🔥 1. Book Appointment
//    public Appointment bookAppointment(Long userId, Long doctorId,
//                                       String date, String timeSlot) {
//
//        // ✅ Validate slot availability
//        boolean exists = appointmentRepo
//                .existsByDoctorIdAndAppointmentDateAndTimeSlot(
//                        doctorId, date, timeSlot);
//
//        if (exists) {
//            throw new ResponseStatusException(
//                    HttpStatus.BAD_REQUEST,
//                    "Slot already booked ❌"
//            );
//        }
//
//        // ✅ Fetch User
//        User user = userRepo.findById(userId)
//                .orElseThrow(() -> new ResponseStatusException(
//                        HttpStatus.NOT_FOUND, "User not found"));
//
//        // ✅ Fetch Doctor
//        Doctor doctor = doctorRepo.findById(doctorId)
//                .orElseThrow(() -> new ResponseStatusException(
//                        HttpStatus.NOT_FOUND, "Doctor not found"));
//
//        try {
//            // ✅ Create Appointment
//            Appointment appointment = new Appointment();
//            appointment.setAppointmentDate(date);
//            appointment.setTimeSlot(timeSlot);
//            appointment.setStatus("BOOKED");
//            appointment.setUser(user);
//            appointment.setDoctor(doctor);
//
//            return appointmentRepo.save(appointment);
//        } catch (DataIntegrityViolationException ex) {
//            System.out.println("Duplicate slot error: " + ex.getMessage());
//
//            throw new ResponseStatusException(
//                    HttpStatus.BAD_REQUEST,
//                    "This slot is already booked ❌"
//            );
//        }
//    }





    public Appointment bookAppointment(Long userId, Long doctorId,
                                       LocalDate date, LocalTime timeSlot) {

        try {

//            // 🔥 VALIDATION 1: minute range
//            if (timeSlot.getMinute() > 59) {
//                throw new ResponseStatusException(
//                        HttpStatus.BAD_REQUEST,
//                        "Invalid time slot ❌"
//                );
//            }

            // 🔥 VALIDATION 2: enforce 10-min slots (optional)
            if (timeSlot.getMinute() % 10 != 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Slot must be in 10 min interval (10:00, 10:10...) ❌"
                );
            }

            // 🔥 VALIDATION 3: doctor timing (important)
            Doctor doctor = doctorRepo.findById(doctorId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Doctor not found"));

            LocalTime start = LocalTime.parse(doctor.getAvailableFrom());
            LocalTime end = LocalTime.parse(doctor.getAvailableTo());

            if (timeSlot.isBefore(start) || timeSlot.isAfter(end)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Slot outside doctor availability ❌"
                );
            }

            // ✅ Check already booked
            boolean exists = appointmentRepo
                    .existsByDoctorIdAndAppointmentDateAndTimeSlot(
                            doctorId, date, timeSlot);

            if (exists) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Slot already booked ❌"
                );
            }

            // ✅ Fetch user
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "User not found"));

            // ✅ Save
            Appointment appointment = new Appointment();
            appointment.setAppointmentDate(date);
            appointment.setTimeSlot(timeSlot);
            appointment.setStatus("BOOKED");
            appointment.setUser(user);
            appointment.setDoctor(doctor);

            return appointmentRepo.save(appointment);

        } catch (ResponseStatusException ex) {
            throw ex;

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Something went wrong ❌"
            );
        }
    }



    // 📄 2. Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    // 👤 3. Get appointments by user
    public List<Appointment> getAppointmentsByUser(Long userId) {
        return appointmentRepo.findByUserId(userId);
    }

    // 🧑‍⚕️ 4. Get appointments by doctor
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepo.findByDoctorId(doctorId);
    }

    // 📅 5. Get appointments by doctor + date (useful for UI slots)
    public List<Appointment> getAppointmentsByDoctorAndDate(Long doctorId, LocalDate date) {
        System.out.println("SERVICE HIT: " + doctorId + " " + date);
        return appointmentRepo.findByDoctorIdAndAppointmentDate(doctorId, date);
    }

    // ❌ 6. Cancel appointment
    public Appointment cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if ("CANCELLED".equals(appointment.getStatus())) {
            throw new RuntimeException("Appointment already cancelled");
        }

        appointment.setStatus("CANCELLED");

        return appointmentRepo.save(appointment);
    }

    // 🔄 7. Complete appointment (doctor side)
    public Appointment completeAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus("COMPLETED");

        return appointmentRepo.save(appointment);
    }
}