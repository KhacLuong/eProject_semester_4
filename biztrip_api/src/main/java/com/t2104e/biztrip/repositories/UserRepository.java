package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    @Query("SELECT u from users u where concat(u.email, u.phoneNumber) like %?1%")
    public List<User> findByKeyword(String Keyword);
    public Optional<User> findByRefreshToken(String token);
}
