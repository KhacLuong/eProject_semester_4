package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.services.eloquents.CoachImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/coaches")
public class CoachController {
    @Autowired
    private CoachImplService coachImplService;
    private final ResponseDTO RESPONSE_DTO = new ResponseDTO();
    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam("pageNumber") int pageNumber,
                                   @RequestParam("perPage") int perPage,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
        Page<CoachEntity> page = coachImplService.getListCoach(pageNumber, perPage, sortField, sortDir, keyword);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        List<CoachEntity> list = page.getContent();
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
    public ResponseEntity<?> create(@RequestBody CoachEntity coach) {
        try {
            coachImplService.saveCoach(coach);
            RESPONSE_DTO.setCode(200);
            RESPONSE_DTO.setStatus("SUCCESS");
            RESPONSE_DTO.setMessage("Create coach successfully");
            RESPONSE_DTO.setData(coach);
            return ResponseEntity.ok(RESPONSE_DTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        try {
            CoachEntity coach = coachImplService.getOneCoachById(id);
            coachImplService.deleteCoach(coach);
            RESPONSE_DTO.setCode(200);
            RESPONSE_DTO.setStatus("SUCCESS");
            RESPONSE_DTO.setMessage("Delete coach successfully");
            RESPONSE_DTO.setData(null);
            return ResponseEntity.ok(RESPONSE_DTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        CoachEntity coach = coachImplService.getOneCoachById(id);
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("SUCCESS");
        RESPONSE_DTO.setMessage("Find successfully");
        RESPONSE_DTO.setData(coach);
        return ResponseEntity.ok(RESPONSE_DTO);
    }
}
