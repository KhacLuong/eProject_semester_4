package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.dto.ScheduleDto;
import com.t2104e.biztrip.entities.*;
import com.t2104e.biztrip.repositories.CoachRepository;
import com.t2104e.biztrip.repositories.CoachScheduleRepository;
import com.t2104e.biztrip.repositories.ScheduleRepository;
import com.t2104e.biztrip.services.interfaces.ICoachScheduleService;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class CoachScheduleService implements ICoachScheduleService {

    @Autowired
    private CoachScheduleRepository coachScheduleRepo;
    @Autowired
    private CoachRepository coachRepo;
    @Autowired
    private ScheduleRepository scheduleRepo;

    @Autowired
    private ValidationHandle validationHandle;

    @Override
    public ResponseDTO<?> getListScheduleByCoachId(long coachId) {
        List<ScheduleDto> models = coachScheduleRepo.findAllScheduleByCoachId(coachId);
        if (!models.isEmpty()) {
            return ResponseService.ok(models, "Lấy danh sách ảnh thành công.");
        } else {
            return ResponseService.noContent("Không có dữ liệu");
        }
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {
        return null;
    }

    @Override
    public ResponseDTO<?> delete(long id) {
        if (coachScheduleRepo.existsCoachScheduleById(id)){
            coachScheduleRepo.deleteById(id);
        }
        return ResponseService.badRequest("Không tìm thấy");

    }

    @Override
    public ResponseDTO<?> save(long coachId , long scheduleId ) {
        CoachScheduleEntity coachScheduleEntity = new CoachScheduleEntity();
        if(!coachRepo.existsById(coachId)){
            return ResponseService.badRequest("Không tìm thấy xe có  id: "+coachId );
        }
        if (!scheduleRepo.existsById(scheduleId)){
            return ResponseService.badRequest("Không tìm thấy tuyến đường  có  id: "+scheduleId );
        }
        if (coachScheduleRepo.existsCoachScheduleByCoachIdAndScheduleId(coachId,scheduleId)){
            return ResponseService.conflict("Xe này đã tồn tại tuyến đường có id: "+scheduleId );
        }

        coachScheduleEntity.setCoachId(coachId);
        coachScheduleEntity.setScheduleId(scheduleId);
        coachScheduleEntity.setCreatedAt(new Date());
        coachScheduleEntity.setUpdatedAt(new Date());
        var data = coachScheduleRepo.save(coachScheduleEntity);
        return ResponseService.created(data, "Tạo mới thành công" );
    }

    @Transactional
    @Override
    public ResponseDTO<?> saveList(@NotNull long coachId, @NotNull List<Long> scheduleIds) {
        List<CoachScheduleEntity> models = new ArrayList<>();
        if (!coachScheduleRepo.existsById(coachId)){
            return ResponseService.badRequest("Không tìm thấy xe có id = " + coachId);
        }
        for (Long scheduleId: scheduleIds) {
            if (!scheduleRepo.existsById(scheduleId)){
                return ResponseService.badRequest("Không tìm thấy tuyến đường   có id = " + scheduleId);
            }
            CoachScheduleEntity model = new CoachScheduleEntity();
            model.setCoachId(coachId);
            model.setScheduleId(scheduleId);
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
            models.add(model);
        }
        List<CoachScheduleEntity> modelResult = coachScheduleRepo.saveAll(models);
        return ResponseService.created(models, "Thanh cong");
    }

}
