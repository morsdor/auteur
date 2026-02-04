package com.auteur.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Service
public class StorageService {

    private final S3Presigner s3Presigner;

    @Value("${spring.r2.bucket-name}")
    private String bucketName;

    public StorageService(S3Presigner s3Presigner) {
        this.s3Presigner = s3Presigner;
    }

    public Map<String, String> generatePresignedUploadUrl(String objectKey, String contentType) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(objectKey)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(15))
                .putObjectRequest(objectRequest)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);

        Map<String, String> result = new HashMap<>();
        result.put("uploadUrl", presignedRequest.url().toString());
        result.put("mediaId", objectKey);

        return result;
    }
}
