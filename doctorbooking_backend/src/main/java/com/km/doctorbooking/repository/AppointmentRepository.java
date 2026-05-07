//package com.km.doctorbooking.repository;
//
//import com.km.doctorbooking.entity.Appointment;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//import java.util.List;
//
//@Repository
//public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
//
//    // 🔥 Check if slot already booked
//    boolean existsByDoctorIdAndAppointmentDateAndTimeSlot(
//            Long doctorId,
//            LocalDate appointmentDate,
//            LocalTime timeSlot
//    );
//
//    // 👤 Get appointments by user
//    List<Appointment> findByUserId(Long userId);
//
//    // 🧑‍⚕️ Get appointments by doctor
//    List<Appointment> findByDoctorId(Long doctorId);
//
//    // 📅 Get appointments by date
//    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);
//
//    // 🔍 Combined filter (useful for dashboards)
//    List<Appointment> findByDoctorIdAndAppointmentDate(
//            Long doctorId,
//            LocalDate appointmentDate
//    );
//
//    long countByDoctorIdAndAppointmentDateAndTimeSlot(
//            Long doctorId,
//            LocalDate date,
//            LocalTime timeSlot
//    );
//}











package com.km.doctorbooking.repository;

import com.km.doctorbooking.entity.Appointment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // 👤 Get appointments by user
    List<Appointment> findByUserId(Long userId);

    // 🧑‍⚕️ Get appointments by doctor
    List<Appointment> findByDoctorId(Long doctorId);

    // 📅 Get appointments by date
    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);

    // 🔍 Combined filter
    List<Appointment> findByDoctorIdAndAppointmentDate(
            Long doctorId,
            LocalDate appointmentDate
    );




    @Modifying
    @Transactional
    @Query("""
    UPDATE DoctorSlot s
    SET s.bookedCount = s.bookedCount + 1
    WHERE s.doctor.id = :doctorId
    AND s.appointmentDate = :appointmentDate
    AND s.timeSlot = :timeSlot
    AND s.bookedCount < s.maxCapacity
    """)
    int incrementSlot(
            @Param("doctorId") Long doctorId,
            @Param("appointmentDate") LocalDate appointmentDate,
            @Param("timeSlot") LocalTime timeSlot
    );




    @Modifying
    @Query("""
    UPDATE DoctorSlot s
    SET s.bookedCount = s.bookedCount - 1
    WHERE s.doctor.id = :doctorId
    AND s.appointmentDate = :appointmentDate
    AND s.timeSlot = :timeSlot
    AND s.bookedCount > 0
""")
    int decrementSlot(
            @Param("doctorId") Long doctorId,
            @Param("appointmentDate") LocalDate appointmentDate,
            @Param("timeSlot") LocalTime timeSlot
    );
}