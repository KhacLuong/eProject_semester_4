package com.t2104e.biztrip.command;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationRequest {
    private long id;
    @NotEmpty(message = "this field is mandatory")
    private String name;
    private long parentId;
    private boolean status;

    public boolean getStatus() {
        return this.status;
    }
}
