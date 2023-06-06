package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ResponseDTO;

public interface IUserService {
    ResponseDTO<?> getListUsers();
    ResponseDTO<?> getListUsersByKeyword(String keyword);
    ResponseDTO<?> verifyAccount(String token);
}
