package com.km.doctorbooking.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ✅ 1. Handle business errors (your custom throws)
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(ResponseStatusException ex) {

        Map<String, Object> error = new HashMap<>();
        error.put("status", ex.getStatusCode().value());
        error.put("message", ex.getReason());

        return new ResponseEntity<>(error, ex.getStatusCode());
    }


    // ✅ 2. Handle DB constraint (duplicate slot OR invalid TIME)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDBException(DataIntegrityViolationException ex) {

        ex.printStackTrace(); // keep for debugging

        Map<String, Object> error = new HashMap<>();
        error.put("status", 400);

        // ✅ Get root cause (most reliable way)
        Throwable root = ex.getRootCause();

        String message = "Database error ❌";

        if (root != null && root.getMessage() != null) {

            String rootMsg = root.getMessage().toLowerCase();

            // 🔥 Handle duplicate entry (unique constraint)
            if (rootMsg.contains("duplicate")) {
                message = "Slot already booked ❌";
            }

            // 🔥 Handle invalid time/date (optional safety)
            else if (rootMsg.contains("incorrect") || rootMsg.contains("invalid")) {
                message = "Invalid date/time value ❌";
            }
        }

        error.put("message", message);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


    // ✅ 3. Handle validation errors (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {

        Map<String, Object> error = new HashMap<>();
        error.put("status", 400);

        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(e -> e.getDefaultMessage())
                .orElse("Validation failed ❌");

        error.put("message", message);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // ✅ 4. 🔥 MOST IMPORTANT — Handle invalid JSON/date/time parsing
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleParseException(HttpMessageNotReadableException ex) {

        ex.printStackTrace(); // 🔥 shows exact parsing issue

        Map<String, Object> error = new HashMap<>();
        error.put("status", 400);
        error.put("message", "Invalid date/time format ❌");

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // ✅ 5. Fallback (keep ENABLED now for debugging)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(Exception ex) {

        ex.printStackTrace(); // 🔥 CRITICAL

        Map<String, Object> error = new HashMap<>();
        error.put("status", 500);
        error.put("message", ex.getMessage()); // show real error (for now)

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}