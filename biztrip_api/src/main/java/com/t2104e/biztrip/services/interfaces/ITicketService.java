package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.TicketEntity;

public interface ITicketService {
    public ResponseDTO<?> getListTicket(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public ResponseDTO<?> getOneTicketById(long id);
    public ResponseDTO<?> deleteTicket(long id);
    public ResponseDTO<?> saveTicket(TicketEntity ticket);
}
