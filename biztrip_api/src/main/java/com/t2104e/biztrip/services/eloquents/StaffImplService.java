package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.StaffEntity;
import com.t2104e.biztrip.repositories.StaffRepository;
import com.t2104e.biztrip.services.interfaces.IStaffService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class StaffImplService implements IStaffService {
    @Autowired
    private StaffRepository staffRepository;

    @Override
    public ResponseDTO<?> getListStaff(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = staffRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "Lấy danh", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getOneStaffById(long id) {
        Optional<StaffEntity> op = staffRepository.findById(id);
        if (op.isPresent()) {
            return ResponseService.ok(op.get(), "Lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> deleteStaff(long id) {
        Optional<StaffEntity> op = staffRepository.findById(id);
        if (op.isPresent()) {
            staffRepository.delete(op.get());
            return ResponseService.ok(null, "Xoa thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> saveStaff(StaffEntity staff) {
        long id = staff.getId();
        if (id == 0) {
            staff.setCreatedAt(new Date());
        }
        staff.setUpdatedAt(new Date());
        var data = staffRepository.save(staff);
        return ResponseService.created(data, id == 0 ? "Tao thanh cong" : "Cap nhat thanh cong");
    }
}
