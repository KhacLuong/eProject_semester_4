package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.PickUpRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.dto.PickUpDetailDto;
import com.t2104e.biztrip.dto.PickUpDto;
import com.t2104e.biztrip.entities.PickUpPointEntity;
import com.t2104e.biztrip.repositories.LocationRepository;
import com.t2104e.biztrip.repositories.PickUpRepository;
import com.t2104e.biztrip.repositories.ScheduleRepository;
import com.t2104e.biztrip.services.interfaces.IPickUpPointService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;

import jakarta.validation.constraints.NotNull;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class PickUpPointService implements IPickUpPointService {

    @Autowired
    PickUpRepository pickUpRepo;

    @Autowired
    LocationRepository locationRepo;
    @Autowired
    ScheduleRepository scheduleRepo;
    @Autowired
    protected ModelMapper modelMapper;

    @Autowired
    private ValidationHandle validationHandle;


    @Override
    public ResponseDTO<?> getListPickUpPointByScheduleId(long scheduleId, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        List<PickUpDto> pickUpDtoList = pickUpRepo.findByKeyword(scheduleId, Objects.requireNonNullElse(keyword, ""), sort);
//        if (!pickUpDtoList.isEmpty()) {
            return ResponseService.ok(pickUpDtoList, "Lấy danh sách điểm đón thành công.", sortField, sortDir);
//        } else {
//            return ResponseService.noContent("Không có dữ liệu.");
//        }
    }




    @Override
    public ResponseDTO<?> save(long scheduleId, PickUpRequest request, BindingResult result) {
        PickUpPointEntity model;

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
            model = convertDtoToEntity(request);
            model.setScheduleId(scheduleId);
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
        } else {

            model = pickUpRepo.findById(id).orElse(null);
            if (model == null) {
                return ResponseService.badRequest("Không tìm thấy điểm đón có id = " + id);
            }

            model.setScheduleId(scheduleId);
            model.setLocationId(request.getLocationId());
            model.setTime(request.getTime());
            model.setStatus(request.getStatus());

            model.setUpdatedAt(new Date());
        }
        var data = pickUpRepo.save(model);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }



    @Transactional
    @Override
    public ResponseDTO<?> saveList(@NotNull long scheduleId, @NotNull List<PickUpRequest> requests,BindingResult result) {
        List<PickUpPointEntity> pickUpPointEntityList = new ArrayList<>();
        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!scheduleRepo.existsById(scheduleId)){
            return ResponseService.badRequest("Không tìm thấy tuyến đường có id = " + scheduleId);
        }
        for (PickUpRequest pickUpRequest: requests) {
            if (!locationRepo.existsById(pickUpRequest.getLocationId())){
                return ResponseService.badRequest("Không tìm thấy điểm đón  có id = " + pickUpRequest.getLocationId());
            }
            PickUpPointEntity model = convertDtoToEntity(pickUpRequest);
            model.setScheduleId(scheduleId);
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
            pickUpPointEntityList.add(model);
        }
        List<PickUpPointEntity> models = pickUpRepo.saveAll(pickUpPointEntityList);
        return ResponseService.created(models, "Thanh cong");
    }
    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<PickUpPointEntity> optional = pickUpRepo.findById(id);
        if (optional.isPresent()) {
            scheduleRepo.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy điểm đón có id = " + id);
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {

        Optional<PickUpDetailDto> optional = pickUpRepo.findDetailById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy schedule id = " + id);
    }


    private PickUpPointEntity convertDtoToEntity(PickUpRequest request) {
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

        PickUpPointEntity model = modelMapper.map(request, PickUpPointEntity.class);
        return model;
    }

}


