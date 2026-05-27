package com.agrotrade.backend.service;

import com.agrotrade.backend.dto.DashboardResponse;
import com.agrotrade.backend.repository.ConnectionRepository;
import com.agrotrade.backend.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    ConnectionRepository connectionRepository;

    public DashboardResponse getFarmerDashboard(
            Long farmerId
    ) {

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalTransactions(
                transactionRepository
                        .countByFarmerId(farmerId)
        );
        response.setActiveConnections(
                (long) connectionRepository
                        .findByFarmerId(farmerId)
                        .size()
        );
        Double income =
                transactionRepository
                        .getMonthlyIncome(farmerId);
        response.setMonthlyIncome(
                income != null ? income : 0.0
        );
        response.setAverageRating(4.5);

        return response;
    }

    public DashboardResponse getTraderDashboard(
            Long traderId
    ) {

        DashboardResponse response =
                new DashboardResponse();

        response.setTotalTransactions(
                transactionRepository.countByTraderId(traderId)
        );

        response.setActiveConnections(
                (long) connectionRepository
                        .findByTraderId(traderId)
                        .size()
        );

        Double income =
                transactionRepository
                        .getMonthlyIncomeByTrader(traderId);

        response.setMonthlyIncome(
                income != null ? income : 0.0
        );
        response.setAverageRating(4.5);

        return response;
    }
}
