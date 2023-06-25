package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.DropOffRequest;
import com.t2104e.biztrip.command.PickUpRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface IDropOffPointService {
    ResponseDTO<?> getListDropOffPointByScheduleId(long scheduleId, String sortField, String sortDir, String keyword);


    ResponseDTO<?> save(long scheduleId, DropOffRequest request, BindingResult result);

    ResponseDTO<?> delete(long id);

    ResponseDTO<?> getDetail(long id);
    public ResponseDTO<?> saveList(@NotNull long scheduleId, @NotNull List<DropOffRequest> dropOffRequestList, BindingResult result);

}
