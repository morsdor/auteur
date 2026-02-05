package com.auteur.backend.model.edl;

import lombok.Data;
import java.util.Date;

@Data
public class Speaker {
    private String id;
    private String aiLabel;
    private String userLabel;
    private String voiceCloneId;
    private Date createdAt;
}
