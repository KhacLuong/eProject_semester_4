package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.CoachUtilityEntity;
import com.t2104e.biztrip.services.eloquents.CoachUtilityImplService;
import com.t2104e.biztrip.services.eloquents.FileService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<?> index() {
        List<CoachUtilityEntity> ls = coachUtilityImplService.getListCoachUtility();
        if (ls.size() == 0) {
            return ResponseEntity.noContent().build();
        }
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("success");
        RESPONSE_DTO.setMessage("");
        RESPONSE_DTO.setData(ls);
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
    public ResponseEntity<?> delete(@RequestParam("id") int id) {
        try {
            Optional<CoachUtilityEntity> op = coachUtilityImplService.getOneCoachUtilityById(id);
            if (op.isPresent()) {
                ResponseDTO responseDTO = new ResponseDTO();
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
}
