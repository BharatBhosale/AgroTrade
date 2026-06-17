package com.agrotrade.backend.service;

import com.agrotrade.backend.dto.TraderRecommendationDto;
import com.agrotrade.backend.model.Farmer;
import com.agrotrade.backend.model.Trader;
import com.agrotrade.backend.repository.ConnectionRepository;
import com.agrotrade.backend.repository.FarmerRepository;
import com.agrotrade.backend.repository.ReviewRepository;
import com.agrotrade.backend.repository.TransactionRepository;
import com.agrotrade.backend.repository.TraderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class RecommendationService {

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private TraderRepository traderRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ConnectionRepository connectionRepository;

    public List<TraderRecommendationDto> getRecommendations(
            Long farmerId,
            String crop,
            String city,
            String state,
            Double latitude,
            Double longitude,
            int limit
    ) {
        Farmer farmer = farmerRepository.findById(farmerId).orElse(null);
        if (farmer == null) {
            return new ArrayList<>();
        }

        String farmerCrop = normalizeText(crop != null ? crop : "");
        String farmerCity = normalizeText(city != null ? city : farmer.getCity());
        String farmerState = normalizeText(state != null ? state : farmer.getState());

        List<Trader> traders = traderRepository.findAll();
        List<TraderRecommendationDto> recommendations = new ArrayList<>();

        for (Trader trader : traders) {
            TraderRecommendationDto dto = new TraderRecommendationDto();
            dto.setTraderId(trader.getId());
            dto.setTraderName(trader.getFullName());
            dto.setBusiness(trader.getBusiness());
            dto.setEmail(trader.getEmail());
            dto.setPhone(trader.getPhone());
            dto.setCrops(trader.getCrops());
            dto.setCity(trader.getCity());
            dto.setState(trader.getState());

            Double latestRating = reviewRepository.getAverageRatingByTraderEmail(trader.getEmail());
            Long latestReviewCount = reviewRepository.getReviewCountByTraderEmail(trader.getEmail());
            double rating = latestRating != null ? latestRating : 0.0;
            long totalReviews = latestReviewCount != null ? latestReviewCount : 0L;

            dto.setRating(Math.round(rating * 10.0) / 10.0);
            dto.setTotalReviews(totalReviews);

            long transactionCount = transactionRepository.countByTraderId(trader.getId());
            dto.setTransactionCount(transactionCount);

            Integer activeFarmers = trader.getActiveFarmers() != null ? trader.getActiveFarmers() : 0;
            dto.setActiveFarmers(activeFarmers);

            long reviewCount = totalReviews;
            long connectionCount = connectionRepository.findByTraderId(trader.getId()).size();

            double cropScore = calculateCropScore(farmerCrop, trader.getCrops());
            double ratingScore = rating / 5.0;
            double transactionScore = calculateTransactionScore(transactionCount);
            double locationScore = calculateLocationScore(latitude, longitude, farmerCity, farmerState, trader);
            double trustScore = calculateTrustScore(reviewCount, activeFarmers, connectionCount);

            double matchScore = cropScore * 0.30
                    + ratingScore * 0.25
                    + transactionScore * 0.20
                    + locationScore * 0.15
                    + trustScore * 0.10;

            dto.setMatchScore(Math.round(matchScore * 10000.0) / 100.0);
            dto.setDistanceKm(calculateDistanceKm(latitude, longitude, trader));
            dto.setReason(buildReason(cropScore, ratingScore, transactionScore, locationScore, trustScore));

            recommendations.add(dto);
        }

        recommendations.sort(Comparator.comparingDouble(TraderRecommendationDto::getMatchScore).reversed());
        return recommendations.subList(0, Math.min(limit, recommendations.size()));
    }

    private String normalizeText(String value) {
        return value == null ? "" : value.trim().toLowerCase(Locale.ROOT);
    }

    private double calculateCropScore(String farmerCrop, String traderCrops) {
        if (traderCrops == null || traderCrops.isEmpty()) {
            return 0.0;
        }
        String normalizedTraderCrops = normalizeText(traderCrops);
        if (!farmerCrop.isBlank() && normalizedTraderCrops.contains(farmerCrop)) {
            return 1.0;
        }
        String[] cropTokens = normalizedTraderCrops.split("[,;\\s]+");
        if (cropTokens.length == 0) {
            return 0.0;
        }
        return 0.5;
    }

    private double calculateTransactionScore(long transactionCount) {
        if (transactionCount >= 200) {
            return 1.0;
        }
        return Math.min(1.0, transactionCount / 200.0);
    }

    private double calculateLocationScore(Double latitude, Double longitude, String farmerCity, String farmerState, Trader trader) {
        if (latitude != null && longitude != null && trader.getLatitude() != null && trader.getLongitude() != null) {
            double distanceKm = calculateDistanceKm(latitude, longitude, trader);
            if (distanceKm < 5) {
                return 1.0;
            }
            if (distanceKm < 20) {
                return 0.75;
            }
            if (distanceKm < 50) {
                return 0.5;
            }
            return 0.25;
        }

        String traderCity = normalizeText(trader.getCity());
        String traderState = normalizeText(trader.getState());
        if (!farmerCity.isBlank() && traderCity.equals(farmerCity)) {
            return 1.0;
        }
        if (!farmerState.isBlank() && traderState.equals(farmerState)) {
            return 0.75;
        }
        return 0.3;
    }

    private double calculateTrustScore(long reviewCount, int activeFarmers, long connectionCount) {
        double reviewScore = Math.min(1.0, reviewCount / 50.0);
        double farmerScore = Math.min(1.0, activeFarmers / 100.0);
        double connectionScore = Math.min(1.0, connectionCount / 100.0);
        return Math.max(reviewScore, Math.max(farmerScore, connectionScore));
    }

    private Double calculateDistanceKm(Double latitude, Double longitude, Trader trader) {
        if (latitude == null || longitude == null || trader.getLatitude() == null || trader.getLongitude() == null) {
            return null;
        }
        final int earthRadius = 6371;
        double dLat = Math.toRadians(trader.getLatitude() - latitude);
        double dLon = Math.toRadians(trader.getLongitude() - longitude);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(latitude)) * Math.cos(Math.toRadians(trader.getLatitude()))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadius * c;
    }

    private String buildReason(double cropScore, double ratingScore, double transactionScore, double locationScore, double trustScore) {
        StringBuilder reason = new StringBuilder();
        if (cropScore >= 0.9) {
            reason.append("Strong crop match. ");
        } else if (cropScore >= 0.5) {
            reason.append("Partial crop alignment. ");
        }
        if (ratingScore >= 0.8) {
            reason.append("High trader rating. ");
        }
        if (transactionScore >= 0.8) {
            reason.append("Experienced with many transactions. ");
        }
        if (locationScore >= 0.8) {
            reason.append("Nearby location. ");
        }
        if (trustScore >= 0.8) {
            reason.append("Trusted by farmers. ");
        }
        if (reason.isEmpty()) {
            reason.append("Recommended based on available match signals.");
        }
        return reason.toString().trim();
    }
}
