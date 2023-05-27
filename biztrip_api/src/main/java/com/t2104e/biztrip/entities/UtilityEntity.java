package com.t2104e.biztrip.entities;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity(name = "utilities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "utilities", schema = "biztrip_database", catalog = "")
public class UtilityEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "title", nullable = false)
    private String title;
    @Basic
    @Column(name = "description", columnDefinition = "text")
    private String description;
    @Basic
    @Column(name = "image_path", nullable = false)
    private String imagePath;
    @Basic
    @Column(name = "status", nullable = false)
    private boolean status;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

}
