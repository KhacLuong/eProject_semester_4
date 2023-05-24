package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.UtilityEntity;
import com.t2104e.biztrip.repositories.UtilityRepository;
import com.t2104e.biztrip.services.interfaces.IUtilityService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class UtilityImplService implements IUtilityService {
    @Autowired
    private UtilityRepository utilityRepository;

    @Override
    public ResponseDTO<?> getListUtility(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        var page = utilityRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "Lấy danh", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getOneUtilityById(long id) {
        Optional<UtilityEntity> utility = utilityRepository.findById(id);
        if (utility.isPresent()) {
            return ResponseService.ok(utility.get(), "lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay id = " + id);
    }

    @Override
    public ResponseDTO<?> deleteUtility(long id) {
        Optional<UtilityEntity> utility = utilityRepository.findById(id);
        if (utility.isPresent()) {
            utilityRepository.deleteById(id);
            return ResponseService.ok(null, "Xoa thanh cong");
        }
        return ResponseService.notFound("Khong tim thay id = " + id);
    }

    @Override
    public ResponseDTO<?> saveUtility(UtilityEntity utility) {
        long id = utility.getId();
        if (id == 0) {
            utility.setCreatedAt(new Date());

            utility.setUpdatedAt(new Date());
        } else {
            utility.setUpdatedAt(new Date());
        }
        var data = utilityRepository.save(utility);
        return ResponseService.created(data, id == 0 ? "Tao thanh cong" : "Cap nhat thanh cong");
    }
}
