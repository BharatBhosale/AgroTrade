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

    @GetMapping("/{id}")
    public DashboardResponse dashboard(
            @PathVariable Long id
    ){

        return dashboardService.getDashboard(id);

    }
}