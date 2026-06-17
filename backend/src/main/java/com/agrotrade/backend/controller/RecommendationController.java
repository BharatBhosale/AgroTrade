package com.agrotrade.backend.controller;

import com.agrotrade.backend.dto.TraderRecommendationDto;
import com.agrotrade.backend.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ml/recommendations")
@CrossOrigin("*")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/farmer/{farmerId}")
    public List<TraderRecommendationDto> getRecommendations(
            @PathVariable Long farmerId,
            @RequestParam(required = false) String crop,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(defaultValue = "3") int limit
    ) {
        return recommendationService.getRecommendations(
                farmerId,
                crop,
                city,
                state,
                latitude,
                longitude,
                limit
        );
    }
}
