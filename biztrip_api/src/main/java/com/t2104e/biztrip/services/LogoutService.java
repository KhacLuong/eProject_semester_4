package com.t2104e.biztrip.services;

//import com.alibou.security.token.TokenRepository;
import com.t2104e.biztrip.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

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
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        var storedToken = userRepository.findByRefreshToken(refreshToken)
                .orElse(null);
        if (storedToken != null) {
            storedToken.setRefreshToken(null);
            storedToken.setTokenExpired(true);
            storedToken.setTokenRevoked(true);
            userRepository.save(storedToken);
            SecurityContextHolder.clearContext();
        }
    }
}
