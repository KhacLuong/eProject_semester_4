package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.dto.ScheduleDetailDto;
import com.t2104e.biztrip.dto.ScheduleDto;
import com.t2104e.biztrip.dto.SchedulePickUpDto;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.CoachSchedule;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CoachScheduleRepository  extends JpaRepository<CoachSchedule, Long> {

//    @Query(value = "SELECT new com.t2104e.biztrip.dto.ScheduleDto(sp.id, sp.destinationId, sp.time, sp.status, sp.createdAt, sp.updatedAt)" +
//            "FROM schedules sp, coach_schedule cs WHERE sp.scheduleId = ?1")
//    List<SchedulePickUpDto> findByKeyword(long scheduleId);
}
