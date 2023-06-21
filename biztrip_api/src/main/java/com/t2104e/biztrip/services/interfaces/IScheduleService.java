package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.ScheduleRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.ScheduleEntity;
import org.springframework.validation.BindingResult;

public interface IScheduleService {
    ResponseDTO<?> getListSchedules(int pageNumber, int perPage, String sortField, String sortDir, String keyword);

    ResponseDTO<?> save(ScheduleRequest request, BindingResult result);

    ScheduleEntity findScheduleById(long id);

    ResponseDTO<?> delete(long id);

    ResponseDTO<?> getScheduleById(long id);
//    boolean checkExistScheduleByLocationId(long locastionId);

//    ResponseDTO<?> getListSchedules();

}
