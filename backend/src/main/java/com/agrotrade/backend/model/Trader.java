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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id=id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName){
        this.fullName=fullName;
    }

    public String getBusiness() {
        return business;
    }

    public void setBusiness(String business){
        this.business=business;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone){
        this.phone=phone;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license){
        this.license=license;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password){
        this.password=password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address){
        this.address=address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city){
        this.city=city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state){
        this.state=state;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude){
        this.latitude=latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude){
        this.longitude=longitude;
    }

    public String getCrops() {
        return crops;
    }

    public void setCrops(String crops){
        this.crops=crops;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating){
        this.rating=rating;
    }

    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews){
        this.totalReviews=totalReviews;
    }
}