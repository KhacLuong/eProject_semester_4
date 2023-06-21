package com.t2104e.biztrip.command;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class coachScheduleRequest {

    private long id;

    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long scheduleId;

    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long coachId;

}
