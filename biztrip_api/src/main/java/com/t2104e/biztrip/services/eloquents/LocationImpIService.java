package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.LocationDto;
import com.t2104e.biztrip.entities.nkl.LocationEntity;
import com.t2104e.biztrip.entities.nkl.ScheduleEntity;
import com.t2104e.biztrip.repositories.LocationRepository;
import com.t2104e.biztrip.services.interfaces.ILocationService;
import jakarta.transaction.Transactional;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
@Transactional
public class LocationImpIService implements ILocationService {


    @Autowired
    private LocationRepository locationRepo;

    @Autowired
    protected ModelMapper modelMapper;

//    @Override
//    public Page<LocationEntity> getListLocations(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
//        Sort sort = sortDir.equals("asc") ? Sort.by(Sort.Order.asc(sortField)) : Sort.by(Sort.Order.desc(sortField));
//        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
//        return locationRepo.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
//    }
    @Override
    public Page<LocationEntity> getListLocations(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = sortDir.equals("asc") ? Sort.by(Sort.Order.asc(sortField)) : Sort.by(Sort.Order.desc(sortField));
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        return locationRepo.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);

    }

    @Override
    public LocationEntity getLocationById(long id) {
        return locationRepo.findById(id).orElse(null);
    }

    @Override
    public boolean delete(long id) {

        if (getLocationById(id)!=null){
            locationRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public LocationEntity update(LocationEntity location) {
            location.setUpdatedAt(new Date());
        return  locationRepo.save(location);

    }

    @Override
    public LocationEntity create(LocationDto request) {

        LocationEntity location = convertDtoToEntity(request);
        location.setName(request.getName());
        location.setCreatedAt(new Date());
        location.setUpdatedAt(new Date());
        return locationRepo.save(location);

    }

    public boolean checkDubName(String name){
     List<LocationEntity> location = locationRepo.findAllByName(name);
         if(location!=null&&!location.isEmpty()){
             return true;
         }
         return false;
    }
    public LocationEntity findAllByName(String name){
        List<LocationEntity>  locations=  locationRepo.findAllByName( name);
        if (locations!=null&&locations.size()>0)
            return locations.get(0);
        return null;
    }

    private LocationEntity convertDtoToEntity(LocationDto locationDto) {
        Converter<String, Date> stringToDateConverter = new Converter<String, Date>() {
            @Override
            public Date convert(MappingContext<String, Date> context) {
                String dateString = context.getSource();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                try {
                    return dateFormat.parse(dateString);
                } catch (ParseException e) {
                    e.printStackTrace();
                    return null;
                }
            }
        };

        return modelMapper.map(locationDto, LocationEntity.class);
    }
}
