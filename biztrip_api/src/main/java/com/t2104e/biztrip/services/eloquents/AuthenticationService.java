package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.AuthenticationRequest;
import com.t2104e.biztrip.dto.AuthenticationResponse;
import com.t2104e.biztrip.command.RegisterRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.RoleEntity;
import com.t2104e.biztrip.entities.UserEntity;
import com.t2104e.biztrip.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseService.conflict("Đã tồn tại tài khoản với email này. Hãy chọn email khác.");
        }
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            return ResponseService.conflict("Đã tồn tại tài khoản với số điện thoại này. Hãy chọn số điện thoại khác.");
        }

        var user = UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(RoleEntity.USER)
                .createdAt(new Date())
                .build();
        var savedUser = userRepository.save(user);
        var data = AuthenticationResponse.builder()
                .email(savedUser.getEmail())
                .build();
        return ResponseService.created(data, "Tạo tài khoản mới thành công.");
    }

    public ResponseDTO<?> admin_register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseService.conflict("Đã tồn tại tài khoản với email này. Hãy chọn email khác.");
        }
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            return ResponseService.conflict("Đã tồn tại tài khoản với số điện thoại này. Hãy chọn số điện thoại khác.");
        }
        var user = UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(RoleEntity.ADMIN)
                .createdAt(new Date())
                .build();
        var savedUser = userRepository.save(user);
        var data = AuthenticationResponse.builder()
                .email(savedUser.getEmail())
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

    private void saveUserToken(UserEntity user, String refreshToken) {
        user.setRefreshToken(refreshToken);
        user.setTokenRevoked(false);
        user.setTokenExpired(false);
        userRepository.save(user);
    }

    private void revokeAllUserTokens(UserEntity user) {
        user.setTokenRevoked(true);
        user.setTokenExpired(true);
        userRepository.save(user);
    }

    public ResponseDTO<?> refreshToken(
            HttpServletRequest request
    ) throws IOException {
        final String refreshTokenHeader = request.getHeader("REFRESH-TOKEN");
        final String refreshToken;
        final String userEmail;
        if (refreshTokenHeader == null) {
            return ResponseService.unAuthorized("Không có Refresh Token");
        }
        refreshToken = refreshTokenHeader;
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail).orElseThrow();
            if (user.getRefreshToken().equals(refreshToken)) {
                var accessToken = jwtService.generateToken(user);
                var newRefreshToken = jwtService.generateRefreshToken(user);
                saveUserToken(user, newRefreshToken);
                var data = AuthenticationResponse.builder()
                        .email(userEmail)
                        .accessToken(accessToken)
                        .refreshToken(newRefreshToken)
                        .build();
                return ResponseService.ok(data, "JWT được tạo mới thành công.");
            } else {
                ResponseService.unAuthorized("Token đã hết hạn.");
            }
        }
        return ResponseService.notFound("Không tìm thấy tài khoản tồn tại với email lấy từ refresh token.");
    }
}
