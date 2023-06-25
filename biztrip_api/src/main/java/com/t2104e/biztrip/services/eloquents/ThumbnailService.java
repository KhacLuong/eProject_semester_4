package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.ThumbnailRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.ThumbnailEntity;
import com.t2104e.biztrip.repositories.*;
import com.t2104e.biztrip.services.interfaces.IThumbnailService;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.*;


@Service
public class ThumbnailService implements IThumbnailService {


    @Autowired
    CoachRepository coachRepo;
    @Autowired
    ThumbnailRepository thumbnailRepo;


    @Autowired
    private ValidationHandle validationHandle;

    @Override
    public ResponseDTO<?> getListThumbnailsByCoachId( long coachId) {

        List<ThumbnailEntity> models = thumbnailRepo.findAllByCoachId(coachId);
        if (!models.isEmpty()) {
            return ResponseService.ok(models, "Lấy danh sách ảnh thành công.");
        } else {
            return ResponseService.noContent("Không có dữ liệu");
        }
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {
        Optional<ThumbnailEntity> model = thumbnailRepo.findById(id);
        if (model.isPresent()) {
            return ResponseService.ok(model, "Lấy chi tiết ảnh thành công");
        } else {
            return ResponseService.noContent("Không tìm thấy");
        }

    }

    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<ThumbnailEntity> model = thumbnailRepo.findById(id);
        if (model.isPresent()) {
                thumbnailRepo.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        } else {
            return ResponseService.notFound("Không tìm thấy");
        }
    }
    @Transactional
    @Override
    public ResponseDTO<?> saveList(@NotNull long coachId, @NotNull List<ThumbnailRequest> requests, BindingResult result) {
        List<ThumbnailEntity> models = new ArrayList<>();
        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!coachRepo.existsById(coachId)) {
            return ResponseService.badRequest("Không tìm thấy xe có id = " + coachId);
        }
        for (ThumbnailRequest request : requests) {
            ThumbnailEntity model = new ThumbnailEntity();
            model.setCoachId(coachId);
            model.setPath(request.getPath());
            model.setName(request.getName());
            model.setTitle(request.getTitle());
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
            models.add(model);
        }
        List<ThumbnailEntity> modelResult = thumbnailRepo.saveAll(models);
        return ResponseService.created(modelResult, "Thành công");
    }

    @Override
    public ResponseDTO<?> save(@NotNull long coachId, @NotNull ThumbnailRequest request, BindingResult result) {
        ThumbnailEntity model = new ThumbnailEntity();

        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!coachRepo.existsById(coachId)) {
            return ResponseService.badRequest("Không tìm thấy xe  có id = " + coachId);
        }
        model.setCoachId(coachId);
        model.setPath(request.getPath());
        model.setName(request.getName());
        model.setTitle(request.getTitle());
        model.setCreatedAt(new Date());
        model.setUpdatedAt(new Date());
        var data = thumbnailRepo.save(model);
        return ResponseService.created(data, "Tạo mới thành công");
    }



}
