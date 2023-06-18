package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.BookingTicketRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.BookingTicketEntity;
import com.t2104e.biztrip.repositories.BookingTicketRepository;
import com.t2104e.biztrip.repositories.UserRepository;
import com.t2104e.biztrip.services.interfaces.IBookingTicketService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingTicketImplService implements IBookingTicketService {
    private final BookingTicketRepository bookingTicketRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseDTO<?> booking(BookingTicketRequest request) {
        var user = userRepository.findById(request.getUserId()).orElseThrow();
        if (user.getVerifyAt() == null){
            return ResponseService.conflict("Xac thuc tai khoan truoc khi dat ve.");
        }
        var bookingTicket = BookingTicketEntity.builder()
                .isCancel(false)
                .userId(request.getUserId())
                .locationSrcId(request.getLocationSrcId())
                .locationDestId(request.getLocationDestId())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .date(request.getDate())
                .seatId(request.getSeatId())
                .reservationCode(request.getReservationCode())
                .createdAt(new Date())
                .build();
        var savedBookingTicket = bookingTicketRepository.save(bookingTicket);
        return ResponseService.created(savedBookingTicket, "Tao ve thanh cong.");
    }

    @Override
    public ResponseDTO<?> update(long id, BookingTicketRequest request) {
        var bookingTicket = bookingTicketRepository.findById(id).orElseThrow();
        bookingTicket.setLocationSrcId(request.getLocationSrcId());
        bookingTicket.setLocationDestId(request.getLocationDestId());
        bookingTicket.setStartTime(request.getStartTime());
        bookingTicket.setEndTime(request.getEndTime());
        bookingTicket.setDate(request.getDate());
        bookingTicket.setSeatId(request.getSeatId());
        bookingTicket.setDate(request.getDate());
        bookingTicket.setUpdatedAt(new Date());
        bookingTicketRepository.save(bookingTicket);
        return ResponseService.ok(bookingTicket, "Sua ve thanh cong.");
    }

    @Override
    public ResponseDTO<?> cancel(long id) {
        var bookingTicket = bookingTicketRepository.findById(id).orElseThrow();
        bookingTicket.setCancel(true);
        bookingTicket.setUpdatedAt(new Date());
        bookingTicketRepository.save(bookingTicket);
        return ResponseService.ok(bookingTicket, "Huy ve thanh cong.");
    }

    @Override
    public ResponseDTO<?> getById(long id) {
        Optional<BookingTicketEntity> data = bookingTicketRepository.findById(id);
        if (data.isPresent()) {
            return ResponseService.ok(data.get(), "Lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> getByUserId(long userId) {
        Optional<BookingTicketEntity> data = bookingTicketRepository.findByUserId(userId);
        if (data.isPresent()) {
            return ResponseService.ok(data.get(), "Lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> getList(int pageNumber, int perPage, String sortField, String sortDir) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = bookingTicketRepository.findAll(pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(
                page.getContent(),
                "Lấy danh sách đơn hàng thành công",
                pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }
}
