package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Review;
import com.agrotrade.backend.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // SAVE REVIEW
    @PostMapping("/add")
    public Review addReview(
            @RequestBody Review review
    ) {

        return reviewRepository.save(review);

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