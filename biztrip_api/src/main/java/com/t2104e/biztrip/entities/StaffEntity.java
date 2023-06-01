package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "staffs")
@Table(name = "staffs", schema = "biztrip_database", catalog = "")
public class StaffEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "full_name", nullable = false)
    private String fullName;
    @Basic
    @Column(name = "birthday", nullable = false)
    private Date birthday;
    @Basic
    @Column(name = "email", nullable = false)
    private String email;
    @Basic
    @Column(name = "gender", nullable = false)
    private String gender;
    @Basic
    @Column(name = "address", nullable = false)
    private String address;
    @Basic
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    @Basic
    @Column(name = "avatar_path", nullable = false)
    private String avatarPath;
    @Basic
    @Column(name = "citizen_identification", nullable = false)
    private String citizenIdentification;
    @Basic
    @Column(name = "status", nullable = false)
    private String status;
    @Basic
    @Column(name = "joining time", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date joiningTime;
    @OneToOne
    @JoinColumn(name = "staff_position_id")
    private StaffPositionEntity staffPosition;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
