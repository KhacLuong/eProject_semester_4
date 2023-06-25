package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.CoachRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.UtilityEntity;
import jakarta.validation.constraints.NotNull;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface ICoachScheduleService {
    ResponseDTO<?> getListScheduleByCoachId(long coachId);

    ResponseDTO<?> getDetail(long id);

    ResponseDTO<?> delete(long id);

    ResponseDTO<?> save(long coachId, long scheduleId );


    ResponseDTO<?> saveList(@NotNull long coachId, @NotNull List<Long> scheduleIds);
}
