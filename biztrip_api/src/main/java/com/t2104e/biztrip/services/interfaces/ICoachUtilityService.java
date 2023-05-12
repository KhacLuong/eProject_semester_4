package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.entities.CoachUtilityEntity;

import java.util.List;
import java.util.Optional;

public interface ICoachUtilityService {
    public List<CoachUtilityEntity> getListCoachUtility();
    public Optional<CoachUtilityEntity> getOneCoachUtilityById(int id);
    public void deleteCoachUtility(CoachUtilityEntity coachUtility);
    public void saveCoachUtility(CoachUtilityEntity coachUtility);
}
