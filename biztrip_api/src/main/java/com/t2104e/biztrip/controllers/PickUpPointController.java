package com.t2104e.biztrip.controllers;


import com.t2104e.biztrip.command.LocationRequest;
import com.t2104e.biztrip.command.PickUpRequest;
import com.t2104e.biztrip.services.interfaces.ILocationService;
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
@RequestMapping("/api/v1/pick_up_points")
@RequiredArgsConstructor
public class PickUpPointController {
    @Autowired
    private IPickUpPointService pickUpPointService;

    @GetMapping("")
    public ResponseEntity<?> index(long scheduleId,
            @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(value = "keyword", required = false) String keyword) {
        var data = pickUpPointService.getListPickUpPointByScheduleId(scheduleId,sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = pickUpPointService.getDetail(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = pickUpPointService.delete(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam("scheduleId") long scheduleId,@Valid @RequestBody PickUpRequest request, BindingResult result) {
        var data = pickUpPointService.save(scheduleId,request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("createList")
    public ResponseEntity<?> create(@RequestParam("scheduleId") long scheduleId, @Valid @RequestBody List<PickUpRequest> requests, BindingResult result) {
        var data = pickUpPointService.saveList(scheduleId,requests, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

}
