package com.t2104e.biztrip.command;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class ScheduleRequest {

    private long id;


    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long departureId;

    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long destinationId;


    @Max(value = 8, message = "Giá trị  không hợp lệ")
    @Min(value = 2, message = "Giá trị không hợp lệ")
    private int  day;

    private String status;

    private boolean isPopular;

}
