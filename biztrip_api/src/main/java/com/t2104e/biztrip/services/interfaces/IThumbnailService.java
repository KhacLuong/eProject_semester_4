package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.SeatRequest;
import com.t2104e.biztrip.command.ThumbnailRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.ThumbnailEntity;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface IThumbnailService {

    ResponseDTO<?> getListThumbnailsByCoachId(long coachId);
     ResponseDTO<?> getDetail(long id);
     ResponseDTO<?> delete(long id);
     ResponseDTO<?> saveList(@NotNull long coachId, @NotNull List<ThumbnailRequest> requests, BindingResult result);

    ResponseDTO<?> save(@NotNull long coachId, @NotNull ThumbnailRequest thumbnailRequest,BindingResult result);

}
