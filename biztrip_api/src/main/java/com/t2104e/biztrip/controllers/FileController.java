package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.services.eloquents.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;


@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Autowired
    private FileService fileService;

    @PostMapping(value = "")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String pathName = fileService.uploadAndDownloadFile(file, "coach");
            return ResponseEntity.ok(Objects.requireNonNullElse(pathName, "Error while processing file"));
        } catch (Exception e) {
            return ResponseEntity.ok("Error while processing file");
        }
    }
}
