package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.dto.AuthenticationRequest;
import com.t2104e.biztrip.dto.RegisterRequest;
import com.t2104e.biztrip.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        return new ResponseEntity<>(
                authenticationService.register(request),
                HttpStatusCode.valueOf(authenticationService.register(request).getCode())
        );
    }

    @PostMapping("/admin-register")
    public ResponseEntity<?> admin_register(
            @RequestBody RegisterRequest request
    ) {
        return new ResponseEntity<>(
                authenticationService.admin_register(request),
                HttpStatusCode.valueOf(authenticationService.admin_register(request).getCode())
        );
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return new ResponseEntity<>(
                authenticationService.authenticate(request),
                HttpStatusCode.valueOf(authenticationService.authenticate(request).getCode())
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        return new ResponseEntity<>(
                authenticationService.refreshToken(request, response),
                HttpStatusCode.valueOf(authenticationService.refreshToken(request, response).getCode())
        );
    }
}
