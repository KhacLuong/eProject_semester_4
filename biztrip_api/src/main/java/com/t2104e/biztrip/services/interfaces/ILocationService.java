package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.LocationDto;
import com.t2104e.biztrip.entities.nkl.LocationEntity;
import org.springframework.data.domain.Page;

public interface ILocationService {

    public Page<LocationEntity> getListLocations(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public LocationEntity getLocationById(long id);
    public boolean delete(long id);
    public LocationEntity update(LocationEntity location);
    public LocationEntity create(LocationDto locationDto);
    public boolean checkDubName(String name);
    public LocationEntity findAllByName(String name);
}
