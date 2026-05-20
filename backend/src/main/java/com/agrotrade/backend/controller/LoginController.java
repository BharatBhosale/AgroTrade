package com.agrotrade.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agrotrade.backend.dto.LoginRequest;
import com.agrotrade.backend.service.LoginService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request
    ){

        return loginService.login(request);

    }

}