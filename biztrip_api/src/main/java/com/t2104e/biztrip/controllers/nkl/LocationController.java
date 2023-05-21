package com.t2104e.biztrip.controllers.nkl;


import com.t2104e.biztrip.dto.LocationDto;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.nkl.LocationEntity;
import com.t2104e.biztrip.services.interfaces.ILocationService;
import com.t2104e.biztrip.services.util.Status;
import com.t2104e.biztrip.services.util.ValidationHandle;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {

    @Autowired
    private ILocationService locationService;

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
        try {
           if(sortField==null)
               sortField="";

            Page<LocationEntity> page = locationService.getListLocations(pageNumber, perPage, sortField, sortDir, keyword);
            long totalItems = page.getTotalElements();
            int totalPages = page.getTotalPages();
            List<LocationEntity> list = page.getContent();
            RESPONSE_DTO.setCode(200);
            RESPONSE_DTO.setStatus("SUCCESS");
            RESPONSE_DTO.setMessage("");
            RESPONSE_DTO.setPageNumber(pageNumber);
            RESPONSE_DTO.setPerPage(perPage);
            RESPONSE_DTO.setTotalItems(totalItems);
            RESPONSE_DTO.setTotalPages(totalPages);
            RESPONSE_DTO.setSortField(sortField);
            RESPONSE_DTO.setSortDir(sortDir);
            RESPONSE_DTO.setData(list);
            return ResponseEntity.ok(RESPONSE_DTO);
        } catch (Exception e) {
            RESPONSE_DTO.setCode(500);
            RESPONSE_DTO.setStatus("FAILURE");
            RESPONSE_DTO.setMessage(e.getMessage());
            return ResponseEntity.internalServerError().body(RESPONSE_DTO);
        }

    }

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody LocationDto request,
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
            if (locationService.checkDubName(request.getName())) {
                RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
                RESPONSE_DTO.setStatus(Status.FAILURE);
                RESPONSE_DTO.setMessage("Duplicate Name");
                return ResponseEntity.ok(RESPONSE_DTO);
            }
            LocationEntity location = locationService.create(request);
            RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
            RESPONSE_DTO.setStatus(Status.SUCCESS);
            RESPONSE_DTO.setMessage("Create location successfully");
            RESPONSE_DTO.setData(location);
            return ResponseEntity.ok(RESPONSE_DTO);
        } catch (Exception e) {
            return ResponseEntity.status(Status.INTERN_SERVER_ERROR_CODE).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(value = "id") long id) {
        RESPONSE_DTO = new ResponseDTO();
        try {

            LocationEntity location = locationService.getLocationById(id);
            RESPONSE_DTO.setCode(200);
            RESPONSE_DTO.setStatus("SUCCESS");
            if (location != null) {
                RESPONSE_DTO.setMessage("find  successfully");
                RESPONSE_DTO.setData(location);
                return ResponseEntity.ok(RESPONSE_DTO);
            }
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            RESPONSE_DTO.setCode(500);
            RESPONSE_DTO.setStatus("FAILURE");
            RESPONSE_DTO.setMessage(e.getMessage());
            return ResponseEntity.internalServerError().body(RESPONSE_DTO);
        }


    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") long id) {
        RESPONSE_DTO = new ResponseDTO();
        try {
            if (locationService.delete(id)) {
                RESPONSE_DTO.setCode(200);
                RESPONSE_DTO.setStatus("SUCCESS");
                RESPONSE_DTO.setMessage("Delete coach utility successfully");
                RESPONSE_DTO.setData(null);
                return ResponseEntity.ok().build();

            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(value = "id") long id,
                                    @Valid @RequestBody LocationEntity request,
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
            LocationEntity location = locationService.getLocationById(id);
            if (location != null) {
                LocationEntity location2 = locationService.findAllByName(request.getName());

                if (location2 != null && location2.getId() != request.getId()) {
                    RESPONSE_DTO.setCode(Status.BAD_REQUEST_CODE);
                    RESPONSE_DTO.setStatus(Status.FAILURE);
                    RESPONSE_DTO.setMessage("Duplicate name");
                    return ResponseEntity.ok(RESPONSE_DTO);
                }
                request.setCreatedAt(location.getCreatedAt());
              LocationEntity location1 =   locationService.update(request);
                RESPONSE_DTO.setCode(Status.SUCCESS_CODE);
                RESPONSE_DTO.setStatus(Status.SUCCESS);
                RESPONSE_DTO.setMessage("Update successfully");
                RESPONSE_DTO.setData(location1);
                return ResponseEntity.ok(RESPONSE_DTO);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(Status.INTERN_SERVER_ERROR_CODE).build();
        }
    }


}
