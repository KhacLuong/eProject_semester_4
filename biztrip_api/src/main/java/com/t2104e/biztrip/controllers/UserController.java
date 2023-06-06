package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.services.eloquents.UserImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserImplService userImplService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam(value = "keyword", required = false) String keyword) {
        if (keyword != null && !keyword.isEmpty())
        {
            var data = userImplService.getListUsersByKeyword(keyword);
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        }
        var data = userImplService.getListUsers();
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping(value = "/verify")
    public ResponseEntity<?> verify(@RequestParam(value = "token") String token){
        var data = userImplService.verifyAccount(token);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
}
