package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.TicketEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    @Query("select t from tickets t where concat(t.title, t.fare, t.createdAt, t.updatedAt) like %?1%")
    public Page<TicketEntity> findByKeyword(String Keyword, Pageable pageable);
}
