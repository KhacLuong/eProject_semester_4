package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.dto.ScheduleDetailDto;
import com.t2104e.biztrip.entities.ScheduleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

//    @Query(value = "SELECT sc from schedules sc WHERE concat(sc.createdAt,sc.status, sc.updatedAt ) like %?1% " +
//            "OR sc.departureId IN (SELECT lo.id from locations lo WHERE  lo.name like %?1%) " +
//            "OR sc.destinationId IN (SELECT lo.id from locations lo WHERE  lo.name like %?1%)")
//     Page<ScheduleEntity> findByKeyword(String keyword, Pageable pageable);

    Optional<ScheduleEntity> findFirstByDepartureIdOrDestinationId(long departureId, long destinationId);


//    @Query("SELECT new com.t2104e.biztrip.dto.ScheduleDto(s.id, l1.name, l2.name, s.day, s.startTime, s.endTime,s.status, s.createdAt, s.updatedAt) FROM schedules s, locations l1, locations l2 " +
//            "WHERE s.departureId = l1.id AND s.destinationId = l2.id")
//    List<ScheduleDto> getAllSchedules();


    @Query(value = "SELECT new com.t2104e.biztrip.dto.ScheduleDto(s.id, l1.name, l2.name, s.day,s.status,s.isPopular, s.createdAt, s.updatedAt) FROM schedules s , locations l1, locations l2" +
            " WHERE s.departureId = l1.id AND s.destinationId = l2.id AND (concat(s.createdAt,s.status, s.updatedAt ) like %?1% " +
            "OR  l1.name like %?1% " +
            "OR l2.name like %?1% )")
    Page<ScheduleEntity> findByKeyword(String keyword, Pageable pageable);


    @Query(value = "SELECT new com.t2104e.biztrip.dto.ScheduleDetailDto(s.id, l1, l2, s.day,s.status, s.isPopular, s.createdAt, s.updatedAt) FROM schedules s , locations l1, locations l2" +
            " WHERE s.id = ?1 AND s.departureId = l1.id AND s.destinationId = l2.id")
    Optional<ScheduleDetailDto> findDetailById(long id);

}
