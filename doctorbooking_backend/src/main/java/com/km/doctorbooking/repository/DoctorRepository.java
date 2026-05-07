package com.km.doctorbooking.repository;

import com.km.doctorbooking.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // 🔍 Find doctors by specialization
    List<Doctor> findBySpecializationIgnoreCase(String specialization);

    // 🔍 Search by name (partial match)
    List<Doctor> findByNameContainingIgnoreCase(String name);

}