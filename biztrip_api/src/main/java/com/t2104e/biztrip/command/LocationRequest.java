package com.t2104e.biztrip.command;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationRequest {
    private long id;
    @NotEmpty(message = "this field is mandatory")
    private String name;
    private long parentId;

}
