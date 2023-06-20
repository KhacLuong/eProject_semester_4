package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Set;


@Builder
@Getter // rút gọn getter
@Setter // rút gọn setter
@NoArgsConstructor // thay thế constructor không tham số
@AllArgsConstructor // thay thế constructor có tham số
@Entity(name = "schedules")
@Table(name = "schedules", schema = "biztrip_database", catalog = "")
public class ScheduleEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Basic
    @Column(name = "departure_id",nullable = false)
    private long departureId;


    @Basic
    @Column(name = "destination_id",nullable = false)
    private long destinationId;

//    @ManyToOne
//    @JoinColumn(name = "startpoint_id")
//    private Location startpoint;
//
//    @ManyToOne
//    @JoinColumn(name = "endpoint_id")
//    private Location endpoint;

    @Basic
    @Column(name = "day", nullable = false)
    private int  day;

    @Basic
    @NotEmpty(message = "this field is mandatory")
    @Column(name = "start_time", nullable = false)
    private String  startTime;
    @Basic
    @NotEmpty(message = "this field is mandatory")
    @Column(name = "end_time", nullable = false)
    private String  endTime;


    @Basic
    @Column(name = "status")
    private String status;



//    @OneToMany(mappedBy="schedule")
//    private List<SchedulePickUpPoint> schedulePickUpPoints;



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

//    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE,CascadeType.REFRESH})
//    @JoinTable(
//            name = "schedule_location",
//            joinColumns = @JoinColumn(name = "schedule_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "location_id", referencedColumnName = "id"))
//    private Set<LocationEntity> locations;

}
