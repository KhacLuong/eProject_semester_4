package com.t2104e.biztrip.entities.nkl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Builder
@Getter // rút gọn getter
@Setter // rút gọn setter
@NoArgsConstructor // thay thế constructor không tham số
@AllArgsConstructor // thay thế constructor có tham số
@Entity(name = "schedules")
public class ScheduleEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Basic
    @Column(name = "departure")
    private String departure;


    @Basic
    @Column(name = "stopover")
    private String stopover;
    private String destination;


    @Basic
    @Column(name = "start_time")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date start_time;


    @Basic
    @Column(name = "end_time")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date end_time;


    @Basic
    @Column(name = "create_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date create_at;


    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date update_at;


    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("schedule")
    private List<ScheduleLocationEntity> scheduleLocationEntities = new ArrayList<>();


}
