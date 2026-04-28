package com.km.doctorbooking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String specialization;

    private int experience;

    private String availableFrom;
    private String availableTo;

    private String imageUrl;
}