package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.SeatEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatCommand {
    private List<SeatEntity> seats;
}
