package com.t2104e.biztrip.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.t2104e.biztrip.entities.nkl.ScheduleEntity;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class LocationDto {

    @NotEmpty(message = "this field is mandatory")
    private String name;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

}
