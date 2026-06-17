package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.Review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    List<Review> findByTraderEmail(
            String traderEmail
    );

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM Review r WHERE r.traderEmail = :traderEmail")
    Double getAverageRatingByTraderEmail(@Param("traderEmail") String traderEmail);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.traderEmail = :traderEmail")
    Long getReviewCountByTraderEmail(@Param("traderEmail") String traderEmail);

}