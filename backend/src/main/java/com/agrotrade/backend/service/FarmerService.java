package com.agrotrade.backend.service;

import com.agrotrade.backend.model.Farmer;
import com.agrotrade.backend.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmerService {

    @Autowired
    private FarmerRepository farmerRepository;

    public Farmer saveFarmer(Farmer farmer){

        return farmerRepository.save(farmer);
    }
}