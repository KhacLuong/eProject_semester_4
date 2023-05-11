package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.entities.CoachUtilityEntity;

import java.util.List;

public interface ICoachUtilityService {
    public List<CoachUtilityEntity> getListCoachUtility();
    public void saveCoachUtility(CoachUtilityEntity coachUtility);
}
