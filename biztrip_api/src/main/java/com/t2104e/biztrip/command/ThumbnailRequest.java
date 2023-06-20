package com.t2104e.biztrip.command;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ThumbnailRequest {


    private long id;
    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long coachId;

    @NotEmpty(message = "trường này không được để trống")
    private String path;

    @NotEmpty(message = "trường này không được để trống")
    private String name;

    @NotEmpty(message = "trường này không được để trống")
    private String title;
}
