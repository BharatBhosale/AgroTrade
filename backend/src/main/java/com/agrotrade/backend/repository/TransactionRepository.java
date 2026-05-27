package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.Transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    // COUNT
    Long countByFarmerId(Long farmerId);

    Long countByTraderId(Long traderId);

    // FARMER TRANSACTIONS
    List<Transaction> findByFarmerId(
            Long farmerId
    );

    // TRADER TRANSACTIONS
    List<Transaction> findByTraderId(
            Long traderId
    );

    // EMAIL BASED
    List<Transaction> findByFarmerEmail(
            String farmerEmail
    );

    List<Transaction> findByTraderEmail(
            String traderEmail
    );

    // FARMER INCOME USING ID
    @Query(
            value =
                    "SELECT SUM(total_amount) FROM transactions WHERE farmer_id=?1",
            nativeQuery = true
    )
    Double getMonthlyIncome(
            Long farmerId
    );

    // TRADER INCOME USING ID
    @Query(
            value =
                    "SELECT SUM(total_amount) FROM transactions WHERE trader_id=?1",
            nativeQuery = true
    )
    Double getMonthlyIncomeByTrader(
            Long traderId
    );

    // FARMER INCOME USING EMAIL
    @Query(
            value =
                    "SELECT SUM(total_amount) FROM transactions WHERE farmer_email=?1",
            nativeQuery = true
    )
    Double getFarmerIncome(
            String farmerEmail
    );

    // TRADER INCOME USING EMAIL
    @Query(
            value =
                    "SELECT SUM(total_amount) FROM transactions WHERE trader_email=?1",
            nativeQuery = true
    )
    Double getTraderIncome(
            String traderEmail
    );
}