package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ScheduleResponse;
import com.t2104e.biztrip.dto.ScheduleNewRequest;
import com.t2104e.biztrip.dto.ScheduleUpdateRequest;
import com.t2104e.biztrip.entities.nkl.LocationEntity;
import com.t2104e.biztrip.entities.nkl.ScheduleEntity;
import com.t2104e.biztrip.repositories.ScheduleRepository;
import com.t2104e.biztrip.services.interfaces.IScheduleService;
import jakarta.transaction.Transactional;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;


@Service
@Transactional
public class ScheduleImplService implements IScheduleService {


    @Autowired
    private ScheduleRepository scheduleRepo;

    @Autowired
    private LocationImpIService locationImpIService;
    @Autowired
    protected ModelMapper modelMapper;

    @Override
    public Page<ScheduleEntity> getListSchedules(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = sortDir.equals("asc") ? Sort.by(Sort.Order.asc(sortField)) : Sort.by(Sort.Order.desc(sortField));
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        return scheduleRepo.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);

    }

    @Override
    public ScheduleEntity getScheduleById(long id) {
        ScheduleEntity schedule = scheduleRepo.findById(id).orElse(null);
        return schedule;
    }

    @Override
    public boolean delete(long id) {
        if (getScheduleById(id)!=null){
            scheduleRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public ScheduleEntity create(ScheduleNewRequest scheduleDto) {
        ScheduleEntity schedule = convertDtoToEntity(scheduleDto);
        schedule.setLocations(new HashSet<>());
        if (scheduleDto.getLocation_ids()!=null){
            for(long id:scheduleDto.getLocation_ids()){
                LocationEntity location = locationImpIService.getLocationById(id);
                if(location!=null)
                    schedule.getLocations().add(location);
            }
        }

        schedule.setCreatedAt(new Date());
        schedule.setUpdatedAt(new Date());
        return scheduleRepo.save(schedule);
    }

    @Override
    public ScheduleEntity update(ScheduleUpdateRequest scheduleDto) {
        ScheduleEntity schedule = getScheduleById(scheduleDto.getId());
        if (schedule==null)
            return null;
        schedule.getLocations().clear();
        schedule.setLocations(new HashSet<>());
        if (scheduleDto.getLocation_ids()!=null){
            for(long id:scheduleDto.getLocation_ids()){
                LocationEntity location = locationImpIService.getLocationById(id);
                if(location!=null)
                    schedule.getLocations().add(location);
            }
        }
        schedule.setDeparture(scheduleDto.getDeparture());
        schedule.setDestination(scheduleDto.getDestination());
        schedule.setStartTime(scheduleDto.getStartTime());
        schedule.setUpdatedAt(new Date());
         scheduleRepo.save(schedule);
       return schedule;

    }

    private ScheduleEntity convertDtoToEntity(ScheduleResponse scheduleResponse) {
        return modelMapper.map(scheduleResponse, ScheduleEntity.class);
    }
    private ScheduleEntity convertDtoToEntity(ScheduleNewRequest scheduleDto) {
        Converter<String, Date> stringToDateConverter = context -> {
            String dateString = context.getSource();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                return dateFormat.parse(dateString);
            } catch (ParseException e) {
                e.printStackTrace();
                return null;
            }
        };
        modelMapper.addConverter(stringToDateConverter);

        ScheduleEntity scheduleEntity = modelMapper.map(scheduleDto, ScheduleEntity.class);
        return scheduleEntity;
    }

    private ScheduleEntity convertDtoToEntity(ScheduleUpdateRequest scheduleDto) {
        Converter<String, Date> stringToDateConverter = context -> {
            String dateString = context.getSource();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                return dateFormat.parse(dateString);
            } catch (ParseException e) {
                e.printStackTrace();
                return null;
            }
        };
        modelMapper.addConverter(stringToDateConverter);

        ScheduleEntity scheduleEntity = modelMapper.map(scheduleDto, ScheduleEntity.class);
        return scheduleEntity;
    }

}
