package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.LocationEntity;
import com.t2104e.biztrip.entities.ThumbnailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThumbnailRepository extends JpaRepository<ThumbnailEntity, Long> {

    List<ThumbnailEntity> findAllByCoachId(long coachId);

}
