package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.BookingTicketRequest;
import com.t2104e.biztrip.dto.ResponseDTO;

public interface IBookingTicketService {
    ResponseDTO<?> booking(BookingTicketRequest request);
    ResponseDTO<?> update(long id, BookingTicketRequest request);
    ResponseDTO<?> cancel(long id);
    ResponseDTO<?> getById(long id);
    ResponseDTO<?> getByUserId(long userId);
    ResponseDTO<?> getList(int pageNumber, int perPage, String sortField, String sortDir);


}
