package com.km.doctorbooking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private Long id;
    private String token;   // for JWT later
    private String message;
    private String name;
    // 🔥 Optional (very useful for frontend)
    private String email;
    private String role;
}