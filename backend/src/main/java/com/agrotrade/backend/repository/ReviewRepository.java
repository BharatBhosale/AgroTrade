package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository
extends JpaRepository<Review,Long>{

    @Query(
    value=
    "SELECT AVG(rating) FROM reviews WHERE farmer_id=?1",
    nativeQuery=true
    )
    Double getAverageRating(Long farmerId);

}