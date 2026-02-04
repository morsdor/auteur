package com.auteur.backend.model.edl;

import lombok.Data;
import java.util.List;

@Data
public class TranscriptSegment {
    private String id;
    private String speakerId;
    private Long startMs;
    private Long endMs;
    private String text;
    private List<Word> words;
    private boolean deleted;
    private String editedText;
}
