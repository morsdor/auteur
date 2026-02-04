package com.auteur.backend.repository;

import com.auteur.backend.model.edl.EDL;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EDLRepository extends MongoRepository<EDL, String> {
    Optional<EDL> findByProjectId(String projectId);
}
