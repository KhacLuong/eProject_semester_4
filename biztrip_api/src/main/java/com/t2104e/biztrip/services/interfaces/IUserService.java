package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ResponseDTO;

public interface IUserService {
    public ResponseDTO<?> getListUsersByKeyword(String keyword);
}
