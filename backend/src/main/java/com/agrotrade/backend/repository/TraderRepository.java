package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.Trader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TraderRepository
extends JpaRepository<Trader, Long>{

    Trader findByEmailAndPassword(
            String email,
            String password
    );

}