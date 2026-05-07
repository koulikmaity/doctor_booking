package com.km.doctorbooking.repository;

import com.km.doctorbooking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 🔍 Find by email (used in login)
    Optional<User> findByEmail(String email);

    // 🔍 Check if email already exists
    boolean existsByEmail(String email);
}