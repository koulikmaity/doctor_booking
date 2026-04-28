package com.km.doctorbooking.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // PATIENT / DOCTOR / ADMIN
}