package com.km.doctorbooking.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "doctor_slot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class DoctorSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_date")
    private LocalDate appointmentDate;

    @Column(name = "time_slot")
    private LocalTime timeSlot;

    @Column(name = "booked_count")
    private int bookedCount;

    @Column(name = "max_capacity")
    private int maxCapacity;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}
