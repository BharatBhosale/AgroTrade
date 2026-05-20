package com.agrotrade.backend.repository;

import com.agrotrade.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository
extends JpaRepository<Transaction,Long>{

    Long countByFarmerId(Long farmerId);

    @Query(
    value=
    "SELECT SUM(amount) FROM transactions WHERE farmer_id=?1",
    nativeQuery=true
    )
    Double getMonthlyIncome(Long farmerId);

}