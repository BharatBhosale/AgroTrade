package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.Review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    List<Review> findByTraderEmail(
            String traderEmail
    );

}