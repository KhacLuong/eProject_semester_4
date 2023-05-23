package com.t2104e.biztrip.controllers.nkl;


import com.t2104e.biztrip.command.ScheduleNewRequest;
import com.t2104e.biztrip.command.ScheduleUpdateRequest;
import com.t2104e.biztrip.dto.*;
import com.t2104e.biztrip.entities.CoachUtilityEntity;
import com.t2104e.biztrip.entities.nkl.LocationEntity;
import com.t2104e.biztrip.entities.nkl.ScheduleEntity;
import com.t2104e.biztrip.services.interfaces.IScheduleService;
import com.t2104e.biztrip.services.util.Status;
import com.t2104e.biztrip.services.util.ValidationHandle;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/schedules")
public class ScheduleController {

    @Autowired
    private IScheduleService scheduleService;

    @Autowired
    private ValidationHandle validationHandle;


    private ResponseDTO RESPONSE_DTO;


    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam("pageNumber") int pageNumber,
                                   @RequestParam("perPage") int perPage,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
         RESPONSE_DTO = new ResponseDTO();
        Page<ScheduleEntity> page = scheduleService.getListSchedules(pageNumber, perPage, sortField, sortDir, keyword);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        List<ScheduleEntity> list = page.getContent();
        Set<ScheduleResponse> result = new HashSet<>();
        for (ScheduleEntity schedule:list){

            ScheduleResponse scheduleRe = new ScheduleResponse(schedule.getId(), schedule.getDeparture(), schedule.getDestination(),
                    schedule.getStartTime(), schedule.getEndTime(),schedule.getCreatedAt(),schedule.getUpdatedAt());
            scheduleRe.setStopOver(new HashSet<>());
            for (LocationEntity location  : schedule.getLocations()){
                if (location.getName()!=null)
                scheduleRe.getStopOver().add(location.getName());
            }
            result.add(scheduleRe);
        }
        RESPONSE_DTO.setCode(200);
        RESPONSE_DTO.setStatus("success");
        RESPONSE_DTO.setMessage("");
        RESPONSE_DTO.setPageNumber(pageNumber);
        RESPONSE_DTO.setPerPage(perPage);
        RESPONSE_DTO.setTotalItems(totalItems);
        RESPONSE_DTO.setTotalPages(totalPages);
        RESPONSE_DTO.setSortField(sortField);
        RESPONSE_DTO.setSortDir(sortDir);
        RESPONSE_DTO.setData(result);
        return ResponseEntity.ok(RESPONSE_DTO);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(value = "id") long id) {
        RESPONSE_DTO = new ResponseDTO();
        try {

            ScheduleEntity schedule = scheduleService.getScheduleById(id);
            RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
            RESPONSE_DTO.setStatus("SUCCESS");
            if (schedule != null) {
                RESPONSE_DTO.setMessage("find  successfully");
                RESPONSE_DTO.setData(schedule);
                return ResponseEntity.ok(RESPONSE_DTO);
            }
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            RESPONSE_DTO.setCode(Status.INTERN_SERVER_ERROR_CODE);
            RESPONSE_DTO.setStatus("FAILURE");
            RESPONSE_DTO.setMessage(e.getMessage());
            return ResponseEntity.internalServerError().body(RESPONSE_DTO);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody ScheduleNewRequest request,
                                    BindingResult result) {
        RESPONSE_DTO = new ResponseDTO();
        try {
            List<String> valid = validationHandle.validation(result);
            if (valid != null&&!valid.isEmpty()) {
                RESPONSE_DTO.setCode(Status.BAD_REQUEST_CODE);
                RESPONSE_DTO.setStatus(Status.FAILURE);
                RESPONSE_DTO.setMessage(valid.get(0));
                return ResponseEntity.badRequest().body(RESPONSE_DTO);
            }
//            if (locationService.checkDubName(request.getName())) {
//                RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
//                RESPONSE_DTO.setStatus(Status.FAILURE);
//                RESPONSE_DTO.setMessage("Duplicate Name");
//                return ResponseEntity.ok(RESPONSE_DTO);
//            }
            ScheduleEntity schedule = scheduleService.create(request);
            RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
            RESPONSE_DTO.setStatus(Status.SUCCESS);
            RESPONSE_DTO.setMessage("Create location successfully");
            RESPONSE_DTO.setData(schedule);
            return ResponseEntity.ok(RESPONSE_DTO);
        } catch (Exception e) {
            return ResponseEntity.status(Status.INTERN_SERVER_ERROR_CODE).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(value = "id") long id,
            @Valid @RequestBody ScheduleUpdateRequest request,
                                    BindingResult result) {
        RESPONSE_DTO = new ResponseDTO();
        try {
            List<String> valid = validationHandle.validation(result);
            if (request.getId() != id || valid != null) {
                RESPONSE_DTO.setCode(Status.BAD_REQUEST_CODE);
                RESPONSE_DTO.setStatus(Status.FAILURE);
                if (valid != null && !valid.isEmpty()) {
                    RESPONSE_DTO.setMessage(valid.get(0));
                }
                return ResponseEntity.badRequest().body(RESPONSE_DTO);
            }
//            if (locationService.checkDubName(request.getName())) {
//                RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
//                RESPONSE_DTO.setStatus(Status.FAILURE);
//                RESPONSE_DTO.setMessage("Duplicate Name");
//                return ResponseEntity.ok(RESPONSE_DTO);
//            }
            ScheduleEntity schedule = scheduleService.update(request);
            RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
            RESPONSE_DTO.setStatus(Status.SUCCESS);
            RESPONSE_DTO.setMessage("update location successfully");
            RESPONSE_DTO.setData(schedule);
            return ResponseEntity.ok(RESPONSE_DTO);
        } catch (Exception e) {
            return ResponseEntity.status(Status.INTERN_SERVER_ERROR_CODE).build();
        }
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") long id) {
        RESPONSE_DTO = new ResponseDTO();
        try {


            if (scheduleService.delete(id)) {
                RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
                RESPONSE_DTO.setStatus("SUCCESS");
                RESPONSE_DTO.setMessage("Delete coach utility successfully");
                RESPONSE_DTO.setData(null);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(Status.INTERN_SERVER_ERROR_CODE).build();
        }
    }
}
