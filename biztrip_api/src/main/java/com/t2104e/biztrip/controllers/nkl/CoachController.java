//package com.t2104e.biztrip.controllers.nkl;
//
//
//import com.t2104e.biztrip.entities.CoachUtilityEntity;
//import com.t2104e.biztrip.entities.nkl.CoachEntity;
//import com.t2104e.biztrip.services.eloquents.CoachImplService;
//import com.t2104e.biztrip.services.eloquents.FileService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//@RequestMapping("/api/v1/coaches")
//public class CoachController {
//
//    @Autowired
//    private CoachImplService coachImplService;
//
//
//    @PostMapping("")
//    public ResponseEntity<?> create(@RequestBody CoachEntity coach) {
//        try {
//            coachImplService.saveCoachUtility(coachUtility);
//            RESPONSE_DTO.setCode(200);
//            RESPONSE_DTO.setStatus("SUCCESS");
//            RESPONSE_DTO.setMessage("Create coach utility successfully");
//            RESPONSE_DTO.setData(coachUtility);
//            return ResponseEntity.ok(RESPONSE_DTO);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).build();
//        }
//    }
//
//}
