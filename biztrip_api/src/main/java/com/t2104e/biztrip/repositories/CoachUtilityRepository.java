package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.CoachUtilityEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CoachUtilityRepository extends JpaRepository<CoachUtilityEntity, Long> {
    @Query("SELECT cu from coach_utilities cu WHERE concat(cu.title, cu.description, cu.createdAt, cu.updatedAt) like %?1%")
    public Page<CoachUtilityEntity> findByKeyword(String keyword, Pageable pageable);
}
