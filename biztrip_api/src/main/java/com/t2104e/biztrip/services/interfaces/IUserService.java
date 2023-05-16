package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    public List<User> getListUserByKeyword(String keyword);
}
