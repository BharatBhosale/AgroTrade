package com.agrotrade.backend.controller;

import com.agrotrade.backend.dto.DashboardResponse;
import com.agrotrade.backend.service.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    DashboardService dashboardService;

    @GetMapping("/farmer/{id}")
    public DashboardResponse farmerDashboard(
            @PathVariable Long id
    ){

        return dashboardService.getFarmerDashboard(id);

    }

    @GetMapping("/trader/{id}")
    public DashboardResponse traderDashboard(
            @PathVariable Long id
    ){

        return dashboardService.getTraderDashboard(id);

    }
}