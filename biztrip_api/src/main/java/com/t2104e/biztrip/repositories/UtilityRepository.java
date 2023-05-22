package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.UtilityEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilityRepository extends JpaRepository<UtilityEntity, Long> {
    @Query("SELECT u from utilities u WHERE concat(u.title, u.description, u.createdAt, u.updatedAt) like %?1%")
    public Page<UtilityEntity> findByKeyword(String keyword, Pageable pageable);
}
