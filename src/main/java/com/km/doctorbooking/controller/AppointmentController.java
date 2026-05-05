package com.km.doctorbooking.controller;

import com.km.doctorbooking.dto.request.AppointmentRequest;
import com.km.doctorbooking.dto.response.AppointmentResponse;
import com.km.doctorbooking.entity.Appointment;
import com.km.doctorbooking.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService service;

    // 📌 Book appointment
    @PostMapping
    public AppointmentResponse book(@Valid @RequestBody AppointmentRequest request) {

        Appointment appointment = service.bookAppointment(
                request.getUserId(),
                request.getDoctorId(),
                request.getAppointmentDate(),
                request.getTimeSlot()
        );

        return mapToResponse(appointment);
    }

    // 📄 Get all appointments
    @GetMapping
    public List<AppointmentResponse> getAll() {

        return service.getAllAppointments()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 👤 Get user appointments
    @GetMapping("/user/{userId}")
    public List<AppointmentResponse> getByUser(@PathVariable Long userId) {

        return service.getAppointmentsByUser(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 🧑‍⚕️ Get doctor appointments
    @GetMapping("/doctor/{doctorId}")
    public List<AppointmentResponse> getByDoctor(@PathVariable Long doctorId) {

        return service.getAppointmentsByDoctor(doctorId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ❌ Cancel appointment
    @PutMapping("/{id}/cancel")
    public AppointmentResponse cancel(@PathVariable Long id) {

        Appointment appointment = service.cancelAppointment(id);
        return mapToResponse(appointment);
    }

    @GetMapping("/doctor/{doctorId}/date/{date}")
    public List<String> getBookedSlots(

            @PathVariable Long doctorId,
            @PathVariable LocalDate date) {

        System.out.println("=== API HIT ===");
        System.out.println("DoctorId: " + doctorId);
        System.out.println("Date: " + date);

            List<Appointment> list = service.getAppointmentsByDoctorAndDate(doctorId, date);

        System.out.println("RESULT SIZE: " + list.size());

        for (Appointment a : list) {
            System.out.println("Slot: " + a.getTimeSlot());
        }

            return list.stream()
                    .map(Appointment::getTimeSlot)
                    .filter(Objects::nonNull)
                    .map(LocalTime:: toString)
                    .collect(Collectors.toList());

    }

    // 🔄 Mapper
    private AppointmentResponse mapToResponse(Appointment a) {
        return new AppointmentResponse(
                a.getId(),
                a.getAppointmentDate(),
                a.getTimeSlot(),
                a.getStatus(),
                a.getUser().getName(),
                a.getDoctor().getName(),
                a.getDoctor().getSpecialization()
        );
    }
}