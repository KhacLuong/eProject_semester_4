package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.User;
import com.t2104e.biztrip.services.eloquents.UserImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserImplService userImplService;
    private final ResponseDTO RESPONSE_DTO = new ResponseDTO();
    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam(value = "keyword", required = false) String keyword) {
        List<User> users = userImplService.getListUserByKeyword(keyword);
        if (users.size() == 0) {
            return ResponseEntity.noContent().build();
        }
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("success");
        RESPONSE_DTO.setMessage("");
        RESPONSE_DTO.setData(users);
        return ResponseEntity.ok(RESPONSE_DTO);
    }
}
