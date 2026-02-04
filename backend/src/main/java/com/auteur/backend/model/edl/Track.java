package com.auteur.backend.model.edl;

import lombok.Data;
import java.util.List;

@Data
public class Track {
    private String id;
    private String type; // 'video' | 'audio'
    private String name;
    private List<Clip> clips;
}
