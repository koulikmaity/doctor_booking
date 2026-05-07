package com.km.doctorbooking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DoctorResponse {
    private Long id;
    private String name;
    private String specialization;
    private int experience;
    private String availableFrom;
    private String availableTo;
    private String imageUrl;
}