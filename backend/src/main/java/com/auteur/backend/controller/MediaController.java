package com.auteur.backend.controller;

import com.auteur.backend.model.dto.UploadRequest;
import com.auteur.backend.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
import jakarta.validation.Valid;

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
            @Valid @RequestBody UploadRequest request) {

        // TODO: Security - Add @PreAuthorize or check permission service to ensure user
        // owns this project
        // This will be implemented in Epic 1 / INFRA-7 when Supabase Auth is
        // integrated.

        // Sanitize filename to prevent path traversal
        // 1. Replace anything that isn't alphanumeric, dot, or hyphen with an
        // underscore
        String sanitizedFilename = request.getFilename().replaceAll("[^a-zA-Z0-9.\\-]", "_");

        // 2. Prevent multiple dots (optional, but cleaner) to avoid ".." appearance
        sanitizedFilename = sanitizedFilename.replaceAll("\\.{2,}", ".");

        // Generate a unique key for the file
        // Structure: projects/{projectId}/{uuid}-{filename}
        String objectKey = String.format("projects/%s/%s-%s",
                projectId,
                UUID.randomUUID().toString(),
                sanitizedFilename);

        Map<String, String> response = storageService.generatePresignedUploadUrl(
                objectKey,
                request.getContentType());

        return ResponseEntity.ok(response);
    }
}
