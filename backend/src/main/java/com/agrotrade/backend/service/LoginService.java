package com.agrotrade.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrotrade.backend.dto.LoginRequest;
import com.agrotrade.backend.model.Farmer;
import com.agrotrade.backend.model.Trader;
import com.agrotrade.backend.repository.FarmerRepository;
import com.agrotrade.backend.repository.TraderRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    @Autowired
    FarmerRepository farmerRepo;

    @Autowired
    TraderRepository traderRepo;

    public Map<String, Object> login(LoginRequest request) {

        Map<String, Object> response = new HashMap<>();

        Farmer farmer =
                farmerRepo.findByEmailAndPassword(
                        request.getEmail(),
                        request.getPassword()
                );

        if (farmer != null) {

            response.put("role", "farmer");
            response.put("id", farmer.getId());
            response.put("full_name", farmer.getFullName());
            response.put("email", farmer.getEmail());

            return response;
        }

        Trader trader =
                traderRepo.findByEmailAndPassword(
                        request.getEmail(),
                        request.getPassword()
                );

        if (trader != null) {

            response.put("role", "trader");
            response.put("id", trader.getId());
            response.put("full_name", trader.getFullName());
            response.put("email", trader.getEmail());

            return response;
        }

        response.put("role", "invalid");

        return response;
    }
}