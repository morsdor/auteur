# Auteur AI - User Stories & Epics (Part 2)

## Epic 6: AI Feature - Diarization & Transcription

### US-6.1: Generate Transcript
**As a** user  
**I want to** automatically transcribe my video/audio  
**So that** I can edit based on text

**Acceptance Criteria:**
- [ ] Right-click on clip > "Generate Transcript"
- [ ] Progress indicator during processing
- [ ] Transcript appears in side panel
- [ ] Speaker labels for each segment
- [ ] Timestamps for each word/sentence
- [ ] Credits deducted on completion
- [ ] Cost: 5 credits per 10 minutes

**Technical Tasks:**
- [ ] Create transcription job API on Cloud Run
- [ ] Integrate Pyannote 3.1 + Whisper on Modal
- [ ] Store transcript in MongoDB EDL
- [ ] Create transcript panel component
- [ ] Implement job status polling

---

### US-6.2: View Transcript
**As a** user  
**I want to** view the transcript alongside my timeline  
**So that** I can navigate by text

**Acceptance Criteria:**
- [ ] Transcript panel shows full text
- [ ] Speaker labels color-coded
- [ ] Current word highlighted during playback
- [ ] Click on word to jump to that time
- [ ] Search within transcript

**Technical Tasks:**
- [ ] Create transcript viewer component
- [ ] Implement word-level sync with timeline
- [ ] Add click-to-seek functionality
- [ ] Implement transcript search

---

### US-6.3: Edit via Transcript
**As a** user  
**I want to** delete/edit text in transcript to edit video  
**So that** I can edit faster

**Acceptance Criteria:**
- [ ] Select text range in transcript
- [ ] Delete selected text removes corresponding video
- [ ] Strikethrough shows deleted sections
- [ ] Undo available for transcript edits
- [ ] Changes reflected in timeline

**Technical Tasks:**
- [ ] Implement text selection in transcript
- [ ] Map transcript ranges to timeline positions
- [ ] Create delete-by-text function
- [ ] Update EDL with edit markers
- [ ] Sync timeline with transcript edits

---

### US-6.4: Export Transcript
**As a** user  
**I want to** export transcript as subtitles or text  
**So that** I can use it elsewhere

**Acceptance Criteria:**
- [ ] Export as SRT (subtitles)
- [ ] Export as VTT (web subtitles)
- [ ] Export as plain text
- [ ] Export as JSON with timestamps
- [ ] Include speaker labels option

**Technical Tasks:**
- [ ] Create export format converters
- [ ] Create export dialog component
- [ ] Implement file download

---

### US-6.5: Edit Words in Transcript (Overdub) ⭐ **CORE FEATURE**

**As a** user  
**I want to** edit/replace words in the transcript  
**So that** the video automatically updates with AI-generated speech

**Acceptance Criteria:**
- [ ] Double-click word in transcript to edit
- [ ] Type replacement text inline
- [ ] AI automatically generates speech using original speaker's voice (cloned from context)
- [ ] Generated audio seamlessly replaces original in timeline
- [ ] If video has face, lip-sync automatically applied
- [ ] Visual indicator shows which words are "overdubbed" (e.g., ✏️ badge)
- [ ] Undo reverts to original audio
- [ ] Cost: 2 credits per edited word/phrase

**Technical Tasks:**
- [ ] Implement inline editing in transcript (contentEditable or Tiptap)
- [ ] Detect changed text ranges (word-level diffing algorithm)
- [ ] Extract speaker voice characteristics from surrounding audio (10-sec context window)
- [ ] Create automatic voice cloning job (no manual upload needed)
- [ ] Generate TTS with cloned voice (F5-TTS on Modal L4)
- [ ] Replace audio segment in timeline EDL
- [ ] If video: trigger lip-sync job (MuseTalk on Modal A10G)
- [ ] Mark edited segments in transcript with visual badge
- [ ] Store edit metadata in MongoDB EDL

**Example Workflow:**
```
Original: "This product is really bad"
User edits: "bad" → "good"
→ AI clones speaker voice from surrounding audio
→ Generates "good" in that voice
→ Replaces "bad" in audio track
→ If video: syncs lips to new word
→ Timeline updates automatically
```

---

### US-6.6: Insert New Text into Transcript ⭐ **CORE FEATURE**

**As a** user  
**I want to** type new text anywhere in the transcript  
**So that** I can add new dialogue/narration to my video

