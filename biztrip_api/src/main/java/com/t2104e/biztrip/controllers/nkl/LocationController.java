package com.t2104e.biztrip.controllers.nkl;


import com.t2104e.biztrip.command.LocationRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.services.interfaces.ILocationService;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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
        var data = locationService.getListLocations(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody LocationRequest location, BindingResult result) {
        var data = locationService.save(location, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = locationService.getLocationById(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = locationService.delete(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }



}
