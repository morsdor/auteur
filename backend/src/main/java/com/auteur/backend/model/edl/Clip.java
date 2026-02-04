package com.auteur.backend.model.edl;

import lombok.Data;
import java.util.List;

@Data
public class Clip {
    private String id;
    private String mediaFileId;
    private String trackId;
    private Long startMs;
    private Long durationMs;
    private Long inPointMs;
    private Long outPointMs;
    private List<Object> effects; // TBD: unknown[] in TS
    private boolean deleted;
}
