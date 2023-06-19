package com.t2104e.biztrip.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "locations")
public class LocationEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Basic
    @NotEmpty(message = "this field is mandatory")
    @NotNull(message = "this field is mandatory")
    @Column(name = "location_name", unique = true)
    private String name;

    @Basic
    @NotEmpty(message = "this field is mandatory")
    @NotNull(message = "this field is mandatory")
    @Column(name = "parent_id", unique = true)
    private String parentId;


    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;


    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
