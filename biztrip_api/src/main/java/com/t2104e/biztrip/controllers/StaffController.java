package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.entities.StaffEntity;
import com.t2104e.biztrip.services.interfaces.IStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/staffs")
public class StaffController {
    @Autowired
    IStaffService iStaffService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam(value = "pageNumber") int pageNumber, @RequestParam(value = "perPage") int perPage, @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField, @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir, @RequestParam(value = "keyword", required = false) String keyword) {
        var data = iStaffService.getListStaff(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = iStaffService.getOneStaffById(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody StaffEntity staff) {
        var data = iStaffService.saveStaff(staff);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = iStaffService.deleteStaff(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
