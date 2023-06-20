package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.CoachRequest;
import com.t2104e.biztrip.command.ScheduleRequest;
import com.t2104e.biztrip.command.ThumbnailRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.UtilityEntity;
import com.t2104e.biztrip.services.eloquents.CoachImplService;
import com.t2104e.biztrip.services.eloquents.ThumbnailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/coaches")
public class CoachController {
    @Autowired
    private CoachImplService coachImplService;


    @Autowired
    private ThumbnailService thumbnailService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam("pageNumber") int pageNumber,
                                   @RequestParam("perPage") int perPage,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
        var data = coachImplService.getListCoach(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody CoachRequest request, BindingResult result) {
        var data = coachImplService.save(request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = coachImplService.getDetail(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


// Thumbnail

    @GetMapping("/{id}/thumbnails")
    public ResponseEntity<?> getThumbnails(@PathVariable(name = "id") long id) {
        var data = thumbnailService.getListThumbnailsByCoachId(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PostMapping("{id}/save_thumbnails")
    public ResponseEntity<?> saveListThumbnails(@PathVariable(name = "id") long id, @Valid @RequestBody List<ThumbnailRequest> request, BindingResult result) {
        var data = thumbnailService.saveList(id, request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PostMapping("{id}/save_thumbnail")
    public ResponseEntity<?> saveThumbnail(@PathVariable(name = "id") long id, @Valid @RequestBody ThumbnailRequest request, BindingResult result) {
        var data = thumbnailService.save(id, request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


    @DeleteMapping("{id}/delete_thumbnail/")
    public ResponseEntity<?> delete(@RequestParam("id") long id, @RequestParam("thumbnail_id") long thumbnailId) {
        var data = thumbnailService.delete(thumbnailId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }



//    @DeleteMapping("")
//    public ResponseEntity<?> delete(@RequestParam("id") long id) {
//        try {
//            CoachEntity coach = coachImplService.getOneCoachById(id);
//            coachImplService.deleteCoach(coach);
//            RESPONSE_DTO.setCode(200);
//            RESPONSE_DTO.setStatus("SUCCESS");
//            RESPONSE_DTO.setMessage("Delete coach successfully");
//            RESPONSE_DTO.setData(null);
//            return ResponseEntity.ok(RESPONSE_DTO);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).build();
//        }
//    }
//    @GetMapping("/{id}")
//    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
//        CoachEntity coach = coachImplService.getOneCoachById(id);
//        RESPONSE_DTO.setCode(200);
//        RESPONSE_DTO.setStatus("SUCCESS");
//        RESPONSE_DTO.setMessage("Find successfully");
//        RESPONSE_DTO.setData(coach);
//        return ResponseEntity.ok(RESPONSE_DTO);
//    }

//    @GetMapping("/get-all-utility")
//    public ResponseEntity<?> getAll() {
//        List<UtilityEntity> ls = coachImplService.getAllUtility();
//        RESPONSE_DTO.setCode(200);
//        RESPONSE_DTO.setStatus("SUCCESS");
//        RESPONSE_DTO.setMessage("Find successfully");
//        RESPONSE_DTO.setData(ls);
//        return ResponseEntity.ok(RESPONSE_DTO);
//    }
}
