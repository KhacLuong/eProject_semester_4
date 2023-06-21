package com.t2104e.biztrip.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "thumbnails")
@Table(name = "thumbnails", schema = "biztrip_database", catalog = "")
public class ThumbnailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Basic
    @Column(name = "coach_id", nullable = false)
    private Long coachId;
    @Basic
    @Column(name = "path", nullable = false)
    private String path;

    @NotEmpty(message = "trường này không được để trống")
    @Column(name = "name",nullable = false)
    private String name;

    @NotEmpty(message = "trường này không được để trống")
    @Column(name = "title", nullable = false)
    private String title;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

}
