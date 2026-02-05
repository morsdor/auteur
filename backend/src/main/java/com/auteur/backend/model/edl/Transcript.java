package com.auteur.backend.model.edl;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class Transcript {
    private Date generatedAt;
    private List<TranscriptSegment> segments;
}
