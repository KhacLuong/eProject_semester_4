package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.entities.CoachUtilityEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ICoachUtilityService {
    public Page<CoachUtilityEntity> getListCoachUtility(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public Optional<CoachUtilityEntity> getOneCoachUtilityById(long id);
    public void deleteCoachUtility(CoachUtilityEntity coachUtility);
    public void saveCoachUtility(CoachUtilityEntity coachUtility);
}
