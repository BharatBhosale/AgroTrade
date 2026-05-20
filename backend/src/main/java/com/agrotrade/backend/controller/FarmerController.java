package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Farmer;
import com.agrotrade.backend.service.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/farmers")
@CrossOrigin(origins="http://localhost:3000")
public class FarmerController {

    @Autowired
    private FarmerService farmerService;

    @PostMapping("/register")
    public Farmer registerFarmer(
            @RequestBody Farmer farmer){

        return farmerService.saveFarmer(farmer);
    }

}