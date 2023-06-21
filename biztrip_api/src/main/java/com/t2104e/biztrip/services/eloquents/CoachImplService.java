package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.CoachRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.dto.ScheduleDetailDto;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.LocationEntity;
import com.t2104e.biztrip.entities.ScheduleEntity;
import com.t2104e.biztrip.entities.UtilityEntity;
import com.t2104e.biztrip.repositories.CoachRepository;
import com.t2104e.biztrip.repositories.UtilityRepository;
import com.t2104e.biztrip.services.interfaces.ICoachService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class CoachImplService implements ICoachService {
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private ValidationHandle validationHandle;
    @Autowired
    UtilityRepository utilityRepository;
    @Override
    public ResponseDTO<?>  getListCoach(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        var page = coachRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        if (page != null) {
            return ResponseService.ok(page.getContent(), "lấy danh sách  tuyến đường thành công.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
        } else {
            return ResponseService.noContent("Không có dữ liệu.");
        }
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {

        Optional<CoachEntity> optional = coachRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy schedule id = " + id);
    }


    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<CoachEntity> optional = coachRepository.findById(id);
        if (optional.isPresent()) {
            coachRepository.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không timg thấy tuyến đường có id = " + id);
    }


    @Override
    public ResponseDTO<?> save(CoachRequest request, BindingResult result) {
        CoachEntity coach = new CoachEntity();

        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        long id = request.getId();
        if (id == 0) {
            if( coachRepository.existsByPlateNumber(request.getPlateNumber())){
                return ResponseService.conflict("Đã tồn tại xe có  biên số = " + request.getPlateNumber());
            }

            coach.setCreatedAt(new Date());
        } else {
            Optional<CoachEntity> optional = coachRepository.findById(id);
            if (optional.isEmpty()) {
                return ResponseService.notFound("Không tìm thấy location id = " + id);
            }
            if (coachRepository.existsByPlateNumberAndIdNot(request.getPlateNumber(),id)){
                return ResponseService.conflict("Đã tồn tại xe có  biên số = " + request.getPlateNumber());
            }
        }
        coach.setName(request.getName());
        coach.setImagePath(request.getImagePath());
        coach.setPlateNumber(request.getPlateNumber());
        coach.setTotalSeats(request.getTotalSeats());
        coach.setDescription(request.getDescription());
        coach.setStatus(request.getStatus());
        coach.setUpdatedAt(new Date());
        var data = coachRepository.save(coach);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }

    @Override
    public List<UtilityEntity> getAllUtility() {
        return utilityRepository.findAll();
    }
}
