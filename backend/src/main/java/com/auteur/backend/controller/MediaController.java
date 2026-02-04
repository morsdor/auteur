package com.auteur.backend.controller;

import com.auteur.backend.model.dto.UploadRequest;
import com.auteur.backend.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/projects/{projectId}/media")
public class MediaController {

    private final StorageService storageService;

    public MediaController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/upload-url")
    public ResponseEntity<Map<String, String>> getUploadUrl(
            @PathVariable String projectId,
            @RequestBody UploadRequest request) {

        // Generate a unique key for the file
        // Structure: projects/{projectId}/{uuid}-{filename}
        String objectKey = String.format("projects/%s/%s-%s",
                projectId,
                UUID.randomUUID().toString(),
                request.getFilename());

        Map<String, String> response = storageService.generatePresignedUploadUrl(
                objectKey,
                request.getContentType());

        return ResponseEntity.ok(response);
    }
}
