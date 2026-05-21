package com.km.doctorbooking.repository;

import com.km.doctorbooking.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
//public interface DoctorRepository extends JpaRepository<Doctor, Long> {
//
//    // 🔍 Find doctors by specialization
//    List<Doctor> findBySpecializationIgnoreCase(String specialization);
//
//    // 🔍 Search by name (partial match)
//    List<Doctor> findByNameContainingIgnoreCase(String name);
//
//}


public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // 🔍 Unified scalable search
    @Query("""
        SELECT d FROM Doctor d
        WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :search, '%'))
        OR
        LOWER(d.specialization) LIKE LOWER(CONCAT('%', :search, '%'))
        """)
    List<Doctor> searchDoctors(@Param("search") String search);
}