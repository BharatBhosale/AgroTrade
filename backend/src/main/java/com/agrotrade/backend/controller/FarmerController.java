package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Farmer;
import com.agrotrade.backend.model.Connection;

import com.agrotrade.backend.repository.FarmerRepository;
import com.agrotrade.backend.repository.ConnectionRepository;

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

    @Autowired
    private ConnectionRepository connectionRepository;

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

    // GET FARMER CONNECTIONS
    @GetMapping("/connections/{farmerId}")
    public List<Connection> getFarmerConnections(
            @PathVariable Long farmerId
    ) {

        return connectionRepository
                .findByFarmerId(farmerId);
    }

    // CONNECTION COUNT
    @GetMapping("/connection-count/{farmerId}")
    public int getConnectionCount(
            @PathVariable Long farmerId
    ) {

        return connectionRepository
                .findByFarmerId(farmerId)
                .size();
    }
}