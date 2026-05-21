package com.km.doctorbooking.controller;

import com.km.doctorbooking.dto.request.DoctorRequest;
import com.km.doctorbooking.dto.response.DoctorResponse;
import com.km.doctorbooking.entity.Doctor;
import com.km.doctorbooking.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // ➕ Add doctor
    @PostMapping
    public DoctorResponse addDoctor(@Valid @RequestBody DoctorRequest request) {

        Doctor doctor = new Doctor();
        doctor.setName(request.getName());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setExperience(request.getExperience());
        doctor.setAvailableFrom(request.getAvailableFrom());
        doctor.setAvailableTo(request.getAvailableTo());
        doctor.setImageUrl(request.getImageUrl());

        Doctor saved = doctorService.addDoctor(doctor);

        return new DoctorResponse(
                saved.getId(),
                saved.getName(),
                saved.getSpecialization(),
                saved.getExperience(),
                saved.getAvailableFrom(),
                saved.getAvailableTo(),
                saved.getImageUrl()

        );
    }

    // 📄 Get all doctors
//    @GetMapping
//    public List<DoctorResponse> getAllDoctors() {
//
//        return doctorService.getAllDoctors()
//                .stream()
//                .map(doc -> new DoctorResponse(
//                        doc.getId(),
//                        doc.getName(),
//                        doc.getSpecialization(),
//                        doc.getExperience(),
//                        doc.getAvailableFrom(),
//                        doc.getAvailableTo(),
//                        doc.getImageUrl()
//
//                ))
//                .collect(Collectors.toList());
//    }






    // 📄 Get doctors with filters
    @GetMapping
    public List<DoctorResponse> getDoctors(

            @RequestParam(required = false)
            String specialization,

            @RequestParam(required = false)
            Integer experience

    ) {

        List<Doctor> doctors = doctorService.getAllDoctors();
//        System.out.println(
//                "SPECIALIZATION: " + specialization
//        );

        // ✅ specialization filter
        if (specialization != null && !specialization.isEmpty()) {

            doctors = doctors.stream()
                    .filter(doc ->
                            doc.getSpecialization()
                                    .equalsIgnoreCase(
                                            specialization
                                    ))
                    .toList();
        }

        // ✅ experience filter
        if (experience != null) {

            doctors = doctors.stream()
                    .filter(doc ->
                            doc.getExperience() >= experience
                    )
                    .toList();
        }

        return doctors.stream()
                .map(doc -> new DoctorResponse(
                        doc.getId(),
                        doc.getName(),
                        doc.getSpecialization(),
                        doc.getExperience(),
                        doc.getAvailableFrom(),
                        doc.getAvailableTo(),
                        doc.getImageUrl()
                ))
                .collect(Collectors.toList());
    }


    








    // 🔍 Get doctor by ID
    @GetMapping("/{id}")
    public DoctorResponse getDoctor(@PathVariable Long id) {

        Doctor doc = doctorService.getDoctorById(id);

        return new DoctorResponse(
                doc.getId(),
                doc.getName(),
                doc.getSpecialization(),
                doc.getExperience(),
                doc.getAvailableFrom(),
                doc.getAvailableTo(),
                doc.getImageUrl()
        );
    }

    // ❌ Delete doctor
    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return "Doctor deleted successfully";
    }


    @GetMapping("/search")
    public List<Doctor> searchDoctors( @RequestParam String query ) {

        return doctorService.searchDoctors(query);
    }


}