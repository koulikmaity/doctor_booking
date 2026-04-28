//package com.km.doctorbooking.controller;
//
//import com.km.doctorbooking.dto.request.LoginRequest;
//import com.km.doctorbooking.dto.request.RegisterRequest;
//import com.km.doctorbooking.dto.response.AuthResponse;
//import com.km.doctorbooking.entity.User;
//import com.km.doctorbooking.service.AuthService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthService authService;
//
//    // 📝 Register
//    @PostMapping("/register")
//    public AuthResponse register(@RequestBody RegisterRequest request) {
//
//        User user = new User();
//        user.setName(request.getName());
//        user.setEmail(request.getEmail());
//        user.setPassword(request.getPassword());
//        user.setRole(request.getRole());
//
//        User savedUser = authService.register(user);
//
//        String token = authService.generateToken(savedUser.getEmail());
//
//        return new AuthResponse(token, "User registered successfully");
//    }
//
//    // 🔑 Login
//    @PostMapping("/login")
//    public AuthResponse login(@RequestBody LoginRequest request) {
//
//        String token = authService.login(request.getEmail(), request.getPassword());
//
//        return new AuthResponse(token, "Login successful");
//    }
//}















package com.km.doctorbooking.controller;

import com.km.doctorbooking.dto.request.LoginRequest;
import com.km.doctorbooking.dto.request.RegisterRequest;
import com.km.doctorbooking.dto.response.AuthResponse;
import com.km.doctorbooking.entity.User;
import com.km.doctorbooking.entity.Role;
import com.km.doctorbooking.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // 📝 Register
//    @PostMapping("/register")
//    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
//
//        User user = new User();
//        user.setName(request.getName());
//        user.setEmail(request.getEmail());
//        user.setPassword(request.getPassword());
//
//        // 🔐 FIX: Do NOT take role from request
//        user.setRole(Role.PATIENT);
//
//        User savedUser = authService.register(user);
//
//        String token = authService.generateToken(savedUser.getEmail());
//
//        return new AuthResponse(
//                token,
//                "User registered successfully",
//                savedUser.getEmail(),
//                savedUser.getRole().name()
//        );
//    }



    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    // 🔑 Login
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {

        // ✅ get full user
        User user = authService.login(request.getEmail(), request.getPassword());

        System.out.println("USER OBJECT: " + user); // 🔥
        System.out.println("USER NAME: " + user.getName()); // 🔥

        // ✅ generate token
        String token = authService.generateToken(user.getEmail());

        // ✅ return real data
        return new AuthResponse(
                user.getId(),
                token,
                "Login successful",
                user.getName(),  // 🔥 IMPORTANT
                user.getEmail(),
                user.getRole().name()

        );
    }
}