package com.km.doctorbooking.service;

import com.km.doctorbooking.entity.User;
import com.km.doctorbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    // 📝 Register (can also be used via AuthService)
    public User register(User user) {

        if (userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return userRepo.save(user);
    }

    // 🔍 Get user by ID
    public User getUserById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 📄 Get all users
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // 🔍 Get user by email
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ❌ Delete user
    public void deleteUser(Long id) {

        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        userRepo.deleteById(id);
    }
}