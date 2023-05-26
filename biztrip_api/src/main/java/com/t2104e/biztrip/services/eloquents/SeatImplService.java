package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.SeatCommand;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.SeatEntity;
import com.t2104e.biztrip.repositories.SeatRepository;
import com.t2104e.biztrip.services.interfaces.ISeatService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SeatImplService implements ISeatService {
    @Autowired
    private SeatRepository seatRepository;
    @Override
    public ResponseDTO<?> getListSeat() {
        var data = seatRepository.findAll();
        return ResponseService.ok(data, "lay danh sach");
    }

    @Override
    public ResponseDTO<?> getOneSeatById(long id) {
        Optional<SeatEntity> op = seatRepository.findById(id);
        if (op.isPresent()) {
            return ResponseService.ok(op.get(), "Lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> deleteSeat(long id) {
        Optional<SeatEntity> op = seatRepository.findById(id);
        if (op.isPresent()) {
            seatRepository.delete(op.get());
            return ResponseService.ok(null, "Xoa thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> saveSeat(@NotNull List<SeatEntity> seats) {
        for (SeatEntity seat: seats) {
            long id = seat.getId();
            if (id == 0) {
                seat.setCreatedAt(new Date());
            }
            seat.setUpdatedAt(new Date());
            var data = seatRepository.save(seat);
        }

        return ResponseService.created(seats, "Thanh cong");
    }
}
