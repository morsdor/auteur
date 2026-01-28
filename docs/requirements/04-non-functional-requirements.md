# Auteur AI - Non-Functional Requirements

## 1. Performance Requirements

### 1.1 Response Times

| Operation | Target | Maximum |
|-----------|--------|---------|
| App launch | < 3s | 5s |
| Project open | < 2s | 4s |
| Timeline scrub | < 50ms | 100ms |
| Preview playback | 30fps | 24fps min |
| API response (auth) | < 200ms | 500ms |
| API response (data) | < 500ms | 1s |
| Job submission | < 1s | 2s |

### 1.2 AI Job Processing Times

| Feature | Target | Maximum |
|---------|--------|---------|
| Transcription (10 min) | < 2 min | 5 min |
| TTS (1 min audio) | < 30s | 1 min |
| Lip Sync (1 min video) | < 2 min | 5 min |
| Video Generation (5s) | < 2 min | 5 min |
| Gaze Redirection (1 min) | < 2 min | 5 min |

### 1.3 Throughput

| Metric | Requirement |
|--------|-------------|
| Concurrent users | 1,000+ |
| Jobs per hour (system) | 10,000+ |
| Media uploads per user | 50 files/hour |
| API requests per user | 100/minute |

---

## 2. Scalability Requirements

### 2.1 Horizontal Scaling
- Cloud Run auto-scales from 0 to 100 instances
- Modal scales GPU functions independently
- MongoDB Atlas auto-scales storage
- R2 has unlimited scalability

### 2.2 Data Growth
- Support 10TB+ total storage in R2
- Support 100K+ users
- Support 1M+ projects
- Support 10M+ media files

---

## 3. Availability Requirements

| Component | Target Uptime |
|-----------|---------------|
| Cloud Run API | 99.9% |
| Supabase Auth/DB | 99.9% |
| Modal GPU | 99.5% |
| R2 Storage | 99.99% |
| Overall System | 99.5% |

### 3.1 Disaster Recovery
- Database backups: Daily automated
- Point-in-time recovery: 7 days
- RTO (Recovery Time): < 4 hours
- RPO (Recovery Point): < 1 hour

---

## 4. Security Requirements

### 4.1 Authentication
- OAuth 2.0 (Google, GitHub)
- Email/password with verification
- JWT tokens with 1-hour expiry
- Refresh tokens with 30-day expiry
- Rate limiting on auth endpoints

### 4.2 Authorization
- Row-Level Security in Postgres
- User can only access own data
- Plan-based feature gating
- Credit balance enforcement

### 4.3 Data Protection
- TLS 1.3 for all connections
- AES-256 encryption at rest
- Secrets in Secret Manager
- No PII in logs
- GDPR compliance ready

### 4.4 Audit
- Log all auth events
- Log all credit transactions
- Log all job executions
- Retain logs for 90 days

---

## 5. Reliability Requirements

### 5.1 Error Handling
- All API errors return structured JSON
- Client-side retry with exponential backoff
- Failed jobs automatically refund credits
- Graceful degradation when services unavailable

### 5.2 Data Integrity
- ACID transactions for credit operations
- Idempotent job submission
- Checksums for file uploads
- Version control for EDL documents

---

## 6. Usability Requirements

### 6.1 Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratio 4.5:1
- Focus indicators visible

### 6.2 Internationalization
- UI supports English (v1)
- Date/time localized
- Number formatting localized
- Prepared for i18n expansion

### 6.3 User Experience
- Undo/redo for all edit operations
- Progress indicators for all async ops
- Clear error messages (not tech jargon)
- Tooltips for complex features

---

## 7. Maintainability Requirements

### 7.1 Code Quality
- TypeScript strict mode (frontend)
- Python type hints (backend)
- ESLint + Prettier (frontend)
- Ruff + Black (backend)
- Test coverage > 70%

### 7.2 Documentation
- API documentation (OpenAPI)
- Code comments for complex logic
- Architecture decision records
- Runbook for operations

### 7.3 Monitoring
- Health check endpoints
- Metrics (latency, errors, throughput)
- Alerting on error rate spikes
- Dashboard for GPU usage

---

## 8. Compatibility Requirements

### 8.1 Desktop Platforms
| Platform | Minimum Version |
|----------|-----------------|
| macOS | 11.0 (Big Sur) |
| Windows | 10 (1903+) |
| Linux | Ubuntu 20.04+ |

### 8.2 Hardware Requirements
| Resource | Minimum | Recommended |
|----------|---------|-------------|
| RAM | 4GB | 8GB |
| Storage | 1GB | 5GB |
| Display | 1280x720 | 1920x1080 |
| Network | 5 Mbps | 25 Mbps |

---

## 9. Compliance Requirements

### 9.1 Licensing
- All models Apache 2.0 or MIT
- No non-commercial dependencies
- License file in distribution
- Third-party license notices

### 9.2 Privacy
- Privacy policy required
- Cookie consent (if web)
- Data deletion on request
- No third-party tracking (v1)

---

## 10. Deployment Requirements

### 10.1 CI/CD Pipeline
- GitHub Actions for automation
- Automated tests on PR
- Staging deployment on merge
- Production deployment on release tag

### 10.2 Environments
| Environment | Purpose |
|-------------|---------|
| Local | Developer machines |
| Dev | Integration testing |
| Staging | Pre-production validation |
| Production | Live users |

### 10.3 Release Process
- Semantic versioning
- Changelog maintained
- Electron auto-update
- Rollback capability
