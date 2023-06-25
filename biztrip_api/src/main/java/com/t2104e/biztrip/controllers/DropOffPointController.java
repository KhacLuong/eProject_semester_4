package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.DropOffRequest;
import com.t2104e.biztrip.command.PickUpRequest;
import com.t2104e.biztrip.services.interfaces.IDropOffPointService;
import com.t2104e.biztrip.services.interfaces.IPickUpPointService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/drop_off_points")
@RequiredArgsConstructor
public class DropOffPointController {
    @Autowired
    private IDropOffPointService dropOffPointService;


    @GetMapping("")
    public ResponseEntity<?> index(long scheduleId,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
        var data = dropOffPointService.getListDropOffPointByScheduleId(scheduleId,sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = dropOffPointService.getDetail(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = dropOffPointService.delete(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam("scheduleId") long scheduleId, @Valid @RequestBody DropOffRequest request, BindingResult result) {
        var data = dropOffPointService.save(scheduleId,request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("createList")
    public ResponseEntity<?> create(@RequestParam("scheduleId") long scheduleId, @Valid @RequestBody List<DropOffRequest> requests, BindingResult result) {
        var data = dropOffPointService.saveList(scheduleId,requests, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

}
