# Technical Architecture for Text-Based Editing

## Data Structure (MongoDB EDL)

```json
{
  "project_id": "uuid",
  "transcript": {
    "words": [
      {
        "id": "w1",
        "text": "Hello",
        "start_time": 0.0,
        "end_time": 0.5,
        "speaker": "Speaker 1",
        "original": true,
        "audio_clip_id": "clip_001"
      },
      {
        "id": "w2",
        "text": "world",  // edited from "friends"
        "start_time": 0.6,
        "end_time": 1.2,
        "speaker": "Speaker 1",
        "original": false,
        "edited": true,
        "original_text": "friends",
        "voice_clone_job_id": "job_tts_123",
        "audio_clip_id": "clip_002_generated"
      },
      {
        "id": "w3",
        "text": "My name is John",  // inserted text
        "start_time": 1.3,
        "end_time": 2.5,
        "speaker": "Speaker 1",
        "original": false,
        "inserted": true,
        "voice_id": "voice_clone_abc",
        "audio_clip_id": "clip_003_generated"
      }
    ]
  }
}
```

### Kafka Flow for Text Edits

```
User edits word in transcript
    ↓
Frontend diff algorithm detects change
    ↓
POST /jobs/overdub
{
  word_id: "w2",
  old_text: "friends",
  new_text: "world",
  voice_context: {
    speaker_id: "Speaker 1",
    surrounding_audio_url: "r2://...",
    start: 0.0,
    end: 2.0
  }
}
    ↓
Spring Boot API
    ├─ Deduct 2 credits
    └─ Publish to kafka: jobs.requested (type=OVERDUB)
            ↓
    Job Orchestrator → jobs.overdub
            ↓
    Modal Worker (Python)
        ├─ Download surrounding audio
        ├─ Extract voice characteristics (F5-TTS voice cloning)
        ├─ Generate "world" in that voice
        ├─ Upload to R2
        └─ Publish jobs.completed
                ↓
        Spring Boot Consumer
                ├─ Update word in MongoDB
                └─ Mark as "edited"
                    ↓
            Frontend receives update
                    ├─ Replaces audio in timeline
                    ├─ Shows ✏️ badge on word
                    └─ Enables undo
```

---

## Roadmap Integration

### Where to Add These Features

**Phase 4** (Weeks 10-12) should become:

**Milestone 4.2: Text-Based Editing (Enhanced)**
- [ ] US-6.1: Generate Transcript ✅ (already exists)
- [ ] US-6.2: View Transcript ✅ (already exists)
- [ ] US-6.3: Delete text → delete video ✅ (already exists)
- [ ] 🆕 US-6.5: Edit words (Overdub) ⭐ **CORE FEATURE**
- [ ] 🆕 US-6.6: Insert new text ⭐ **CORE FEATURE**
- [ ] 🆕 US-6.7: Remove filler words (one-click)
- [ ] 🆕 US-6.8: Rearrange sentences (drag-and-drop)
- [ ] 🆕 US-6.9: Find and replace
- [ ] US-6.4: Export transcript ✅ (already exists)
- [ ] 🆕 US-6.10: Transcript edit markers

---

## Comparison to Descript

| Feature | Descript | Auteur (After This) | Status |
|---------|----------|---------------------|--------|
| Transcription | ✅ Whisper-based | ✅ Whisper + Pyannote | ✅ Match |
| Delete text → delete video | ✅ | ✅ (US-6.3) | ✅ Match |
| Edit text → regenerate speech | ✅ Overdub | ✅ (US-6.5) | ✅ Match |
| Insert text → add speech | ✅ | ✅ (US-6.6) | ✅ Match |
| Remove filler words | ✅ | ✅ (US-6.7) | ✅ Match |
| Rearrange sentences | ✅ | ✅ (US-6.8) | ✅ Match |
| Find & Replace | ✅ | ✅ (US-6.9) | ✅ Match |
| Lip sync on edit | ✅ | ✅ (via MuseTalk) | ✅ Better (separate models) |
| Voice cloning | ✅ | ✅ (F5-TTS) | ✅ Match |

**Result**: With these additions, **Auteur matches or exceeds Descript's core text-based editing**.

---

## Cost Estimates for Text Editing

| Action | Credits | Real Cost (@ $30/1500) |
|--------|---------|------------------------|
| Edit 1 word | 2 | $0.04 |
| Insert 1 sentence (10 words) | 3 | $0.06 |
| Replace all (10 instances) | 20 | $0.40 |
| Remove fillers | Free | $0.00 |
| Rearrange sentences | Free | $0.00 |

**Competitive**: Descript charges $24/month for Overdub. Auteur's pay-per-use is cheaper for casual users.

---

**Status**: These user stories should be added to `02-user-stories-part2.md` as the enhanced US-6.5 through US-6.10.
