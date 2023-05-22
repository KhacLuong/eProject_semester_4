package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ScheduleNewRequest;
import com.t2104e.biztrip.dto.ScheduleUpdateRequest;
import com.t2104e.biztrip.entities.nkl.ScheduleEntity;
import org.springframework.data.domain.Page;

public interface IScheduleService {
    public Page<ScheduleEntity> getListSchedules(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public ScheduleEntity getScheduleById(long id);
    public boolean delete(long id);
    public ScheduleEntity create(ScheduleNewRequest scheduleDto);
    public ScheduleEntity update(ScheduleUpdateRequest scheduleDto);
}
