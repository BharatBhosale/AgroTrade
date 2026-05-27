package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Trader;
import com.agrotrade.backend.model.Connection;

import com.agrotrade.backend.repository.TraderRepository;
import com.agrotrade.backend.repository.ConnectionRepository;

import com.agrotrade.backend.service.TraderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traders")
@CrossOrigin(origins = "http://localhost:3000")
public class TraderController {

    @Autowired
    private TraderService traderService;

    @Autowired
    private TraderRepository traderRepo;

    @Autowired
    private ConnectionRepository connectionRepository;

    // REGISTER TRADER
    @PostMapping("/register")
    public Trader registerTrader(
            @RequestBody Trader trader
    ) {

        return traderService.saveTrader(trader);
    }

    // GET ALL TRADERS
    @GetMapping("/all")
    public List<Trader> getAllTraders() {

        return traderService.getAllTraders();
    }

    // ACCEPT REQUEST
    @PostMapping("/accept-request")
    public Connection acceptRequest(
            @RequestBody Connection connection
    ) {

        return connectionRepository.save(connection);
    }

    // GET CONNECTED FARMERS
    @GetMapping("/connections/{traderId}")
    public List<Connection> getConnections(
            @PathVariable Long traderId
    ) {

        return connectionRepository
                .findByTraderId(traderId);
    }

    // CONNECTION COUNT
    @GetMapping("/connection-count/{traderId}")
    public int getConnectionCount(
            @PathVariable Long traderId
    ) {

        return connectionRepository
                .findByTraderId(traderId)
                .size();
    }
}