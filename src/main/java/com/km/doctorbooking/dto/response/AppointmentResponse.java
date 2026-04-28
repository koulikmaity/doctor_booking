package com.km.doctorbooking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class AppointmentResponse {

    private Long id;
    private LocalDate appointmentDate;
    private LocalTime timeSlot;
    private String status;

    private String userName;
    private String doctorName;
    private String specialization;
}