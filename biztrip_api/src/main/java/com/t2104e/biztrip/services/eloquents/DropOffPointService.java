package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.DropOffRequest;
import com.t2104e.biztrip.command.PickUpRequest;
import com.t2104e.biztrip.dto.*;
import com.t2104e.biztrip.entities.DropOffPointEntity;
import com.t2104e.biztrip.entities.PickUpPointEntity;
import com.t2104e.biztrip.repositories.DropOffRepository;
import com.t2104e.biztrip.repositories.LocationRepository;
import com.t2104e.biztrip.repositories.ScheduleRepository;
import com.t2104e.biztrip.services.interfaces.IDropOffPointService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.*;

@Service

public class DropOffPointService implements IDropOffPointService {

    @Autowired
    private DropOffRepository dropOffRepo;

    @Autowired
    private ScheduleRepository scheduleRepo;

    @Autowired
    private LocationRepository locationRepo;
    @Autowired
    protected ModelMapper modelMapper;

    @Autowired
    private ValidationHandle validationHandle;

    @Override
    public ResponseDTO<?> getListDropOffPointByScheduleId(long scheduleId, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        List<DropOffDto> pickUpDtoList = dropOffRepo.findByKeyword(scheduleId, Objects.requireNonNullElse(keyword, ""), sort);
        if (!pickUpDtoList.isEmpty()) {
            return ResponseService.ok(pickUpDtoList, "Lấy danh sách điểm đón thành công.", sortField, sortDir);
        } else {
            return ResponseService.noContent("Không có dữ liệu.");
        }
    }

    @Override
    public ResponseDTO<?> save(long scheduleId, DropOffRequest request, BindingResult result) {
        DropOffPointEntity model = new DropOffPointEntity();

        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!locationRepo.existsById(request.getLocationId())){
            return ResponseService.badRequest("Không tìm thấy điểm đón  có id = " + request.getLocationId());
        }
        if (!scheduleRepo.existsById(scheduleId)){
            return ResponseService.badRequest("Không tìm thấy tuyến đường có id = " + scheduleId);
        }

        long id = request.getId();
        if (id == 0) {
            model.setLocationId(request.getLocationId());
            model.setTime(request.getTime());
            model.setStatus(request.getStatus());
            model.setScheduleId(scheduleId);
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
        } else {

            model = dropOffRepo.findById(id).orElse(null);
            if (model == null) {
                return ResponseService.badRequest("Không tìm thấy điểm đón có id = " + id);
            }

            model.setScheduleId(scheduleId);
            model.setLocationId(request.getLocationId());
            model.setTime(request.getTime());
            model.setStatus(request.getStatus());

            model.setUpdatedAt(new Date());
        }
        var data = dropOffRepo.save(model);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }

    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<DropOffPointEntity> optional = dropOffRepo.findById(id);
        if (optional.isPresent()) {
            scheduleRepo.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy điểm đón có id = " + id);
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {
        Optional<DropOffDetailDto> optional = dropOffRepo.findDetailById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy schedule id = " + id);
    }

    @Override
    public ResponseDTO<?> saveList(long scheduleId, List<DropOffRequest> requests, BindingResult result) {
        List<DropOffPointEntity> dropOffPointEntityList = new ArrayList<>();
        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!scheduleRepo.existsById(scheduleId)){
            return ResponseService.badRequest("Không tìm thấy tuyến đường có id = " + scheduleId);
        }
        for (DropOffRequest dropOffRequest: requests) {
            if (!locationRepo.existsById(dropOffRequest.getLocationId())){
                return ResponseService.badRequest("Không tìm thấy điểm đón  có id = " + dropOffRequest.getLocationId());
            }
            DropOffPointEntity model = new DropOffPointEntity();
            model.setLocationId(dropOffRequest.getLocationId());
            model.setTime(dropOffRequest.getTime());
            model.setStatus(model.getStatus());
            model.setScheduleId(scheduleId);
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
            dropOffPointEntityList.add(model);
        }
        List<DropOffPointEntity> models = dropOffRepo.saveAll(dropOffPointEntityList);
        return ResponseService.created(models, "Thanh cong");
    }
}
