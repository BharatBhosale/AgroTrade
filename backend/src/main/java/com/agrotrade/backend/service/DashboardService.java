package com.agrotrade.backend.service;

import com.agrotrade.backend.dto.DashboardResponse;
import com.agrotrade.backend.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    TransactionRepository transactionRepository;

    public DashboardResponse getDashboard(
            Long farmerId
    ) {

        DashboardResponse response =
                new DashboardResponse();

        // TOTAL TRANSACTIONS
        response.setTotalTransactions(
                transactionRepository
                        .countByFarmerId(farmerId)
        );

        // ACTIVE CONNECTIONS
        response.setActiveConnections(12L);

        // STATIC RATING
        response.setAverageRating(4.5);

        // MONTHLY INCOME
        Double income =
                transactionRepository
                        .getMonthlyIncome(farmerId);

        response.setMonthlyIncome(
                income != null ? income : 0.0
        );

        return response;
    }
}