package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.UtilityEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICoachService {
    public Page<CoachEntity> getListCoach(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public CoachEntity getOneCoachById(long id);
    public void deleteCoach(CoachEntity coach);
    public void saveCoach(CoachEntity coach);
    public List<UtilityEntity> getAllUtility();

}
