package com.agrotrade.backend.service;

import com.agrotrade.backend.model.Trader;
import com.agrotrade.backend.repository.TraderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TraderService {

    @Autowired
    private TraderRepository traderRepository;

    public Trader saveTrader(Trader trader){

        return traderRepository.save(trader);
    }
}