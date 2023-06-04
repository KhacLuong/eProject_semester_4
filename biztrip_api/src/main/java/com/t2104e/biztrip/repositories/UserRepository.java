package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);
    @Query("SELECT u from users u where concat(u.email, u.phoneNumber) like %?1%")
    public List<UserEntity> findByKeyword(String Keyword);
    public Optional<UserEntity> findByRefreshToken(String token);
    public Optional<UserEntity> findByPhoneNumber(String phoneNumber);
}
