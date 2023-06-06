package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.repositories.UserRepository;
import com.t2104e.biztrip.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

@Service
@Transactional
public class UserImplService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseDTO<?> getListUsers() {
        var data = userRepository.findAll();
        if (data.isEmpty()){
            return ResponseService.noContent("Không có tài khoản.");
        }
        return ResponseService.ok(data, "Lấy danh sách tài khoản thành công.");
    }

    @Override
    public ResponseDTO<?> getListUsersByKeyword(String keyword) {
        var data = userRepository.findByKeyword(keyword);
        if (data.isEmpty()){
            return ResponseService.noContent("Không tìm thấy tài khoản với từ khóa " + keyword);
        }
        return ResponseService.ok(data, "Lấy danh sách tài khoản với từ khóa " + keyword + " thành công.");
    }

    @Override
    public ResponseDTO<?> verifyAccount(String token){
        var data = userRepository.findByVerifyToken(token);
        if (data.isEmpty()){
            return ResponseService.noContent("Token không hợp lệ.");
        }
        var user = data.get();
        user.setVerifyAt(new Date());
        userRepository.save(user);
        return ResponseService.ok(null, "Tài khoản đã được xác thực thành công");
    }

    private String createRandomToken() {
        byte[] randomBytes = new byte[32];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randomBytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        if (userRepository.existsByVerifyToken(token) || userRepository.existsByPasswordResetToken(token)) {
            return createRandomToken();
        }

        return token;
    }
}
