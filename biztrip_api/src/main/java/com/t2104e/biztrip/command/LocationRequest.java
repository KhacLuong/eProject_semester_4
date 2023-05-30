package com.t2104e.biztrip.command;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationRequest {
    private long id;
    @NotEmpty(message = "this field is mandatory")
    private String name;
}
