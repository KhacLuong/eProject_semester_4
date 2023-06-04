package com.t2104e.biztrip.services.eloquents;

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
    private final JwtService jwtService;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        response.setContentType("application/json");
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            try {
                response.getWriter().write("Không có token hoặc token ko bắt đầu với bearer.");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return;
        }
        var authToken = authHeader.substring(7);
        var userEmail = jwtService.extractUsername(authToken);
        if (userEmail == null) {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
            try {
                response.getWriter().write("Token không đúng.");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return;
        }
        var optionalUser = userRepository.findByEmail(userEmail);
        if (optionalUser.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            try {
                response.getWriter().write("Tài khoản không tồn tại.");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return;
        }
        var user = optionalUser.get();
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
