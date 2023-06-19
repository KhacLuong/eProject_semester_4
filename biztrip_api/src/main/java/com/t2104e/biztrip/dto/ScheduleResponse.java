package com.t2104e.biztrip.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class ScheduleResponse {


    private long id;
    @NotEmpty(message = "this field is mandatory")
    private String departure;


    @NotEmpty(message = "this field is mandatory")
    private String destination;



    @NotNull(message = "this field is mandatory")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date startTime;


    @NotNull(message = "this field is mandatory")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date endTime;


    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;



    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    

    public ScheduleResponse(long id, String departure, String destination, Date startTime, Date endTime, Date createdAt, Date updatedAt) {
        this.id = id;
        this.departure = departure;
        this.destination = destination;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public ScheduleResponse(long id, String departure, String destination, Date startTime, Date endTime) {
        this.id = id;
        this.departure = departure;
        this.destination = destination;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public ScheduleResponse() {
    }
}
