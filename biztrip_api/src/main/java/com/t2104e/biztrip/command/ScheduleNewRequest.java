package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.nkl.LocationEntity;
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
public class ScheduleNewRequest {

    private long id;
    private String departure;



    @NotEmpty(message = "this field is mandatory")
    private String destination;




    @NotNull(message = "this field is mandatory")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date startTime;



    @NotNull(message = "this field is mandatory")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date endTime;

    @Nullable
    private Set<Long> location_ids;

    @Nullable
    public Set<Long> getLocation_ids() {
        return location_ids;
    }

    public void setLocation_ids(@Nullable Set<Long> location_ids) {
        this.location_ids = location_ids;
    }
}
