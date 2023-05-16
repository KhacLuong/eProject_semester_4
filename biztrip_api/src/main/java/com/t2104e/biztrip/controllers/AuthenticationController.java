package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.dto.AuthenticationRequest;
import com.t2104e.biztrip.dto.AuthenticationResponse;
import com.t2104e.biztrip.dto.RegisterRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.services.AuthenticationService;
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

    private final AuthenticationService service;
    private final ResponseDTO RESPONSE_DTO = new ResponseDTO();

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("success");
        RESPONSE_DTO.setMessage("Tạo tài khoản mới thành công.");
        RESPONSE_DTO.setData(service.register(request));
        return ResponseEntity.ok(RESPONSE_DTO);
    }

    @PostMapping("/register-admin")
    public ResponseEntity<?> admin_register(
            @RequestBody RegisterRequest request
    ) {
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("success");
        RESPONSE_DTO.setMessage("Tạo tài khoản mới thành công.");
        RESPONSE_DTO.setData(service.admin_register(request));
        return ResponseEntity.ok(RESPONSE_DTO);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("success");
        RESPONSE_DTO.setMessage("Đăng nhập thành công.");
        RESPONSE_DTO.setData(service.authenticate(request));
        return ResponseEntity.ok(RESPONSE_DTO);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("success");
        RESPONSE_DTO.setMessage("");
        RESPONSE_DTO.setData(service.refreshToken(request, response));
        return ResponseEntity.ok(RESPONSE_DTO);
    }
}
