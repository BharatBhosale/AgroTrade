package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.FarmerRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FarmerRequestRepository
        extends JpaRepository<FarmerRequest, Long> {

    List<FarmerRequest> findByTraderId(Long traderId);
}