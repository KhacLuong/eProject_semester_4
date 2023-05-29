package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.SeatRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.SeatEntity;
import com.t2104e.biztrip.entities.TicketEntity;
import com.t2104e.biztrip.repositories.SeatRepository;
import com.t2104e.biztrip.services.interfaces.ISeatService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SeatImplService implements ISeatService {
    @Autowired
    private SeatRepository seatRepository;
    @Override
    public ResponseDTO<?> getListSeat() {
        try {
            var data = seatRepository.getAllSeat();
            return ResponseService.ok(data, "lay danh sach");
        } catch (Exception e) {
            return ResponseService.badRequest("Loi request");
        }
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
    public ResponseDTO<?> saveSeat(@NotNull long coachId, @NotNull List<SeatRequest> seats) {
        List<SeatEntity> listSeat = new ArrayList<>();
        for (SeatRequest seat: seats) {
            TicketEntity ticket = new TicketEntity();
            ticket.setId(seat.getTicketId());
            SeatEntity seatEntity = new SeatEntity();
            seatEntity.setSeatCode(seat.getSeatCode());
            seatEntity.setType(seat.getType());
            seatEntity.setCoachId(coachId);
            seatEntity.setTickets(ticket);
            listSeat.add(seatEntity);
        }
        List<SeatEntity> saveSeats = seatRepository.saveAll(listSeat);
        return ResponseService.created(saveSeats, "Thanh cong");
    }
}
