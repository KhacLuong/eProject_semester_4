package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.entities.UserEntity;

import java.util.List;

public interface IUserService {
    public List<UserEntity> getListUserByKeyword(String keyword);
}
