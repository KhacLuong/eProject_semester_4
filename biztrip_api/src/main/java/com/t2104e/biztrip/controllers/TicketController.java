package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.entities.TicketEntity;
import com.t2104e.biztrip.services.interfaces.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {
    @Autowired
    ITicketService iTicketService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam(value = "pageNumber") int pageNumber,
                                   @RequestParam(value = "perPage") int perPage,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
        var data = iTicketService.getListTicket(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = iTicketService.getOneTicketById(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody TicketEntity ticket) {
        var data = iTicketService.saveTicket(ticket);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = iTicketService.deleteTicket(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
