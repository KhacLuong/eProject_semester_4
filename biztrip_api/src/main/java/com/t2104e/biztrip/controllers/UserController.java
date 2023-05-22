package com.t2104e.biztrip.controllers;

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

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam(value = "keyword", required = false) String keyword) {
        if (keyword != null && !keyword.isEmpty())
        {
            return ResponseEntity.ok(userImplService.getListUsersByKeyword(keyword));
        }
        return ResponseEntity.ok(userImplService.getListUsers());
    }
}