**Acceptance Criteria:**
- [ ] Click between words to place cursor
- [ ] Type new text (phrase or sentence)
- [ ] Select voice to use (from voice library or detected speaker)
- [ ] AI generates speech in selected voice
- [ ] Audio inserted at cursor position in timeline
- [ ] Natural pause handling before/after insertion
- [ ] Visual indicator shows inserted text (e.g., blue highlight)
- [ ] Ripple edit: subsequent clips shift to accommodate
- [ ] Cost: 3 credits per inserted sentence

**Technical Tasks:**
- [ ] Implement cursor positioning in transcript
- [ ] Detect inserted text (not just edits)
- [ ] Show voice selection dialog on insert
- [ ] Generate TTS for inserted text (F5-TTS)
- [ ] Calculate insertion point in timeline (between words with timestamps)
- [ ] Implement ripple editing: shift subsequent clips
- [ ] Add fade in/out for natural audio blending
- [ ] Update EDL with new audio clip reference
- [ ] Store insertion metadata in MongoDB

**Example Workflow:**
```
Original: "Hello. How are you?"
User inserts after "Hello": "My name is John."
→ Cursor placed after "Hello"
→ User types "My name is John"
→ Selects voice (speaker or library)
→ AI generates speech
→ Inserted with 0.5s pauses before/after
→ Timeline shifts remaining clips right
```

---

### US-6.7: Remove Filler Words (One-Click Cleanup)

**As a** user  
**I want to** remove all "um", "uh", "like", "you know" with one click  
**So that** my content sounds more professional

**Acceptance Criteria:**
- [ ] "Remove Filler Words" button in transcript toolbar
- [ ] Detects common filler words/phrases automatically
- [ ] Shows preview with fillers highlighted in yellow
- [ ] User can toggle individual detections on/off
- [ ] One-click "Apply" removes all selected fillers
- [ ] Timeline gaps auto-closed (ripple delete)
- [ ] Undo available to restore all fillers
- [ ] Free feature (no credit cost)

**Technical Tasks:**
- [ ] Create filler word detection algorithm
  - Common patterns: "um", "uh", "ah", "er", "like", "you know", "kind of", "sort of", etc.
- [ ] Use transcript word-level timestamps
- [ ] Highlight detected fillers in transcript
- [ ] Create confirmation dialog with list and toggles
- [ ] Batch delete from timeline EDL
- [ ] Implement ripple delete (close gaps automatically)
- [ ] Update MongoDB EDL with deletions

**Filler Words Detected:**
- Hesitations: um, uh, ah, er, hmm
- Verbal crutches: like (non-meaningful), you know, I mean
- Hedge words: kind of, sort of, basically, actually, literally (overuse)
- Sentence starters: so (repeated), well

---

### US-6.8: Rearrange Sentences by Drag-and-Drop

**As a** user  
**I want to** drag sentences in the transcript to reorder them  
**So that** I can restructure my narrative without manual timeline editing

**Acceptance Criteria:**
- [ ] Sentence-level drag handles on hover
- [ ] Drag sentence to new position in transcript
- [ ] Visual drop zone indicator
- [ ] Drop to reorder
- [ ] Corresponding video/audio clips automatically rearrange in timeline
- [ ] Handles cross-speaker rearrangement
- [ ] Crossfades applied for smooth audio transitions
- [ ] Undo available
- [ ] Free feature (no credit cost)

**Technical Tasks:**
- [ ] Implement sentence-level drag-and-drop (dnd-kit)
- [ ] Parse transcript into sentence blocks with boundaries
- [ ] Map sentences to timeline clip ranges (start/end times)
- [ ] Rearrange clips in EDL when sentence dropped
- [ ] Handle audio crossfades between rearranged segments (0.1s)
- [ ] Update timeline view to reflect new clip order
- [ ] Store rearrangement metadata for undo

---

### US-6.9: Find and Replace in Transcript

**As a** user  
**I want to** find and replace text across the entire transcript  
**So that** I can fix repeated mistakes or update terminology

**Acceptance Criteria:**
- [ ] Find/Replace toolbar (Cmd/Ctrl+F opens)
- [ ] Find all instances of word/phrase
- [ ] Navigate between matches (next/previous)
- [ ] Replace individual instance or all at once
- [ ] Each replacement triggers AI voice generation
- [ ] Batch processing with progress indicator
- [ ] Preview changes before applying
- [ ] Cost: 2 credits per replaced instance

