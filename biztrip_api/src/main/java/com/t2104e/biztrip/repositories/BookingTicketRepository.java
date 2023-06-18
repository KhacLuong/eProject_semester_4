package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.BookingTicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingTicketRepository extends JpaRepository<BookingTicketEntity, Long> {
    Optional<BookingTicketEntity> findByUserId(long userId);
}
