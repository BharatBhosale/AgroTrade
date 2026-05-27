package com.agrotrade.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FARMER
    private Long farmerId;

    private String farmerName;

    private String farmerEmail;

    // TRADER
    private Long traderId;

    private String traderName;

    private String traderEmail;

    // TRANSACTION DETAILS
    private String crop;

    private Double quantity;

    private Double rate;

    private Double baseAmount;

    private Double charges;

    private Double cut;

    private Double totalAmount;

    private LocalDate transactionDate;

    private String status;

    private LocalDateTime createdAt;

    // CONSTRUCTOR
    public Transaction() {

        this.createdAt = LocalDateTime.now();

        this.transactionDate = LocalDate.now();
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // FARMER ID
    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    // FARMER NAME
    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }

    // FARMER EMAIL
    public String getFarmerEmail() {
        return farmerEmail;
    }

    public void setFarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
    }

    // TRADER ID
    public Long getTraderId() {
        return traderId;
    }

    public void setTraderId(Long traderId) {
        this.traderId = traderId;
    }

    // TRADER NAME
    public String getTraderName() {
        return traderName;
    }

    public void setTraderName(String traderName) {
        this.traderName = traderName;
    }

    // TRADER EMAIL
    public String getTraderEmail() {
        return traderEmail;
    }

    public void setTraderEmail(String traderEmail) {
        this.traderEmail = traderEmail;
    }

    // CROP
    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    // QUANTITY
    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    // RATE
    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    // BASE AMOUNT
    public Double getBaseAmount() {
        return baseAmount;
    }

    public void setBaseAmount(Double baseAmount) {
        this.baseAmount = baseAmount;
    }

    // CHARGES
    public Double getCharges() {
        return charges;
    }

    public void setCharges(Double charges) {
        this.charges = charges;
    }

    // CUT
    public Double getCut() {
        return cut;
    }

    public void setCut(Double cut) {
        this.cut = cut;
    }

    // TOTAL AMOUNT
    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    // TRANSACTION DATE
    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    // STATUS
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // CREATED AT
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}