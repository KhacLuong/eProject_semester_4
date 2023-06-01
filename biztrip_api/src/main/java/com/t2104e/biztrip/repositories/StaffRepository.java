package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.StaffEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StaffRepository extends JpaRepository<StaffEntity, Long> {
    @Query("select s from staffs s where concat(s.fullName, s.birthday, s.citizenIdentification, s.email, s.gender, s.joiningTime, s.phoneNumber, s.address) like %?1%")
    public Page<StaffEntity> findByKeyword(String keyword, Pageable pageable);
}
