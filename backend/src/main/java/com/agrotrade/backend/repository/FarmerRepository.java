package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository
extends JpaRepository<Farmer, Long>{

    Farmer findByEmailAndPassword(
            String email,
            String password
    );

    Farmer findByEmail(String email);

}