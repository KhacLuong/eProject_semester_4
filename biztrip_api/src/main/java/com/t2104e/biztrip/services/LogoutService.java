package com.t2104e.biztrip.services;

import com.t2104e.biztrip.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final UserRepository userRepository;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        response.setContentType("application/json");
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            try {
                response.getWriter().write("Không có JWT hoặc JWT ko bắt đầu với `bearer`.");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return;
        }
        refreshToken = authHeader.substring(7);
        var user = userRepository.findByRefreshToken(refreshToken).orElse(null);
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            try {
                response.getWriter().write("Không tìm được tài khoản nào có email từ token.");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return;
        }
        user.setRefreshToken(null);
        user.setTokenExpired(true);
        user.setTokenRevoked(true);
        userRepository.save(user);
        SecurityContextHolder.clearContext();
        response.setStatus(HttpServletResponse.SC_OK);
        try {
            response.getWriter().write("Đăng xuất thành công.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
