package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    @Query("SELECT u from users u where concat(u.email, u.phoneNumber) like %?1%")
    public List<UserEntity> findByKeyword(String Keyword);
}
