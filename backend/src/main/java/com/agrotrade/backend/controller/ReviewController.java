package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Review;
import com.agrotrade.backend.model.Trader;
import com.agrotrade.backend.repository.ReviewRepository;
import com.agrotrade.backend.repository.TraderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private TraderRepository traderRepository;

    // SAVE REVIEW
    @PostMapping("/add")
    public Review addReview(
            @RequestBody Review review
    ) {

        Review savedReview = reviewRepository.save(review);
        String traderEmail = savedReview.getTraderEmail();
        Double avgRating = reviewRepository.getAverageRatingByTraderEmail(traderEmail);
        Long reviewCount = reviewRepository.getReviewCountByTraderEmail(traderEmail);

        Trader trader = traderRepository.findByEmail(traderEmail)
                .orElseThrow(() -> new RuntimeException("Trader not found"));

        trader.setRating(avgRating != null ? (int) Math.round(avgRating) : 0);
        trader.setTotalReviews(reviewCount != null ? reviewCount.intValue() : 0);
        traderRepository.save(trader);

        return savedReview;

    }

    // GET ALL REVIEWS
    @GetMapping("/all")
    public List<Review> getAllReviews() {

        return reviewRepository.findAll();

    }

    // GET TRADER REVIEWS
    @GetMapping("/trader/{email}")
    public List<Review> getTraderReviews(
            @PathVariable String email
    ) {

        return reviewRepository
                .findByTraderEmail(email);

    }
}