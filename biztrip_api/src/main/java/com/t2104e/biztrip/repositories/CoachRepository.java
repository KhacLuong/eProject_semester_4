package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.CoachEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CoachRepository extends JpaRepository<CoachEntity, Long> {
    @Query("SELECT c from coaches c where concat(c.plateNumber, c.totalSeats, c.description, c.status, c.createdAt, c.updatedAt) like %?1%")
    public Page<CoachEntity> findByKeyword(String keyword, Pageable pageable);

    public CoachEntity getCoachEntitiesById(@Param("id") long id);
}
