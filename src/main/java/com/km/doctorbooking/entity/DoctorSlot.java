package com.km.doctorbooking.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
public class DoctorSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String timeSlot;

    private boolean isBooked = false;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}
