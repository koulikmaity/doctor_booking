package com.km.doctorbooking.service;

import com.km.doctorbooking.entity.Appointment;
import com.km.doctorbooking.entity.Doctor;
import com.km.doctorbooking.entity.DoctorSlot;
import com.km.doctorbooking.entity.User;
import com.km.doctorbooking.repository.AppointmentRepository;
import com.km.doctorbooking.repository.DoctorRepository;
import com.km.doctorbooking.repository.DoctorSlotRepository;
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

    @Autowired
    private DoctorSlotRepository doctorSlotRepo;

    // ✅ MAX PATIENTS PER SLOT
    private static final int MAX_PATIENTS_PER_SLOT = 3;



public Appointment bookAppointment(Long userId, Long doctorId,
                                   LocalDate date, LocalTime timeSlot) {

    try {

        if (date == null || timeSlot == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Date and time are required ❌"
            );
        }

        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Doctor not found"));

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        if (date.isBefore(today)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Cannot book past date ❌"
            );
        }

        if (date.equals(today) && timeSlot.isBefore(now)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Cannot book past time ❌"
            );
        }

        LocalTime start = LocalTime.parse(doctor.getAvailableFrom());
        LocalTime end = LocalTime.parse(doctor.getAvailableTo());

        if (timeSlot.isBefore(start) || !timeSlot.isBefore(end)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Slot outside doctor availability ❌"
            );
        }


        // ✅ Step 1: Check if slot exists
        DoctorSlot slot = doctorSlotRepo
                .findByDoctorIdAndAppointmentDateAndTimeSlot(doctorId, date, timeSlot)
                .orElseGet(() -> {
                    DoctorSlot newSlot = new DoctorSlot();
                    newSlot.setDoctor(doctor);
                    newSlot.setAppointmentDate(date);
                    newSlot.setTimeSlot(timeSlot);
                    newSlot.setMaxCapacity(MAX_PATIENTS_PER_SLOT);
                    newSlot.setBookedCount(0);
                    return doctorSlotRepo.save(newSlot);
                });

        int updated = appointmentRepo.incrementSlot(doctorId, date, timeSlot);

        if (updated == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Slot full ❌");
        }


        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"));

        Appointment appointment = new Appointment();
        appointment.setAppointmentDate(date);
        appointment.setTimeSlot(timeSlot);
        appointment.setStatus("BOOKED");
        appointment.setUser(user);
        appointment.setDoctor(doctor);

        Appointment saved = appointmentRepo.save(appointment);

        return saved;

    } catch (DataIntegrityViolationException ex) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "User already booked this slot ❌"
        );

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

        // 🔥 ATOMIC SLOT DECREMENT
        // 🔥 ONLY decrement if it was BOOKED
        if ("BOOKED".equals(appointment.getStatus())) {
            appointmentRepo.decrementSlot(
                    appointment.getDoctor().getId(),
                    appointment.getAppointmentDate(),
                    appointment.getTimeSlot()
            );
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