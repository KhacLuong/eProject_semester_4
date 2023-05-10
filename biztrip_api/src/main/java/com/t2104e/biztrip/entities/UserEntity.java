package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

@Entity(name = "users")
@Table(name = "users", schema = "biztrip_database", catalog = "")
@Getter // rút gọn getter
@Setter // rút gọn setter
@NoArgsConstructor // thay thế constructor không tham số
@AllArgsConstructor // thay thế constructor có tham số
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "email")
    @NotEmpty(message = "Email không được bỏ trống!")
    private String email;
    @Basic
    @Column(name = "phone_number")
    @NotEmpty(message = "Số điện thoại không được bỏ trống!")
    @Size(min = 10, max = 12, message = "Số điện thoại tối đa từ 10 đến 12 chữ số")
    private String phoneNumber;
    @Basic
    @Column(name = "password")
    @NotEmpty(message = "Mật khẩu không được bỏ trống!")
    @Size(min = 8, message = "Mật khẩu phải có tối thiểu 8 ký tự")
    private String password;
    @Basic
    @Column(name = "password_reset_token")
    private String passwordResetToken;
    @Basic
    @Column(name = "password_reset_expired")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date passwordResetExpired;
    @Basic
    @Column(name = "sms_token")
    private String smsToken;
    @Basic
    @Column(name = "sms_expired")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date smsExpired;
    @Basic
    @Column(name = "verify_token")
    private String verifyToken;
    @Basic
    @Column(name = "verify_at")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date verifyAt;
    @Basic
    @Column(name = "refresh_token")
    private String refreshToken;
    @Basic
    @Column(name = "refresh_token_created_at")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date refreshTokenCreatedAt;
    @Basic
    @Column(name = "refresh_token_expired")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date refreshTokenExpired;
    @Basic
    @Column(name = "type")
    private String type;
    @Basic
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}