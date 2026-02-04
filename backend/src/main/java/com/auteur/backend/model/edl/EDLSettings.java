package com.auteur.backend.model.edl;

import lombok.Data;

@Data
public class EDLSettings {
    private Resolution resolution;
    private Integer frameRate;
    private Long durationMs;

    @Data
    public static class Resolution {
        private Integer width;
        private Integer height;
    }
}
