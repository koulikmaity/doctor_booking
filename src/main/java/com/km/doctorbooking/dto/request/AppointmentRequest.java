package com.km.doctorbooking.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long doctorId;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate appointmentDate;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime timeSlot;
}