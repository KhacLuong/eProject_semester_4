package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.CoachRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.UtilityEntity;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface ICoachService {
    public ResponseDTO<?> getListCoach(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public ResponseDTO<?> getDetail(long id);
    public ResponseDTO<?> delete(long id);
    public ResponseDTO<?> save(CoachRequest coachRequest , BindingResult result);
    public List<UtilityEntity> getAllUtility();

}
