package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.nkl.LocationEntity;
import com.t2104e.biztrip.entities.nkl.ScheduleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LocationRepository extends JpaRepository<LocationEntity, Long> {

    @Query("SELECT lo from locations lo WHERE concat(lo.name, lo.createdAt, lo.updatedAt) like %?1%")
    public Page<LocationEntity> findByKeyword(String keyword, Pageable pageable);
    public List<LocationEntity> findAllByName(String name);
}
