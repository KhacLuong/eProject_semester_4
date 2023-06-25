package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.dto.DropOffDetailDto;
import com.t2104e.biztrip.dto.DropOffDto;
import com.t2104e.biztrip.dto.PickUpDetailDto;
import com.t2104e.biztrip.dto.PickUpDto;
import com.t2104e.biztrip.entities.DropOffPointEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DropOffRepository extends JpaRepository<DropOffPointEntity, Long> {

    @Query(value = "SELECT new com.t2104e.biztrip.dto.DropOffDto(sp.id, l.name, sp.time, sp.status, sp.createdAt, sp.updatedAt)" +
            "FROM schedule_drop_off_point sp, locations l WHERE sp.scheduleId = ?1 AND sp.locationId=l.id AND " +
            " (concat(sp.time,sp.status, sp.createdAt, sp.updatedAt) like %?2% OR  l.name like %?2%)")
    List<DropOffDto> findByKeyword(long scheduleId, String keyword, Sort sort);

    @Query(value = "SELECT new com.t2104e.biztrip.dto.DropOffDetailDto(sp.id, s, l, sp.time, sp.status, s.createdAt, s.updatedAt) FROM schedule_drop_off_point sp, schedules s , locations l" +
            " WHERE sp.id = ?1 AND sp.scheduleId = s.id AND sp.locationId = l.id")
    Optional<DropOffDetailDto> findDetailById(long id);
}
