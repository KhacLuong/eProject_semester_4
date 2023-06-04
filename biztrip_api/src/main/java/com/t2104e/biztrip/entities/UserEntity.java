package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor // thay thế constructor không tham số
@AllArgsConstructor // thay thế constructor có tham số
@Entity(name = "users")
@Table(name = "users", schema = "biztrip_database", catalog = "")
public class UserEntity implements UserDetails {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Email
    @Column(name = "email", unique = true, nullable = false)
    @Size(max = 100)
    @NotEmpty(message = "Email không được bỏ trống!")
    private String email;
    @Basic
    @Column(name = "phone_number", unique = true, nullable = false)
    @NotEmpty(message = "Số điện thoại không được bỏ trống!")
    @Size(max = 20, message = "Số điện thoại tối đa từ 10 đến 12 chữ số")
    private String phoneNumber;
    @Basic
    @Column(name = "password", nullable = false)
    @NotEmpty(message = "Mật khẩu không được bỏ trống!")
    @Size(min = 8, message = "Mật khẩu phải có tối thiểu 8 ký tự")
    private String password;
    @Basic
    @Column(name = "password_reset_token")
    private String passwordResetToken;
    @Basic
    @Column(name = "password_reset_expired")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date passwordResetExpired;
    @Basic
    @Column(name = "sms_token")
    private String smsToken;
    @Basic
    @Column(name = "sms_expired")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date smsExpired;
    @Basic
    @Column(name = "verify_token")
    private String verifyToken;
    @Basic
    @Column(name = "verify_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date verifyAt;
    @Basic
    @Column(name = "refresh_token")
    private String refreshToken;
//    @Basic
//    @Column(name = "refresh_token_created_at")
//    @Temporal(TemporalType.TIMESTAMP)
//    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
//    private Date refreshTokenCreatedAt;
//    @Basic
//    @Column(name = "refresh_token_expired")
//    @Temporal(TemporalType.TIMESTAMP)
//    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
//    private Date refreshTokenExpired;
    @Basic
    @Column(name = "token_revoked")
    public boolean tokenRevoked;
    @Basic
    @Column(name = "token_expired")
    public boolean tokenExpired;
    @Basic
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private RoleEntity role;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
