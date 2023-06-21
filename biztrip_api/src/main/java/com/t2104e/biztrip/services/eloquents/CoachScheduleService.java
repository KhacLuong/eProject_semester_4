package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.CoachRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.ThumbnailEntity;
import com.t2104e.biztrip.entities.UtilityEntity;
import com.t2104e.biztrip.repositories.CoachScheduleRepository;
import com.t2104e.biztrip.repositories.ThumbnailRepository;
import com.t2104e.biztrip.services.interfaces.ICoachScheduleService;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;


@Service
public class CoachScheduleService implements ICoachScheduleService {

    private CoachScheduleRepository coachScheduleRepo;

//    @Override
//    public ResponseDTO<?> getListScheduleByCoachId(long coachId) {
////        List<ThumbnailEntity> models = coachScheduleRepo.findAllByCoachId(coachId);
////        if (!models.isEmpty()) {
////            return ResponseService.ok(models, "Lấy danh sách ảnh thành công.");
////        } else {
////            return ResponseService.noContent("Không có dữ liệu");
////        }
//    }

    @Override
    public ResponseDTO<?> getDetail(long id) {
        return null;
    }

    @Override
    public ResponseDTO<?> delete(long id) {
        return null;
    }

    @Override
    public ResponseDTO<?> save(CoachRequest coachRequest, BindingResult result) {
        return null;
    }

    @Override
    public List<UtilityEntity> getAllUtility() {
        return null;
    }
}
