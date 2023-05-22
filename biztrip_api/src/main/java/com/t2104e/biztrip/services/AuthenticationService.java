package com.t2104e.biztrip.services;

import com.t2104e.biztrip.dto.AuthenticationRequest;
import com.t2104e.biztrip.dto.AuthenticationResponse;
import com.t2104e.biztrip.dto.RegisterRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.Role;
import com.t2104e.biztrip.entities.User;
import com.t2104e.biztrip.services.ResponseService;
import com.t2104e.biztrip.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import  org.springframework.security.core.AuthenticationException;
import java.io.IOException;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseDTO<?> register(RegisterRequest request) {
        var existUserByEmail = userRepository.findByEmail(request.getEmail());
        if (existUserByEmail.isPresent()) {
            return ResponseService.badRequest("Đã tồn tại tài khoản với email này. Hãy chọn email khác.");
        }
        var existUserByPhoneNumber = userRepository.findByPhoneNumber(request.getPhoneNumber());
        if (existUserByPhoneNumber.isPresent()) {
            return ResponseService.badRequest("Đã tồn tại tài khoản với số điện thoại này. Hãy chọn số điện thoại khác.");
        }

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(Role.USER)
                .createdAt(new Date())
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, refreshToken);
        var data = AuthenticationResponse.builder()
                .email(savedUser.getEmail())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseService.created(data, "Tạo tài khoản mới thành công.");
    }

    public ResponseDTO<?> admin_register(RegisterRequest request) {
        var existUser = userRepository.findByEmail(request.getEmail());
        if (existUser.isPresent()) {
            return ResponseService.badRequest("Đã tồn tại tài khoản với email này. Hãy chọn email khác.");
        }
        var existUserByPhoneNumber = userRepository.findByPhoneNumber(request.getPhoneNumber());
        if (existUserByPhoneNumber.isPresent()) {
            return ResponseService.badRequest("Đã tồn tại tài khoản với số điện thoại này. Hãy chọn số điện thoại khác.");
        }
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(Role.ADMIN)
                .createdAt(new Date())
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, refreshToken);
        var data = AuthenticationResponse.builder()
                .email(savedUser.getEmail())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseService.created(data, "Tạo tài khoản quản trị mới thành công.");
    }

    public ResponseDTO<?> authenticate(AuthenticationRequest request) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return ResponseService.notFound("Không tìm được tài khoản với thông tin email và password cung cấp.");
        }

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, refreshToken);
        var data = AuthenticationResponse.builder()
                .email(user.getEmail())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseService.ok(data, "Đăng nhập thành công.");
    }

    private void saveUserToken(User user, String refreshToken) {
        user.setRefreshToken(refreshToken);
        user.setTokenRevoked(false);
        user.setTokenExpired(false);
        userRepository.save(user);
    }

    private void revokeAllUserTokens(User user) {
        user.setTokenExpired(true);
        user.setTokenExpired(true);
        userRepository.save(user);
    }

    public ResponseDTO<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.toLowerCase().startsWith("bearer ")) {
            return ResponseService.unAuthorized("Không có JWT hoặc JWT ko bắt đầu với `bearer`");
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail).orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                var data =  AuthenticationResponse.builder()
                        .email(userEmail)
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                return ResponseService.ok(data, "JWT được tạo mới thành công.");
            } else {
                ResponseService.badRequest("Token đã hết hạn.");
            }
        }
        return ResponseService.noContent("Không tìm thấy tài khoản tồn tại với email lấy từ refresh token.");
    }
}
