package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.command.ScheduleRequest;
import com.t2104e.biztrip.dto.ScheduleDetailDto;
import com.t2104e.biztrip.entities.ScheduleEntity;
import com.t2104e.biztrip.repositories.ScheduleRepository;
import com.t2104e.biztrip.services.interfaces.IScheduleService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.transaction.Transactional;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
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
public class ScheduleImplService implements IScheduleService {


    @Autowired
    private ScheduleRepository scheduleRepo;

    @Autowired
    private LocationImpIService locationImpIService;
    @Autowired
    protected ModelMapper modelMapper;

    @Autowired
    private ValidationHandle validationHandle;

    @Override
    public ResponseDTO<?> getListSchedules(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        var page = scheduleRepo.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        if (page != null) {
            return ResponseService.ok(page.getContent(), "lấy danh sách  tuyến đường thành công.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
        } else {
            return ResponseService.noContent("Không có dữ liệu.");
        }
    }
//    @Override
//    public ResponseDTO<?> getListSchedules() {
//        var scheduleDtoList =scheduleRepo.getAllSchedules();
//        return ResponseService.ok(scheduleDtoList, "lấy danh sách  tuyến đường thành công.");
//    }


    @Override
    public ResponseDTO<?> getScheduleById(long id) {

        Optional<ScheduleDetailDto> optional = scheduleRepo.findDetailById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy schedule id = " + id);
    }




    @Override
    public ResponseDTO<?> save(ScheduleRequest request, BindingResult result) {
        ScheduleEntity schedule = new ScheduleEntity();

        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!locationImpIService.checkExistLocationById(request.getDepartureId())){
            return ResponseService.badRequest("Không tìm thấy điểm xuất phát  có id = " + request.getDepartureId());
        }
        if (!locationImpIService.checkExistLocationById(request.getDestinationId())){
            return ResponseService.badRequest("Không tìm thấy điểm kết thúc có id = " + request.getDestinationId());
        }

        long id = request.getId();
        if (id == 0) {
            schedule = convertDtoToEntity(request);

            schedule.setCreatedAt(new Date());
            schedule.setUpdatedAt(new Date());
        } else {

            schedule = findScheduleById(id);
            if (schedule == null) {
                return ResponseService.badRequest("Không tìm thấy tuyến đường có id = " + id);
            }

            schedule.setDepartureId(request.getDepartureId());
            schedule.setDestinationId(request.getDestinationId());
            schedule.setDay(request.getDay());
            schedule.setStatus(request.getStatus());
            schedule.setStartTime(request.getStartTime());
            schedule.setEndTime(request.getEndTime());
            schedule.setUpdatedAt(new Date());
        }
        var data = scheduleRepo.save(schedule);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }

    @Override
    public ScheduleEntity findScheduleById(long id) {
        return scheduleRepo.findById(id).orElse(null);
    }


    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<ScheduleEntity> optional = scheduleRepo.findById(id);
        if (optional.isPresent()) {
            scheduleRepo.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không timg thấy tuyến đường có id = " + id);
    }



    private ScheduleEntity convertDtoToEntity(ScheduleRequest scheduleDto) {
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
