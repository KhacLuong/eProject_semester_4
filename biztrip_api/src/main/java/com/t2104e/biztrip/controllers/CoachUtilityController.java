package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.CoachUtilityEntity;
import com.t2104e.biztrip.services.eloquents.CoachUtilityImplService;
import com.t2104e.biztrip.services.eloquents.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/coach-utilities")
public class CoachUtilityController {
    @Autowired
    private CoachUtilityImplService coachUtilityImplService;
    @Autowired
    private FileService fileService;
    private final ResponseDTO RESPONSE_DTO = new ResponseDTO();

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam("pageNumber") int pageNumber,
                                   @RequestParam("perPage") int perPage,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
        Page<CoachUtilityEntity> page = coachUtilityImplService.getListCoachUtility(pageNumber, perPage, sortField, sortDir, keyword);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        List<CoachUtilityEntity> list = page.getContent();
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("success");
        RESPONSE_DTO.setMessage("");
        RESPONSE_DTO.setPageNumber(pageNumber);
        RESPONSE_DTO.setPerPage(perPage);
        RESPONSE_DTO.setTotalItems(totalItems);
        RESPONSE_DTO.setTotalPages(totalPages);
        RESPONSE_DTO.setSortField(sortField);
        RESPONSE_DTO.setSortDir(sortDir);
        RESPONSE_DTO.setData(list);
        return ResponseEntity.ok(RESPONSE_DTO);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CoachUtilityEntity coachUtility) {
        try {
            coachUtilityImplService.saveCoachUtility(coachUtility);
            RESPONSE_DTO.setCode(200);
            RESPONSE_DTO.setStatus("SUCCESS");
            RESPONSE_DTO.setMessage("Create coach utility successfully");
            RESPONSE_DTO.setData(coachUtility);
            return ResponseEntity.ok(RESPONSE_DTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        try {
            Optional<CoachUtilityEntity> op = coachUtilityImplService.getOneCoachUtilityById(id);
            if (op.isPresent()) {
                coachUtilityImplService.deleteCoachUtility(op.get());
                RESPONSE_DTO.setCode(200);
                RESPONSE_DTO.setStatus("SUCCESS");
                RESPONSE_DTO.setMessage("Delete coach utility successfully");
                RESPONSE_DTO.setData(null);
            }
            return ResponseEntity.ok(RESPONSE_DTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        Optional<CoachUtilityEntity> op = coachUtilityImplService.getOneCoachUtilityById(id);
        if (op.isPresent()) {
            RESPONSE_DTO.setCode(200);
            RESPONSE_DTO.setStatus("SUCCESS");
            RESPONSE_DTO.setMessage("Find successfully");
            RESPONSE_DTO.setData(op.get());
            return ResponseEntity.ok(RESPONSE_DTO);
        }
        return ResponseEntity.notFound().build();
    }
}
