package com.t2104e.biztrip.command;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CoachRequest {

    private long id;


    @NotEmpty(message = "trường này không được để trống")
    private String name;
    private String imagePath;
    @NotEmpty(message = "trường này không được để trống")
    @Column(name = "plate_number", nullable = false, unique = true)
    @Size(max = 20)
    private String plateNumber;
    @Basic
    @Min(value = 0,message = "Giá trị không hợp lệ")
    @Column(name = "total_seats")
    private long totalSeats;
    @Basic()
    @Column(name = "description", columnDefinition = "text")
    private String description;
    @Basic
    @Column(name = "status", nullable = false)
    private String status;
}
