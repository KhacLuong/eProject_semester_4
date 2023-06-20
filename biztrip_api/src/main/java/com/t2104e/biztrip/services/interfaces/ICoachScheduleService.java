package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.CoachRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.UtilityEntity;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface ICoachScheduleService {
//    ResponseDTO<?> getListScheduleByCoachId(long coachId);

    ResponseDTO<?> getDetail(long id);

    ResponseDTO<?> delete(long id);

    ResponseDTO<?> save(CoachRequest coachRequest, BindingResult result);

    List<UtilityEntity> getAllUtility();
}
