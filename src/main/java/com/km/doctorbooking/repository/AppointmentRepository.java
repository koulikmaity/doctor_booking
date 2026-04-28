package com.km.doctorbooking.repository;

import com.km.doctorbooking.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // 🔥 Check if slot already booked
    boolean existsByDoctorIdAndAppointmentDateAndTimeSlot(
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime timeSlot
    );

    // 👤 Get appointments by user
    List<Appointment> findByUserId(Long userId);

    // 🧑‍⚕️ Get appointments by doctor
    List<Appointment> findByDoctorId(Long doctorId);

    // 📅 Get appointments by date
    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);

    // 🔍 Combined filter (useful for dashboards)
    List<Appointment> findByDoctorIdAndAppointmentDate(
            Long doctorId,
            LocalDate appointmentDate
    );
}