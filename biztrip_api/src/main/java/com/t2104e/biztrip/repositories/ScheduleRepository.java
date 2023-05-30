package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.nkl.ScheduleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {
    @Query("SELECT sc from schedules sc WHERE concat(sc.departure, sc.createdAt, sc.updatedAt, sc.destination) like %?1%")
    public Page<ScheduleEntity> findByKeyword(String keyword, Pageable pageable);

}
