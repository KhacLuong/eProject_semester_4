package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.LocationRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.LocationEntity;
import com.t2104e.biztrip.repositories.LocationRepository;
import com.t2104e.biztrip.services.interfaces.ILocationService;
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

    @Autowired
    private ValidationHandle validationHandle;

    public ResponseDTO<?> getListLocations(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        var page = locationRepo.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        if (page != null && totalItems > 0) {
            return ResponseService.ok(page.getContent(), "Lấy danh sách Locations thành công.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
        } else {
            return ResponseService.noContent("Không có dữ liệu.");
        }
    }

    @Override
    public ResponseDTO<?> getLocationById(long id) {

        Optional<LocationEntity> optional = locationRepo.findById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lay thanh cong");
        }
        return ResponseService.notFound("Không tìm thấy location id = " + id);
    }

    @Override
    public LocationEntity findLocationById(long id) {
        LocationEntity location = locationRepo.findById(id).orElse(null);
        return location;
    }


    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<LocationEntity> optional = locationRepo.findById(id);
        if (optional.isPresent()) {
            locationRepo.deleteScheduleLocationByIdLocation(id);

            locationRepo.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không timg thấy location id = " + id);
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
                return ResponseService.conflict("Trong danh sách  tồn tại tên: "+ request.getName());
            }
            if (!checkExistLocationById(request.getParentId())){
                return ResponseService.conflict("Trong danh sách  khong: "+ request.getName());
            }
            location.setCreatedAt(new Date());
            location.setUpdatedAt(new Date());
        } else {
            Optional<LocationEntity> optional = locationRepo.findById(id);
            if (optional.isEmpty()) {
                return ResponseService.notFound("Không timg thấy location id = " + id);
            }
            if(checkDubName(request.getName(), id)){
                return ResponseService.conflict("Trong danh sách  tồn tại tên: "+ request.getName());
            }
            location.setCreatedAt(locationRepo.findById(id).get().getCreatedAt());
            location.setUpdatedAt(new Date());
        }
        var data = locationRepo.save(location);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }





    public boolean checkDubName(String name) {
        List<LocationEntity> location = locationRepo.findAllByName(name);
        if (location != null && !location.isEmpty()) {
            return true;
        }
        return false;
    }

    public boolean checkDubName(String name,long id) {
        List<LocationEntity> location = locationRepo.findAllByNameAndIdNot(name,id);
        if (location != null && !location.isEmpty()) {
            return true;
        }
        return false;
    }
    public boolean checkExistLocationById(long id){
        LocationEntity location = locationRepo.findById(id).orElse(null);
        if (location!=null)
            return true;
        return false;
    }

    public LocationEntity findAllByName(String name) {
        List<LocationEntity> locations = locationRepo.findAllByName(name);
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
