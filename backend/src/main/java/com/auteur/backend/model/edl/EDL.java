package com.auteur.backend.model.edl;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "edls")
public class EDL {
    @Id
    private String id;

    @Indexed(unique = true)
    @Field("project_id")
    private String projectId;

    private Integer version;

    @Field("created_at")
    private Date createdAt;

    @Field("updated_at")
    private Date updatedAt;

    private EDLSettings settings;
    private List<Track> tracks;
    private Transcript transcript;
    private List<Speaker> speakers;

    @Field("undo_stack")
    private List<Object> undoStack;

    @Field("redo_stack")
    private List<Object> redoStack;
}
