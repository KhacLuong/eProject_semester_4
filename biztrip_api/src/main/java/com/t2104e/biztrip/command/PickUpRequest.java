package com.t2104e.biztrip.command;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class PickUpRequest {


    private long id;

//    @Min(value = 0, message = "Giá trị không hợp lệ")
//    private long scheduleId;
    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long locationId;
    @NotEmpty(message = "Không được bỏ trống trường này")
    private String  time;
    private String status;
}
