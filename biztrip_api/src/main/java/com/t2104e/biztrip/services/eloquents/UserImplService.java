package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.entities.User;
import com.t2104e.biztrip.repositories.UserRepository;
import com.t2104e.biztrip.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserImplService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getListUserByKeyword(String keyword) {
        return userRepository.findByKeyword(keyword);
    }
}
