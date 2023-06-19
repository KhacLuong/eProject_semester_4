package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class SchedulePickUpPoint {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Basic
    @NotEmpty(message = "this field is mandatory")
    @Column(name = "schedule_id", nullable = false)
    private long scheduleId;


    @Basic
    @NotEmpty(message = "this field is mandatory")
    @Column(name = "location_id", nullable = false)
    private long locationId;

    @Basic
    @NotEmpty(message = "this field is mandatory")
    @Column(name = "time", nullable = false)
    private String  time;
    @Basic
    @Column(name = "status")
    private String status;

    @Basic
    @Column(name = "create_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;


    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
