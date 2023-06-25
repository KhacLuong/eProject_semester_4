package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.dto.ScheduleDto;
import com.t2104e.biztrip.entities.CoachScheduleEntity;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.validation.BindingResult;

import java.util.List;

@Repository

public interface CoachScheduleRepository  extends JpaRepository<CoachScheduleEntity, Long> {

//    @Query(value = "SELECT new com.t2104e.biztrip.dto.ScheduleDto(s.id, l1.name, l2.name, s.day, s.status, s.isPopular, s.createdAt, s.updatedAt)" +
//            "FROM schedules s, coach_schedule cs, locations l1, locations  l2 WHERE s.id = ?1 AND cs.scheduleId = s.id AND ")
//    List<SchedulePickUpDto> findByKeyword(long scheduleId);



    @Query(value = "SELECT new com.t2104e.biztrip.dto.ScheduleDto(s.id, l1.name, l2.name, s.day, s.status, s.isPopular, s.createdAt, s.updatedAt)" +
            " FROM coach_schedule cs, schedules s, locations l1, locations l2 WHERE cs.coachId = ?1 AND " +
            "s.id = cs.scheduleId AND l1.id = s.departureId AND l2.id = s.destinationId")
    List<ScheduleDto> findAllScheduleByCoachId(long coachId);


    boolean existsCoachScheduleByCoachIdAndScheduleId(long coachId,long scheduleId);
    boolean existsCoachScheduleById(long id);
}
