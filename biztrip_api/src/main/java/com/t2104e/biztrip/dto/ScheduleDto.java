package com.t2104e.biztrip.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDto {


    private long id;


    private String departure;



    private String destination;


    private int  day;

    private String status;

    private boolean isPopular;



    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;



    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    public ScheduleDto(long id, String departure, String destination, int day,  String status) {
        this.id = id;
        this.departure = departure;
        this.destination = destination;
        this.day = day;
        this.status = status;
    }

}
