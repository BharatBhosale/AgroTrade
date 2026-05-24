package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.FarmerRequest;
import com.agrotrade.backend.repository.FarmerRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmer-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class FarmerRequestController {

    @Autowired
    private FarmerRequestRepository farmerRequestRepository;

    @PostMapping("/create")
    public FarmerRequest createRequest(
            @RequestBody FarmerRequest request) {

        return farmerRequestRepository.save(request);
    }

    @GetMapping("/all")
    public List<FarmerRequest> getAllRequests() {

        return farmerRequestRepository.findAll();
    }

    @GetMapping("/trader/{traderId}")
    public List<FarmerRequest> getTraderRequests(
            @PathVariable Long traderId) {

        return farmerRequestRepository.findByTraderId(traderId);
    }

    @PostMapping("/{id}/accept")
    public String acceptRequest(@PathVariable Long id) {

        return "Request Accepted";
    }

    @PostMapping("/{id}/reject")
    public String rejectRequest(@PathVariable Long id) {

        return "Request Rejected";
    }
}