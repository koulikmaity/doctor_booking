package com.km.doctorbooking.service;

import com.km.doctorbooking.dto.request.RegisterRequest;
import com.km.doctorbooking.dto.response.AuthResponse;
import com.km.doctorbooking.entity.Role;
import com.km.doctorbooking.entity.User;
import com.km.doctorbooking.repository.UserRepository;
import com.km.doctorbooking.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // 🔥 FIX 1 (Missing injection)

    // 📝 Register
    public AuthResponse register(RegisterRequest request) {

        if (userRepo.existsByEmail(request.getEmail())) {
//            throw new RuntimeException("Email already exists");
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exists"
            );
        }

        User user = new User();
        user.setName(request.getName());
        // ✅ Normalize email
        user.setEmail(request.getEmail().trim().toLowerCase());

        // 🔐 Encode password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // 🔥 DEFAULT ROLE
        user.setRole(Role.PATIENT);
        // ✅ Save user
        User savedUser = userRepo.save(user);

        // 🔐 Generate JWT
        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(
                user.getId(),
                token,
                "User registered successfully",
                savedUser.getName(),   // 🔥 use savedUser
                savedUser.getEmail(),
                savedUser.getRole().name()
        );
    }

    // 🔑 Login (returns JWT token)
    public User login(String email, String password) {

        // ✅ Normalize email
        email = email.trim().toLowerCase();

        User user = userRepo.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 FIX 2 (Correct password check)
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }

    public String generateToken(String email) {
        return jwtUtil.generateToken(email);
    }
}