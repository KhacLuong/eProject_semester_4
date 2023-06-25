package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.LocationEntity;
import com.t2104e.biztrip.entities.ScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
public class PickUpDetailDto {
    private long id;

    private ScheduleEntity schedule;

    private LocationEntity location;

    private String  time;

    private String status;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
