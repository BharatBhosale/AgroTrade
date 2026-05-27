package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.Connection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConnectionRepository
        extends JpaRepository<Connection, Long> {

    List<Connection> findByTraderId(Long traderId);

    List<Connection> findByFarmerId(Long farmerId);
}