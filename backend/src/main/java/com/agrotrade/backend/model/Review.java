package com.agrotrade.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long farmerId;

    private Double rating;

    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId){
        this.farmerId=farmerId;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating){
        this.rating=rating;
    }
}