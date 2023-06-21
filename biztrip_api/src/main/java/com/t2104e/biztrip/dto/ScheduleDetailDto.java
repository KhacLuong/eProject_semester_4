package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.command.LocationRequest;
import com.t2104e.biztrip.entities.LocationEntity;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
public class ScheduleDetailDto {
    private long id;
    private LocationEntity departure;

    private LocationEntity destination;


    private int  day;


    private String  startTime;

    private String  endTime;

    private String status;


    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;


    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    public ScheduleDetailDto() {
    }

    public ScheduleDetailDto(long id, LocationEntity departure, LocationEntity destination) {
        this.id = id;
        this.departure = departure;
        this.destination = destination;
    }
}
