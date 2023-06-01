package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "seats")
@Table(name = "seats", schema = "biztrip_database", catalog = "")
public class SeatEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "seat_code", nullable = false)
    private String seatCode;
    @Basic
    @Column(name = "type", nullable = false)
    private String type;
    @Basic
    @Column(name = "coach_id", nullable = false)
    private long coachId;
    @OneToOne
    @JoinColumn(name = "ticket_id")
    private TicketEntity tickets;
}
