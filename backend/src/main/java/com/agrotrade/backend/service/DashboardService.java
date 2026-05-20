package com.agrotrade.backend.service;

import com.agrotrade.backend.dto.DashboardResponse;
import com.agrotrade.backend.repository.TransactionRepository;
import com.agrotrade.backend.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    ReviewRepository reviewRepository;

    public DashboardResponse getDashboard(Long farmerId){

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalTransactions(
                transactionRepository.countByFarmerId(farmerId)
        );

        response.setActiveConnections(12L);

        Double avg =
                reviewRepository.getAverageRating(farmerId);

        response.setAverageRating(
                avg != null ? avg : 0.0
        );

        Double income =
                transactionRepository.getMonthlyIncome(farmerId);

        response.setMonthlyIncome(
                income != null ? income : 0.0
        );

        return response;
    }
}