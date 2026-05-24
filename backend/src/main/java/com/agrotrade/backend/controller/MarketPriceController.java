package com.agrotrade.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "http://localhost:3000")
public class MarketPriceController {

    @GetMapping("/prices")
    public ResponseEntity<?> getPrices() {

        try {

            String url =
                    "https://api.data.gov.in/resource/"
                            + "9ef84268-d588-465a-a308-a864a43d0070"
                            + "?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b"
                            + "&format=json"
                            + "&limit=200";

            RestTemplate restTemplate =
                    new RestTemplate();

            Map response =
                    restTemplate.getForObject(
                            url,
                            Map.class
                    );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(e.getMessage());

        }
    }
}