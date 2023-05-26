package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "coaches")
@Table(name = "coaches", schema = "biztrip_database", catalog = "")
public class CoachEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "image_path", nullable = false)
    private String imagePath;
    @Basic
    @Column(name = "plate_number", nullable = false, unique = true)
    @Size(max = 20)
    private String plateNumber;
    @Basic
    @Column(name = "total_seats")
    private String totalSeats;
    @Basic()
    @Column(name = "description" ,columnDefinition = "text")
    private String description;
    @Basic
    @Column(name = "status", nullable = false)
    private String status;

    @ManyToMany()
    @JoinTable(name = "coach_utilities",
            joinColumns = @JoinColumn(name = "coach_id"),
            inverseJoinColumns = @JoinColumn(name = "utility_id"))
    private Set<UtilityEntity> utilities;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "coaches")
    private List<ThumbnailEntity> thumbnails;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "coaches")
    private List<SeatEntity> seats;
}
