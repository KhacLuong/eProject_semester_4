package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.dto.AuthenticationRequest;
import com.t2104e.biztrip.dto.RegisterRequest;
import com.t2104e.biztrip.services.AuthenticationService;
import com.t2104e.biztrip.services.ResponseService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
        return ResponseEntity.ok(
                ResponseService.created(
                        authenticationService.register(request),
                        "Tạo tài khoản mới thành công."
                )
        );
    }

    @PostMapping("/admin-register")
    public ResponseEntity<?> admin_register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(
                ResponseService.created(
                        authenticationService.admin_register(request),
                        "Tạo tài khoản quản trị mới thành công."
                )
        );
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(
                ResponseService.ok(
                        authenticationService.authenticate(request),
                        "Đăng nhập thành công."
                )
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        return ResponseEntity.ok(
                ResponseService.ok(
                        authenticationService.refreshToken(request, response),
                        "Refresh token success"
                )
        );
    }
}
