package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Farmer;
import com.agrotrade.backend.repository.FarmerRepository;
import com.agrotrade.backend.service.FarmerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmers")
@CrossOrigin(origins = "http://localhost:3000")
public class FarmerController {

    @Autowired
    private FarmerService farmerService;

    @Autowired
    private FarmerRepository farmerRepository;

    // REGISTER FARMER
    @PostMapping("/register")
    public Farmer registerFarmer(
            @RequestBody Farmer farmer
    ) {

        return farmerService.saveFarmer(farmer);

    }

    // GET ALL FARMERS
    @GetMapping("/all")
    public List<Farmer> getAllFarmers() {

        return farmerRepository.findAll();

    }

    // GET FARMER BY ID
    @GetMapping("/{id}")
    public Farmer getFarmerById(
            @PathVariable Long id
    ) {

        return farmerRepository
                .findById(id)
                .orElse(null);

    }

    // UPDATE FARMER PROFILE
    @PutMapping("/{id}")
    public Farmer updateFarmer(
            @PathVariable Long id,
            @RequestBody Farmer updatedFarmer
    ) {

        Farmer farmer =
                farmerRepository
                        .findById(id)
                        .orElse(null);

        if (farmer != null) {

            farmer.setFullName(
                    updatedFarmer.getFullName()
            );

            farmer.setEmail(
                    updatedFarmer.getEmail()
            );

            farmer.setPhone(
                    updatedFarmer.getPhone()
            );

            farmer.setCity(
                    updatedFarmer.getCity()
            );

            farmer.setState(
                    updatedFarmer.getState()
            );

            farmer.setAddress(
                    updatedFarmer.getAddress()
            );

            return farmerRepository.save(farmer);

        }

        return null;
    }

    // DELETE FARMER
    @DeleteMapping("/{id}")
    public String deleteFarmer(
            @PathVariable Long id
    ) {

        farmerRepository.deleteById(id);

        return "Farmer Deleted Successfully";

    }
}