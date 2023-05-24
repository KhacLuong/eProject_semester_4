package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.UtilityEntity;

import java.util.Optional;

public interface IUtilityService {
    public ResponseDTO<?> getListUtility(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public ResponseDTO<?> getOneUtilityById(long id);
    public  ResponseDTO<?> deleteUtility(long id);
    public  ResponseDTO<?> saveUtility(UtilityEntity utility);
}
