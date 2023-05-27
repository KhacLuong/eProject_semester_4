package com.t2104e.biztrip.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @Column(name = "description", columnDefinition = "text")
    private String description;
    @Basic
    @Column(name = "status", nullable = false)
    private String status;
    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "coach_utilities",
            joinColumns={@JoinColumn(name = "coach_id")},
            inverseJoinColumns={@JoinColumn(name = "utility_id")})
    private List<UtilityEntity> utilities;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "coach_id")
    private List<SeatEntity> seats;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "coach_id")
    private List<ThumbnailEntity> thumbnails;
}
