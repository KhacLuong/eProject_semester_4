package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.TicketEntity;
import com.t2104e.biztrip.repositories.TicketRepository;
import com.t2104e.biztrip.services.interfaces.ITicketService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class TicketImplService implements ITicketService {
    @Autowired
    private TicketRepository ticketRepository;
    @Override
    public ResponseDTO<?> getListTicket(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = ticketRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "Lấy danh", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getOneTicketById(long id) {
        Optional<TicketEntity> op = ticketRepository.findById(id);
        if (op.isPresent()) {
            return ResponseService.ok(op.get(), "Lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> deleteTicket(long id) {
        Optional<TicketEntity> op = ticketRepository.findById(id);
        if (op.isPresent()) {
            ticketRepository.delete(op.get());
            return ResponseService.ok(null, "Xoa thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> saveTicket(TicketEntity ticket) {
        long id = ticket.getId();
        if (id == 0) {
            ticket.setCreatedAt(new Date());
        }
        ticket.setUpdatedAt(new Date());
        var data = ticketRepository.save(ticket);
        return ResponseService.created(data, id == 0 ? "Tao thanh cong" : "Cap nhat thanh cong");
    }
}
