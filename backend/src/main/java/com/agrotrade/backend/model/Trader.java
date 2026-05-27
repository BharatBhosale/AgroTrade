package com.agrotrade.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="traders")
public class Trader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String business;

    private String email;

    private String phone;

    private String license;

    private String password;

    private String address;

    private String city;

    private String state;

    private Double latitude;

    private Double longitude;

    private String crops;

    private Integer rating = 0;

    private Integer totalReviews = 0;

    // NEW FIELD
    private Integer activeFarmers = 0;

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id=id;
    }

    // FULL NAME
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName){
        this.fullName=fullName;
    }

    // BUSINESS
    public String getBusiness() {
        return business;
    }

    public void setBusiness(String business){
        this.business=business;
    }

    // EMAIL
    public String getEmail() {
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }

    // PHONE
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone){
        this.phone=phone;
    }

    // LICENSE
    public String getLicense() {
        return license;
    }

    public void setLicense(String license){
        this.license=license;
    }

    // PASSWORD
    public String getPassword() {
        return password;
    }

    public void setPassword(String password){
        this.password=password;
    }

    // ADDRESS
    public String getAddress() {
        return address;
    }

    public void setAddress(String address){
        this.address=address;
    }

    // CITY
    public String getCity() {
        return city;
    }

    public void setCity(String city){
        this.city=city;
    }

    // STATE
    public String getState() {
        return state;
    }

    public void setState(String state){
        this.state=state;
    }

    // LATITUDE
    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude){
        this.latitude=latitude;
    }

    // LONGITUDE
    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude){
        this.longitude=longitude;
    }

    // CROPS
    public String getCrops() {
        return crops;
    }

    public void setCrops(String crops){
        this.crops=crops;
    }

    // RATING
    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating){
        this.rating=rating;
    }

    // TOTAL REVIEWS
    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews){
        this.totalReviews=totalReviews;
    }

    // ACTIVE FARMERS
    public Integer getActiveFarmers() {
        return activeFarmers;
    }

    public void setActiveFarmers(Integer activeFarmers) {
        this.activeFarmers = activeFarmers;
    }
}