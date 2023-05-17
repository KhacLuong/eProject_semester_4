package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.entities.UtilityEntity;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface IUtilityService {
    public Page<UtilityEntity> getListUtility(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public Optional<UtilityEntity> getOneUtilityById(long id);
    public void deleteUtility(UtilityEntity utility);
    public void saveUtility(UtilityEntity utility);
}
