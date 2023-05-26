package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.SeatEntity;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public interface ISeatService {
    public ResponseDTO<?> getListSeat();
    public ResponseDTO<?> getOneSeatById(long id);
    public ResponseDTO<?> deleteSeat(long id);
    public ResponseDTO<?> saveSeat(@NotNull List<SeatEntity> seats);
}
