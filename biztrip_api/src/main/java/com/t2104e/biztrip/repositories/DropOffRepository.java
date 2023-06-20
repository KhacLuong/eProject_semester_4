package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.DropOffPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DropOffRepository extends JpaRepository<DropOffPoint, Long> {
}
