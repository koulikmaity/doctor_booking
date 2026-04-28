package com.km.doctorbooking.util;

public class ValidationUtils {

    // 📌 Validate email format (basic)
    public static boolean isValidEmail(String email) {
        return email != null && email.contains("@");
    }

    // 📌 Validate password strength
    public static boolean isValidPassword(String password) {
        return password != null && password.length() >= 6;
    }

    // 📌 Validate string not empty
    public static boolean isNotEmpty(String value) {
        return value != null && !value.trim().isEmpty();
    }
}