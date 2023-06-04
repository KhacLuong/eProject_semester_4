package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.AuthenticationRequest;
import com.t2104e.biztrip.command.RegisterRequest;
import com.t2104e.biztrip.services.eloquents.AuthenticationService;
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
        var data = authenticationService.register(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("/admin-register")
    public ResponseEntity<?> admin_register(
            @RequestBody RegisterRequest request
    ) {
        var data = authenticationService.admin_register(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        var data = authenticationService.authenticate(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request
    ) throws IOException {
        var data = authenticationService.refreshToken(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
}
