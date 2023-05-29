package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.SeatCommand;
import com.t2104e.biztrip.services.interfaces.ISeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/seats")
public class SeatController {
    @Autowired
    ISeatService iSeatService;

    @GetMapping("")
    public ResponseEntity<?> index() {
        var data = iSeatService.getListSeat();
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody SeatCommand seats) {
        var data = iSeatService.saveSeat(seats.getCoachId(), seats.getSeats());
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = iSeatService.deleteSeat(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