**Technical Tasks:**
- [ ] Create find/replace UI component with search input
- [ ] Implement text search in transcript (case-sensitive/insensitive toggle)
- [ ] Highlight all matches in transcript
- [ ] For "Replace All": batch TTS generation queue
- [ ] Queue Kafka jobs to avoid overwhelming system
- [ ] Show progress: "Generating 3/5 replacements..."
- [ ] Update timeline as each replacement completes
- [ ] Store find/replace history

**Example:**
```
Find: "version 1.0"
Replace: "version 2.0"
→ Finds 5 instances across 3 speakers
→ User clicks "Replace All"
→ AI generates "version 2.0" in each speaker's voice (5 jobs)
→ Timeline updates for all 5 instances
→ Cost: 10 credits (2 per instance)
```

---

### US-6.10: Transcript Edit Markers and History

**As a** user  
**I want to** see which parts of the transcript were AI-edited  
**So that** I maintain transparency and can review/revert changes

**Acceptance Criteria:**
- [ ] Transcript shows visual markers for:
  - ✏️ Edited words (overdubbed)
  - ➕ Inserted text (green highlight)
  - 🗑️ Deleted text (strikethrough, faded)
  - 🔄 Rearranged sentences (subtle border)
- [ ] Hover over edit shows tooltip: "Edited: 'bad' → 'good' (2 min ago)"
- [ ] "Show/Hide Edits" toggle in toolbar
- [ ] Right-click edited word → "Revert to Original"
- [ ] Export transcript with edit log (JSON or annotated text)
- [ ] Free feature

**Technical Tasks:**
- [ ] Store edit type, timestamp, original value in MongoDB
- [ ] Render visual indicators in transcript component
- [ ] Create tooltip component for edit history
- [ ] Implement toggle to show/hide markers
- [ ] Create "revert edit" action per word/phrase
- [ ] Export as JSON with edit metadata:
  ```json
  {
    "edits": [
      {
        "type": "replace",
        "timestamp": "2026-01-29T12:34:56Z",
        "word_id": "w42",
        "old": "bad",
        "new": "good"
      }
    ]
  }
  ```

---

## Epic 7: AI Feature - Synthetic Voice (TTS)

### US-7.1: Clone Voice from Sample
**As a** user  
**I want to** create a voice clone from a 10-sec sample  
**So that** I can generate speech in that voice

**Acceptance Criteria:**
- [ ] "Create Voice Clone" in voices panel
- [ ] Upload 10-second audio sample
- [ ] Enter voice name
- [ ] Voice saved to library
- [ ] Sample stored in R2

**Technical Tasks:**
- [ ] Create voice clones table in Postgres
- [ ] Create voice upload API
- [ ] Store sample in R2
- [ ] Create voice library component

---

### US-7.2: Generate Speech from Text
**As a** user  
**I want to** type text and generate audio  
**So that** I can add voiceover to my video

**Acceptance Criteria:**
- [ ] Select voice from library
- [ ] Enter text to speak
- [ ] Preview generated audio
- [ ] Adjust speed (0.5x to 2x)
- [ ] Cost: 2 credits per minute
- [ ] Add to timeline on confirm

**Technical Tasks:**
- [ ] Create TTS job API on Cloud Run
- [ ] Integrate F5-TTS on Modal (L4 GPU)
- [ ] Create TTS dialog component
- [ ] Store generated audio in R2
- [ ] Add to media library and timeline

---

### US-7.3: Replace Dialogue with TTS
**As a** user  
**I want to** replace spoken dialogue with TTS  
**So that** I can fix mistakes or change lines

**Acceptance Criteria:**
- [ ] Select text in transcript
- [ ] "Replace with TTS" option
- [ ] Select voice for replacement
- [ ] Edit replacement text
- [ ] Preview before applying
- [ ] Original audio replaced in timeline

**Technical Tasks:**
- [ ] Create replacement flow in transcript panel
- [ ] Generate TTS for selected segment
- [ ] Trigger lip sync if video (chain to Feature 2)
- [ ] Update EDL with replacement

---

## Epic 8: AI Feature - Neural Dubbing (Lip Sync)

### US-8.1: Sync Lips to Audio
**As a** user  
**I want to** sync a speaker's lips to new audio  
**So that** dubbed content looks natural

**Acceptance Criteria:**
- [ ] Select video clip with face
- [ ] Select replacement audio
- [ ] "Sync Lips" action
- [ ] Progress indicator (near real-time)
- [ ] Preview result before applying
- [ ] Cost: 15 credits per minute
- [ ] Applied to timeline on confirm

