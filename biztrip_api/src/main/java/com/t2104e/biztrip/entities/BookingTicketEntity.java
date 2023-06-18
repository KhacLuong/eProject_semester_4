package com.t2104e.biztrip.entities;

import lombok.*;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor // thay thế constructor không tham số
@AllArgsConstructor // thay thế constructor có tham số
@Entity(name = "booking_tickets")
@Table(name = "booking_tickets", schema = "biztrip_database", catalog = "")
public class BookingTicketEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "reservation_code")
    private String reservationCode;
    @Basic
    @Column(name = "seat_id")
    private long seatId;
    @Basic
    @Column(name = "start_time")
    @DateTimeFormat(pattern = "H:m:s")
    private Time startTime;
    @Basic
    @Column(name = "end_time")
    @DateTimeFormat(pattern = "H:m:s")
    private Time endTime;
    @Basic
    @Column(name = "date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    @Basic
    @Column(name = "location_src_id")
    private long locationSrcId;
    @Basic
    @Column(name = "location_dest_id")
    private long locationDestId;
    @Basic
    @Column(name = "user_id")
    private long userId;
    @Basic
    @Column(name = "is_cancel")
    private boolean isCancel;
    @Basic
    @Column(name = "created_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
