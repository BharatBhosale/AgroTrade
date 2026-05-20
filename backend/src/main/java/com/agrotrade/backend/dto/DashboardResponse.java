package com.agrotrade.backend.dto;

import java.util.List;

public class DashboardResponse {

    private Long totalTransactions;
    private Long activeConnections;
    private Double averageRating;
    private Double monthlyIncome;

    private List<Object> recommendations;

    public Long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(Long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public Long getActiveConnections() {
        return activeConnections;
    }

    public void setActiveConnections(Long activeConnections) {
        this.activeConnections = activeConnections;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Double getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(Double monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public List<Object> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<Object> recommendations) {
        this.recommendations = recommendations;
    }

}