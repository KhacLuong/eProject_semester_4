package com.t2104e.biztrip.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatRequest {
    private long ticketId;
    private String seatCode;
    private String type;
}