**Technical Tasks:**
- [ ] Create lip sync job API on Cloud Run
- [ ] Integrate MuseTalk on Modal (A10G)
- [ ] Face detection with MediaPipe
- [ ] GFPGAN upscaling for quality
- [ ] Store result in R2
- [ ] Create preview dialog

---

### US-8.2: Auto Lip-Sync on TTS Replace
**As a** user  
**I want to** automatically lip-sync when I replace audio  
**So that** the workflow is seamless

**Acceptance Criteria:**
- [ ] When TTS replaces speech in video
- [ ] Lip sync automatically triggered
- [ ] Combined job with single credit cost
- [ ] User can opt-out if audio-only needed

**Technical Tasks:**
- [ ] Create chained job for TTS + Lip Sync
- [ ] Calculate combined credit cost
- [ ] Add toggle for auto lip-sync
- [ ] Handle partial failures

---

## Epic 9: AI Feature - Performance Cloning

### US-9.1: Animate Portrait from Video
**As a** user  
**I want to** drive a still portrait with my performance  
**So that** I can create animated characters

**Acceptance Criteria:**
- [ ] Upload source portrait image
- [ ] Record or upload driving video
- [ ] Preview animation
- [ ] Adjust expression intensity
- [ ] Cost: 12 credits per minute
- [ ] Export as video clip

**Technical Tasks:**
- [ ] Create performance cloning API
- [ ] Integrate LivePortrait + MediaPipe on Modal
- [ ] Create source/driver upload flow
- [ ] Implement expression controls
- [ ] Store output in R2

---

### US-9.2: Record Webcam as Driver
**As a** user  
**I want to** use my webcam as the driving source  
**So that** I can perform in real-time

**Acceptance Criteria:**
- [ ] Access webcam in app
- [ ] Record performance
- [ ] Preview with source portrait live
- [ ] Save recording for use

**Technical Tasks:**
- [ ] Implement webcam access in Electron
- [ ] Create webcam recording component
- [ ] Stream for live preview (optional)
- [ ] Save recording locally then upload

---

## Epic 10: AI Feature - Gaze Redirection

### US-10.1: Redirect Gaze to Camera
**As a** Pro user  
**I want to** fix gaze direction in video  
**So that** talent appears to look at camera

**Acceptance Criteria:**
- [ ] Select video clip
- [ ] "Fix Gaze" action
- [ ] Choose target direction (default: camera center)
- [ ] Preview before/after
- [ ] Cost: 10 credits per minute
- [ ] Apply to timeline

**Technical Tasks:**
- [ ] Create gaze redirect API
- [ ] Use LivePortrait retargeting on Modal
- [ ] Create before/after preview
- [ ] Store result in R2

---

## Epic 11: AI Feature - Script Supervision

### US-11.1: Query Video Content
**As a** user  
**I want to** ask questions about my video  
**So that** I can find specific moments

**Acceptance Criteria:**
- [ ] "Ask AI" button or panel
- [ ] Type natural language question
- [ ] AI responds with text answer
- [ ] Timestamps provided if relevant
- [ ] Click timestamp to jump to that point
- [ ] Cost: 3 credits per query

**Technical Tasks:**
- [ ] Create video query API
- [ ] Integrate Qwen2.5-VL-7B on Modal (A10G)
- [ ] Extract key frames for context
- [ ] Create chat-style UI panel
- [ ] Parse timestamps from response

---

### US-11.2: Find Moments by Description
**As a** user  
**I want to** search for "when the actor smiles"  
**So that** I can locate specific reactions

**Acceptance Criteria:**
- [ ] Enter search query
- [ ] AI returns list of matching moments
- [ ] Each result shows thumbnail and timestamp
- [ ] Click to preview that moment
- [ ] Add to selection for batch actions

**Technical Tasks:**
- [ ] Create moment search function
- [ ] Generate thumbnails at result timestamps
- [ ] Create search results panel

---

## Epic 12: AI Feature - Sound Stage

### US-12.1: Generate Ambient Audio
**As a** user  
**I want to** generate background audio from text  
**So that** I can fill gaps in my edit

**Acceptance Criteria:**
- [ ] "Generate Audio" in audio panel
- [ ] Enter text description (e.g., "coffee shop ambience")
- [ ] Specify duration
- [ ] Preview before adding
- [ ] Cost: 8 credits per minute
- [ ] Add to timeline

