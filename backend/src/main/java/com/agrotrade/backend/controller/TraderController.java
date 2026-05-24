package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Trader;
import com.agrotrade.backend.service.TraderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/traders")
@CrossOrigin(origins="http://localhost:3000")
public class TraderController {

    @Autowired
    private TraderService traderService;

    @PostMapping("/register")
    public Trader registerTrader(
            @RequestBody Trader trader){

        return traderService.saveTrader(trader);
    }

    @GetMapping("/all")
    public List<Trader> getAllTraders(){
        return traderService.getAllTraders();
    }

}