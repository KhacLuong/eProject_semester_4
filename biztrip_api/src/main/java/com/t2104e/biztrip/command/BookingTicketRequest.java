package com.t2104e.biztrip.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingTicketRequest {
    private String reservationCode;
    private long seatId;
    private Time startTime;
    private Time endTime;
    private Date date;
    private long locationSrcId;
    private long locationDestId;
    private long userId;
}
