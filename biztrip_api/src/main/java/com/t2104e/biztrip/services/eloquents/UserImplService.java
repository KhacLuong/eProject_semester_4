package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.User;
import com.t2104e.biztrip.repositories.UserRepository;
import com.t2104e.biztrip.services.ResponseService;
import com.t2104e.biztrip.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserImplService implements IUserService {
    @Autowired
    private UserRepository userRepository;

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
}
