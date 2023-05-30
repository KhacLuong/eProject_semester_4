package com.t2104e.biztrip.entities.nkl;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;


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
    @NotEmpty(message = "this field is mandatory")
    @Column(name = "departure", nullable = false)
    private String departure;


    @Basic
    @Column(name = "stopover", nullable = true)
    private String stopOver;



    @Basic
    @NotEmpty(message = "this field is mandatory")
    @Column(name = "destination", nullable = false)
    private String destination;


//    @Basic
////    @NotNull(message = "this field is mandatory")
//    @Column(name = "start_time", nullable = true)
//    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
//    private Date startTime;


//    @Basic
////    @NotNull(message = "this field is mandatory")
//    @Column(name = "end_time", nullable = true)
//    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
//    private Date endTime;


    @Basic
    @Column(name = "create_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;


    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE,CascadeType.REFRESH})
    @JoinTable(
            name = "schedule_location",
            joinColumns = @JoinColumn(name = "schedule_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "location_id", referencedColumnName = "id"))
    private Set<LocationEntity> locations;

}
