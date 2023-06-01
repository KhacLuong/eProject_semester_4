package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.StaffEntity;

public interface IStaffService {
    public ResponseDTO<?> getListStaff(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public ResponseDTO<?> getOneStaffById(long id);
    public ResponseDTO<?> deleteStaff(long id);
    public ResponseDTO<?> saveStaff(StaffEntity staff);
}
