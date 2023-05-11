package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.CoachUtilityEntity;
import com.t2104e.biztrip.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoachUtilityRepository extends JpaRepository<CoachUtilityEntity, Integer> {

}
