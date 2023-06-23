package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.LocationRequest;
import com.t2104e.biztrip.command.ScheduleRequest;
import com.t2104e.biztrip.dto.LocationResponse;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.LocationEntity;
import com.t2104e.biztrip.repositories.LocationRepository;
import com.t2104e.biztrip.repositories.ScheduleRepository;
import com.t2104e.biztrip.services.interfaces.ILocationService;
import com.t2104e.biztrip.services.interfaces.IScheduleService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.transaction.Transactional;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
@Transactional
public class LocationImpIService implements ILocationService {
    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ScheduleRepository scheduleRepo;

    @Autowired
    protected ModelMapper modelMapper;

    @Autowired
    private ValidationHandle validationHandle;

    public ResponseDTO<?> getListLocations(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = locationRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        List<LocationResponse> listLocation = new ArrayList<>();
        for (LocationEntity location : page.getContent()) {
            LocationResponse locationResponse = new LocationResponse();
            locationResponse.setId(location.getId());
            locationResponse.setName(location.getName());
            locationResponse.setStatus(location.getStatus());
            Optional<LocationEntity> locationParent = locationRepository.findById(location.getParentId());
            locationParent.ifPresent(locationResponse::setLocationParent);
            locationResponse.setCreatedAt(location.getCreatedAt());
            locationResponse.setUpdatedAt(location.getUpdatedAt());
            listLocation.add(locationResponse);
        }

        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();

        return ResponseService.ok(listLocation, "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getAllLocations(String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        List<LocationEntity> locationEntities = locationRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), sort);
        List<LocationResponse> listLocation = new ArrayList<>();
        for (LocationEntity location : locationEntities) {
            LocationResponse locationResponse = new LocationResponse();
            locationResponse.setId(location.getId());
            locationResponse.setName(location.getName());
            locationResponse.setStatus(location.getStatus());
            Optional<LocationEntity> locationParent = locationRepository.findById(location.getParentId());
            locationParent.ifPresent(locationResponse::setLocationParent);
            locationResponse.setCreatedAt(location.getCreatedAt());
            locationResponse.setUpdatedAt(location.getUpdatedAt());
            listLocation.add(locationResponse);
        }
        return ResponseService.ok(listLocation, "Lấy danh sách địa điểm thành công.", sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getLocationById(long id) {

        Optional<LocationEntity> optional = locationRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lay thanh cong");
        }
        return ResponseService.notFound("Không tìm thấy location id = " + id);
    }

    @Override
    public LocationEntity findLocationById(long id) {
        LocationEntity location = locationRepository.findById(id).orElse(null);
        return location;
    }


    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<LocationEntity> optional = locationRepository.findById(id);
        if (optional.isPresent()) {
            if(scheduleRepo.findFirstByDepartureIdOrDestinationId(id, id).isPresent()){
                return ResponseService.conflict("Không thể xóa vì có liên kết bảng khác với location id = " + id);
            }
//            locationRepository.deleteScheduleLocationByIdLocation(id);
            locationRepository.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy location id = " + id);
    }


    @Override
    public ResponseDTO<?> save(LocationRequest request, BindingResult result) {
        LocationEntity location = new LocationEntity();
        location.setName(request.getName());
        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        long id = request.getId();
        if (id == 0) {
            if(checkDubName(request.getName())){
                return ResponseService.conflict("Trong danh sách tồn tại tên: "+ request.getName());
            }
            if (request.getParentId()>0&&!checkExistLocationById(request.getParentId())){
                return ResponseService.conflict("Trong danh sách không tồn tại vị trí có id = : "+ request.getParentId());
            }
            location.setStatus(request.getStatus());
            location.setParentId(request.getParentId());
            location.setCreatedAt(new Date());
            location.setUpdatedAt(new Date());
        } else {
            Optional<LocationEntity> optional = locationRepository.findById(id);
            if (optional.isEmpty()) {
                return ResponseService.notFound("Không tìm thấy location id = " + id);
            }
            if (request.getId() == request.getParentId()){
                return ResponseService.badRequest("id và parentId không được phép trùng nhau");

            }
            if(checkDuplicationName(request.getName(), id)){
                return ResponseService.conflict("Trong danh sách đã tồn tại tên: "+ request.getName());
            }
            location.setId(id);
            location.setName(request.getName());
            location.setParentId(request.getParentId());
            location.setStatus(request.getStatus());
            location.setCreatedAt(locationRepository.findById(id).get().getCreatedAt());
            location.setUpdatedAt(new Date());
        }
        var data = locationRepository.save(location);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }

    public boolean checkDubName(String name) {
        List<LocationEntity> location = locationRepository.findAllByName(name);
        if (location != null && !location.isEmpty()) {
            return true;
        }
        return false;
    }

    public boolean checkDuplicationName(String name,long id) {
        List<LocationEntity> location = locationRepository.findAllByNameAndIdNot(name,id);
        if (location != null && !location.isEmpty()) {
            return true;
        }
        return false;
    }
    public boolean checkExistLocationById(long id){
        LocationEntity location = locationRepository.findById(id).orElse(null);
        if (location!=null)
            return true;
        return false;
    }

    public LocationEntity findAllByName(String name) {
        List<LocationEntity> locations = locationRepository.findAllByName(name);
        if (locations != null && locations.size() > 0)
            return locations.get(0);
        return null;
    }
    private LocationEntity convertDtoToEntity(LocationRequest locationRequest) {
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

        return modelMapper.map(locationRequest, LocationEntity.class);
    }
}
