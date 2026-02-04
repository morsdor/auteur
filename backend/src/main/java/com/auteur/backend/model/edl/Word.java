package com.auteur.backend.model.edl;

import lombok.Data;

@Data
public class Word {
    private String word;
    private Long startMs;
    private Long endMs;
    private Double confidence;
}
