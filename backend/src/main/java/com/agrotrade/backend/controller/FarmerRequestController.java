package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Connection;
import com.agrotrade.backend.model.Farmer;
import com.agrotrade.backend.model.FarmerRequest;
import com.agrotrade.backend.model.Trader;
import com.agrotrade.backend.repository.ConnectionRepository;
import com.agrotrade.backend.repository.FarmerRepository;
import com.agrotrade.backend.repository.FarmerRequestRepository;
import com.agrotrade.backend.repository.TraderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmer-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class FarmerRequestController {

    @Autowired
    private FarmerRequestRepository farmerRequestRepository;

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private TraderRepository traderRepository;

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

        return farmerRequestRepository.findByTraderIdAndStatus(traderId, "PENDING");
    }

    @GetMapping("/trader/{traderId}/all")
    public List<FarmerRequest> getTraderRequestsAll(
            @PathVariable Long traderId) {

        return farmerRequestRepository.findByTraderId(traderId);
    }

    @PostMapping("/{id}/accept")
    public Connection acceptRequest(@PathVariable Long id) {

        FarmerRequest request = farmerRequestRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // resolve farmer id by email
        Long farmerId = null;
        if (request.getFarmerId() != null) {
            farmerId = request.getFarmerId();
        } else if (request.getEmail() != null) {
            Farmer farmer = farmerRepository.findByEmail(request.getEmail());
            if (farmer != null) farmerId = farmer.getId();
        }

        if (farmerId == null) {
            throw new RuntimeException("Farmer id not found for request");
        }

        Connection connection = new Connection();
        connection.setFarmerId(farmerId);
        connection.setTraderId(request.getTraderId());
        connection.setFarmerName(request.getFarmerName());
        connection.setTraderName(request.getTraderName());
        connection.setCrop(request.getCrop());
        connection.setLocation(request.getLocation());

        Connection saved = connectionRepository.save(connection);

        // increment farmer activeConnections
        try {
            Farmer farmerEntity = farmerRepository.findById(farmerId).orElse(null);
            if (farmerEntity != null) {
                farmerEntity.setActiveConnections(farmerEntity.getActiveConnections() + 1);
                farmerRepository.save(farmerEntity);
            }
        } catch (Exception ex) {
            System.out.println("Failed to update farmer activeConnections: " + ex.getMessage());
        }

        // increment trader activeFarmers
        try {
            if (request.getTraderId() != null) {
                Trader traderEntity = traderRepository.findById(request.getTraderId()).orElse(null);
                if (traderEntity != null) {
                    Integer curr = traderEntity.getActiveFarmers() != null ? traderEntity.getActiveFarmers() : 0;
                    traderEntity.setActiveFarmers(curr + 1);
                    traderRepository.save(traderEntity);
                }
            }
        } catch (Exception ex) {
            System.out.println("Failed to update trader activeFarmers: " + ex.getMessage());
        }

        request.setStatus("ACCEPTED");
        request.setStatusDate(java.time.LocalDate.now().toString());
        farmerRequestRepository.save(request);

        return saved;
    }

    @PostMapping("/{id}/reject")
    public FarmerRequest rejectRequest(@PathVariable Long id) {

        FarmerRequest request = farmerRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus("REJECTED");
        request.setStatusDate(java.time.LocalDate.now().toString());
        return farmerRequestRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteRequest(@PathVariable Long id) {

        farmerRequestRepository.deleteById(id);
        return "Request Deleted";
    }

    @PostMapping("/{id}/complete")
    public FarmerRequest completeRequest(@PathVariable Long id) {
        FarmerRequest request = farmerRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus("COMPLETED");
        request.setStatusDate(java.time.LocalDate.now().toString());
        return farmerRequestRepository.save(request);
    }
}
