package com.agrotrade.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agrotrade.backend.dto.LoginRequest;
import com.agrotrade.backend.model.Farmer;
import com.agrotrade.backend.model.Trader;
import com.agrotrade.backend.repository.FarmerRepository;
import com.agrotrade.backend.repository.TraderRepository;

@Service
public class LoginService {

    @Autowired
    FarmerRepository farmerRepo;

    @Autowired
    TraderRepository traderRepo;

    public String login(LoginRequest request){

        Farmer farmer =
                farmerRepo.findByEmailAndPassword(
                        request.getEmail(),
                        request.getPassword()
                );

        if(farmer != null){
            return "farmer";
        }

        Trader trader =
                traderRepo.findByEmailAndPassword(
                        request.getEmail(),
                        request.getPassword()
                );

        if(trader != null){
            return "trader";
        }

        return "invalid";
    }
}