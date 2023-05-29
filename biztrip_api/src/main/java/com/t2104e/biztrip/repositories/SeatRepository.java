package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.SeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<SeatEntity, Long> {
    @Query("select s from seats s")
    public List<SeatEntity> getAllSeat();
}