**Technical Tasks:**
- [ ] Create audio generation API
- [ ] Integrate AudioLDM-2 on Modal (A10G)
- [ ] Create generation dialog
- [ ] Store result in R2

---

### US-12.2: Extend Existing Audio
**As a** user  
**I want to** extend room tone to fill silence  
**So that** audio is continuous

**Acceptance Criteria:**
- [ ] Select audio clip
- [ ] "Extend" action
- [ ] Specify additional duration
- [ ] AI generates matching continuation
- [ ] Seamlessly appended to original

**Technical Tasks:**
- [ ] Create audio extension API
- [ ] Use AudioLDM-2 inpainting mode
- [ ] Handle audio concatenation

---

## Epic 13: AI Feature - Script Assistant (LLM)

### US-13.1: Script Writing Help
**As a** user  
**I want to** get AI help writing scripts  
**So that** I can create content faster

**Acceptance Criteria:**
- [ ] Script editor panel
- [ ] "AI Suggest" button
- [ ] Enter prompt or select text
- [ ] AI suggests improvements/additions
- [ ] Accept/reject suggestions
- [ ] Cost: 1 credit per query

**Technical Tasks:**
- [ ] Create LLM chat API
- [ ] Integrate Llama-3-70B via vLLM on Modal
- [ ] Create script editor component
- [ ] Implement inline suggestions

---

### US-13.2: Generate Video Prompts
**As a** Pro user  
**I want to** get help writing prompts for video generation  
**So that** I get better results

**Acceptance Criteria:**
- [ ] "Improve prompt" option in video gen dialog
- [ ] AI expands/improves text prompt
- [ ] Suggests cinematic details
- [ ] One-click use improved prompt

**Technical Tasks:**
- [ ] Create prompt enhancement function
- [ ] Pre-defined system prompt for video style
- [ ] Integrate into video gen flow

---

## Epic 14: AI Feature - AI Cinematography (Text-to-Video)

### US-14.1: Generate Video from Text
**As a** Pro user  
**I want to** generate video from a text prompt  
**So that** I can create original content

**Acceptance Criteria:**
- [ ] "Generate Video" action
- [ ] Enter text prompt (max 500 chars)
- [ ] Select duration (5 seconds)
- [ ] Select quality (720p)
- [ ] Progress indicator (may take 1-2 minutes)
- [ ] Cost: 50 credits per 5-second clip
- [ ] Preview and add to library

**Technical Tasks:**
- [ ] Create video generation API
- [ ] Integrate Wan2.1-T2V-14B on Modal (A100-80GB)
- [ ] Implement job queue for long tasks
- [ ] Store result in R2
- [ ] Create generation dialog with progress

---

### US-14.2: Image-to-Video Animation
**As a** Pro user  
**I want to** animate a still image into video  
**So that** I can bring images to life

**Acceptance Criteria:**
- [ ] Upload source image
- [ ] Enter motion prompt
- [ ] Select duration (5 seconds)
- [ ] Preview result
- [ ] Cost: 50 credits per 5-second clip

**Technical Tasks:**
- [ ] Use Wan2.1 image-to-video mode
- [ ] Create image upload flow
- [ ] Handle image preprocessing

---

## Epic 15: Cloud Rendering

### US-15.1: Export Final Video
**As a** Pro user  
**I want to** render my final video in the cloud  
**So that** I don't burden my local machine

**Acceptance Criteria:**
- [ ] "Export to Cloud" action
- [ ] Select resolution (720p, 1080p, 4K)
- [ ] Select format (MP4, MOV, WebM)
- [ ] Progress indicator
- [ ] Cost: 5 credits per minute of 1080p
- [ ] Download when complete

**Technical Tasks:**
- [ ] Create render job API on Cloud Run
- [ ] Generate EDL in FFmpeg-compatible format
- [ ] Execute FFmpeg render on Cloud Run
- [ ] Store output in R2
- [ ] Provide download link

---

### US-15.2: Render Preview
**As a** user  
**I want to** see a low-res preview render  
**So that** I can check before final export

**Acceptance Criteria:**
- [ ] "Preview Render" option
- [ ] Quick render at 480p
- [ ] Lower credit cost
- [ ] Playable in app

**Technical Tasks:**
- [ ] Create preview render function
- [ ] Use lower resolution settings
- [ ] Optimize for speed
