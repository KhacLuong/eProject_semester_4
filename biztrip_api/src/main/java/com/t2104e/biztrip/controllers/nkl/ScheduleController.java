package com.t2104e.biztrip.controllers.nkl;


import com.t2104e.biztrip.command.ScheduleRequest;
import com.t2104e.biztrip.dto.*;
import com.t2104e.biztrip.services.interfaces.IScheduleService;
import com.t2104e.biztrip.services.util.Status;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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
        var data = scheduleService.getListSchedules(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = scheduleService.getScheduleById(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody ScheduleRequest request, BindingResult result) {
        var data = scheduleService.save(request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

//    @PostMapping("")
//    public ResponseEntity<?> create(@Valid @RequestBody ScheduleRequest request,
//                                    BindingResult result) {
//        RESPONSE_DTO = new ResponseDTO();
//        try {
//            List<String> valid = validationHandle.validation(result);
//            if (valid != null&&!valid.isEmpty()) {
//                RESPONSE_DTO.setCode(Status.BAD_REQUEST_CODE);
//                RESPONSE_DTO.setStatus(Status.FAILURE);
//                RESPONSE_DTO.setMessage(valid.get(0));
//                return ResponseEntity.badRequest().body(RESPONSE_DTO);
//            }
////            if (locationService.checkDubName(request.getName())) {
////                RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
////                RESPONSE_DTO.setStatus(Status.FAILURE);
////                RESPONSE_DTO.setMessage("Duplicate Name");
////                return ResponseEntity.ok(RESPONSE_DTO);
////            }
//            ScheduleEntity schedule = scheduleService.create(request);
//            RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
//            RESPONSE_DTO.setStatus(Status.SUCCESS);
//            RESPONSE_DTO.setMessage("Create location successfully");
//            RESPONSE_DTO.setData(schedule);
//            return ResponseEntity.ok(RESPONSE_DTO);
//        } catch (Exception e) {
//            return ResponseEntity.status(Status.INTERN_SERVER_ERROR_CODE).build();
//        }
//    }

//    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable(value = "id") long id,
//            @Valid @RequestBody ScheduleUpdateRequest request,
//                                    BindingResult result) {
//        RESPONSE_DTO = new ResponseDTO();
//        try {
//            List<String> valid = validationHandle.validation(result);
//            if (request.getId() != id || valid != null) {
//                RESPONSE_DTO.setCode(Status.BAD_REQUEST_CODE);
//                RESPONSE_DTO.setStatus(Status.FAILURE);
//                if (valid != null && !valid.isEmpty()) {
//                    RESPONSE_DTO.setMessage(valid.get(0));
//                }
//                return ResponseEntity.badRequest().body(RESPONSE_DTO);
//            }
////            if (locationService.checkDubName(request.getName())) {
////                RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
////                RESPONSE_DTO.setStatus(Status.FAILURE);
////                RESPONSE_DTO.setMessage("Duplicate Name");
////                return ResponseEntity.ok(RESPONSE_DTO);
////            }
//            ScheduleEntity schedule = scheduleService.update(request);
//            RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
//            RESPONSE_DTO.setStatus(Status.SUCCESS);
//            RESPONSE_DTO.setMessage("update location successfully");
//            RESPONSE_DTO.setData(schedule);
//            return ResponseEntity.ok(RESPONSE_DTO);
//        } catch (Exception e) {
//            return ResponseEntity.status(Status.INTERN_SERVER_ERROR_CODE).build();
//        }
//    }




    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = scheduleService.delete(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
