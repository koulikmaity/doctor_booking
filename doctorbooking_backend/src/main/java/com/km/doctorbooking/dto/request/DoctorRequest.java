package com.km.doctorbooking.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class DoctorRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String specialization;

    @Min(0)
    private int experience;

    @NotBlank
    private String availableFrom;

    @NotBlank
    private String availableTo;

    private String imageUrl;
}