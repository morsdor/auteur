package com.auteur.backend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UploadRequest {
    @NotBlank(message = "Filename is required")
    @Size(max = 255, message = "Filename must be less than 255 characters")
    @Pattern(regexp = "^[^/\\\\\\\\]+$", message = "Filename must not contain path separators")
    @Pattern(regexp = "^(?!\\.\\.).*", message = "Filename must not contain directory traversal sequences")
    private String filename;

    @NotBlank(message = "Content type is required")
    @Pattern(regexp = "^[a-zA-Z0-9]+/[a-zA-Z0-9\\-+.]+$", message = "Invalid content type format (e.g. video/mp4)")
    private String contentType;

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
