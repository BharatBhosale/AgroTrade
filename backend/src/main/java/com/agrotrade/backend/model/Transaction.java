package com.agrotrade.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long farmerId;

    private Double amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id=id;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId=farmerId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount=amount;
    }
}