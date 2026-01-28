# Auteur AI - User Stories & Epics

## Epic 1: User Authentication & Account Management

### US-1.1: User Registration
**As a** new user  
**I want to** create an account using email or OAuth  
**So that** I can access Auteur's features

**Acceptance Criteria:**
- [ ] User can register with email/password
- [ ] User can register with Google OAuth
- [ ] User can register with GitHub OAuth
- [ ] Email verification is required for email signups
- [ ] Password must be min 8 chars with 1 number and 1 special char
- [ ] Duplicate email detection with clear error message

**Technical Tasks:**
- [ ] Configure Supabase Auth providers
- [ ] Create registration API endpoint on Cloud Run
- [ ] Implement email verification flow
- [ ] Create user record in Postgres on successful registration
- [ ] Initialize credit balance (0 for free tier)

---

### US-1.2: User Login
**As a** registered user  
**I want to** log into the Electron app  
**So that** I can access my projects and credits

**Acceptance Criteria:**
- [ ] User can login with email/password
- [ ] User can login with Google/GitHub OAuth
- [ ] JWT token stored securely in Electron
- [ ] Session persists across app restarts
- [ ] Clear error messages for invalid credentials
- [ ] Rate limiting on failed login attempts (5 per minute)

**Technical Tasks:**
- [ ] Implement Supabase Auth in Electron main process
- [ ] Store JWT in secure electron-store
- [ ] Implement token refresh logic
- [ ] Create auth context for React components
- [ ] Add rate limiting middleware to Cloud Run

---

### US-1.3: User Logout
**As a** logged-in user  
**I want to** log out of the application  
**So that** my account is secure on shared devices

**Acceptance Criteria:**
- [ ] Logout button in user menu
- [ ] JWT token cleared from storage
- [ ] User redirected to login screen
- [ ] All in-memory user data cleared

**Technical Tasks:**
- [ ] Implement logout in Electron main process
- [ ] Clear secure storage
- [ ] Reset React auth context
- [ ] Cancel any pending API requests

---

### US-1.4: Password Reset
**As a** user who forgot my password  
**I want to** reset it via email  
**So that** I can regain access to my account

**Acceptance Criteria:**
- [ ] "Forgot password" link on login screen
- [ ] Email sent with reset link
- [ ] Reset link expires in 1 hour
- [ ] User can set new password
- [ ] Confirmation message after reset

**Technical Tasks:**
- [ ] Configure Supabase password reset flow
- [ ] Customize reset email template
- [ ] Handle deep link in Electron app

---

### US-1.5: View Account Profile
**As a** logged-in user  
**I want to** view my account details  
**So that** I can see my plan and usage

**Acceptance Criteria:**
- [ ] Display email and name
- [ ] Display current plan (Starter/Pro)
- [ ] Display credits remaining
- [ ] Display subscription renewal date
- [ ] Display usage history summary

**Technical Tasks:**
- [ ] Create profile API endpoint
- [ ] Create profile page in React
- [ ] Query user, subscription, and usage tables

---

## Epic 2: Subscription & Credit Management

### US-2.1: View Subscription Plans
**As a** user  
**I want to** see available subscription plans  
**So that** I can choose the right plan for my needs

**Acceptance Criteria:**
- [ ] Display Starter plan ($30, 1500 credits, 7 features)
- [ ] Display Pro plan ($50, 3000 credits, 10 features)
- [ ] Highlight current plan if subscribed
- [ ] Show feature comparison table
- [ ] Show credit cost breakdown per feature

**Technical Tasks:**
- [ ] Create pricing page component
- [ ] Fetch plan data from API
- [ ] Create plans table in Postgres

---

### US-2.2: Purchase Subscription
**As a** user  
**I want to** purchase a subscription plan  
**So that** I can access AI features

**Acceptance Criteria:**
- [ ] Select plan and proceed to checkout
- [ ] Secure payment via Stripe
- [ ] Credits added immediately after payment
- [ ] Confirmation email sent
- [ ] Plan activated in user account

**Technical Tasks:**
- [ ] Integrate Stripe Checkout
- [ ] Create Stripe webhook handler on Cloud Run
- [ ] Update user subscription in Postgres
- [ ] Add credits to user balance
- [ ] Send confirmation email via Supabase

---

### US-2.3: View Credit Balance
**As a** subscribed user  
**I want to** see my current credit balance  
**So that** I know how many operations I can perform

**Acceptance Criteria:**
- [ ] Credit balance visible in header/sidebar
- [ ] Real-time update after operations
- [ ] Low credit warning at 10% remaining
- [ ] Link to purchase more credits

**Technical Tasks:**
- [ ] Create credits API endpoint
- [ ] Add credits display to app header
- [ ] Implement real-time updates via polling or websocket
- [ ] Create low-credit notification component

---

### US-2.4: View Credit Usage History
**As a** subscribed user  
**I want to** see my credit usage history  
**So that** I can track my spending

**Acceptance Criteria:**
- [ ] List of all credit-consuming operations
- [ ] Date, feature used, credits deducted
- [ ] Filter by date range
- [ ] Filter by feature type
- [ ] Export to CSV

**Technical Tasks:**
- [ ] Create usage_history table in Postgres
- [ ] Create usage history API endpoint
- [ ] Create usage history page in React
- [ ] Implement filters and CSV export

---

### US-2.5: Credit Deduction on Feature Use
**As the** system  
**I want to** deduct credits when user uses a feature  
**So that** usage is properly metered

**Acceptance Criteria:**
- [ ] Credits deducted before job starts
- [ ] If job fails, credits refunded
- [ ] Insufficient credits prevents job start
- [ ] Clear error message for insufficient credits

**Technical Tasks:**
- [ ] Create credit deduction service
- [ ] Implement transaction-safe deduction
- [ ] Create refund mechanism for failed jobs
- [ ] Add credit check middleware to job endpoints

---

## Epic 3: Project Management

### US-3.1: Create New Project
**As a** user  
**I want to** create a new video project  
**So that** I can start editing

**Acceptance Criteria:**
- [ ] "New Project" button in dashboard
- [ ] Enter project name
- [ ] Select project settings (resolution, frame rate)
- [ ] Project created and opened in editor

**Technical Tasks:**
- [ ] Create projects table in Postgres
- [ ] Create project API endpoints (CRUD)
- [ ] Create new project dialog in React
- [ ] Initialize project EDL in MongoDB

---

### US-3.2: Import Media Files
**As a** user  
**I want to** import video/audio files into my project  
**So that** I can edit them

**Acceptance Criteria:**
- [ ] Drag-and-drop files into app
- [ ] File picker dialog option
- [ ] Support formats: MP4, MOV, WebM, MP3, WAV
- [ ] Upload progress indicator
- [ ] Files stored in Cloudflare R2
- [ ] Thumbnails generated for video files

**Technical Tasks:**
- [ ] Create file upload API endpoint
- [ ] Integrate Cloudflare R2 SDK
- [ ] Generate video thumbnails (FFmpeg)
- [ ] Create media library component
- [ ] Store file metadata in Postgres

---

### US-3.3: View Project Media Library
**As a** user  
**I want to** see all media files in my project  
**So that** I can add them to the timeline

**Acceptance Criteria:**
- [ ] Grid view of all imported media
- [ ] Thumbnail preview for videos
- [ ] Waveform preview for audio
- [ ] File name, duration, and size displayed
- [ ] Search/filter media files
- [ ] Delete media files

**Technical Tasks:**
- [ ] Create media library panel component
- [ ] Fetch media list from API
- [ ] Implement search and filter
- [ ] Add delete functionality with confirmation

---

### US-3.4: Save Project
**As a** user  
**I want to** save my project  
**So that** I don't lose my work

**Acceptance Criteria:**
- [ ] Auto-save every 30 seconds
- [ ] Manual save option (Cmd/Ctrl+S)
- [ ] Save indicator in UI
- [ ] Conflict detection if edited elsewhere

**Technical Tasks:**
- [ ] Implement auto-save timer
- [ ] Create project save API endpoint
- [ ] Store EDL in MongoDB
- [ ] Update project metadata in Postgres
- [ ] Implement optimistic locking

---

### US-3.5: Open Existing Project
**As a** user  
**I want to** open a previously saved project  
**So that** I can continue editing

**Acceptance Criteria:**
- [ ] Dashboard shows list of recent projects
- [ ] Click to open project
- [ ] Project loads with all media and timeline state
- [ ] Loading indicator during fetch

**Technical Tasks:**
- [ ] Create project list API endpoint
- [ ] Create dashboard with project cards
- [ ] Fetch and restore EDL from MongoDB
- [ ] Load media references from R2

---

### US-3.6: Delete Project
**As a** user  
**I want to** delete a project I no longer need  
**So that** I can manage my storage

**Acceptance Criteria:**
- [ ] Delete option in project menu
- [ ] Confirmation dialog with project name
- [ ] All associated media deleted from R2
- [ ] Project removed from dashboard

**Technical Tasks:**
- [ ] Create project delete API endpoint
- [ ] Delete media files from R2
- [ ] Delete EDL from MongoDB
- [ ] Delete project record from Postgres

---

## Epic 4: Timeline Editor

### US-4.1: View Timeline
**As a** user  
**I want to** see a timeline editor  
**So that** I can arrange my clips

**Acceptance Criteria:**
- [ ] Horizontal timeline with time ruler
- [ ] Multiple tracks (video, audio)
- [ ] Playhead indicator
- [ ] Zoom in/out on timeline
- [ ] Scroll horizontally for long projects

**Technical Tasks:**
- [ ] Create timeline component
- [ ] Implement time ruler with zoom
- [ ] Create track components
- [ ] Implement playhead with sync to preview
- [ ] Store timeline state in EDL (MongoDB)

---

### US-4.2: Add Clips to Timeline
**As a** user  
**I want to** drag media from library to timeline  
**So that** I can build my edit

**Acceptance Criteria:**
- [ ] Drag clip from media library
- [ ] Drop on appropriate track
- [ ] Clip snaps to playhead or other clips
- [ ] Visual feedback during drag

**Technical Tasks:**
- [ ] Implement drag-and-drop with React DnD
- [ ] Create clip component for timeline
- [ ] Implement snap-to logic
- [ ] Update EDL on clip add

---

### US-4.3: Trim Clips
**As a** user  
**I want to** trim the start/end of clips  
**So that** I can use only the parts I need

**Acceptance Criteria:**
- [ ] Drag clip edges to trim
- [ ] Preview updates to show trim point
- [ ] Trim handles visible on hover
- [ ] Undo/redo trim operations

**Technical Tasks:**
- [ ] Implement trim handles on clip component
- [ ] Update clip in/out points in EDL
- [ ] Sync preview with trim changes
- [ ] Integrate with undo/redo system

---

### US-4.4: Split Clips
**As a** user  
**I want to** split a clip at the playhead  
**So that** I can remove or rearrange sections

**Acceptance Criteria:**
- [ ] Split command (keyboard shortcut: S)
- [ ] Clip divided into two at playhead position
- [ ] Both clips remain selected
- [ ] Works on selected clip(s) only

**Technical Tasks:**
- [ ] Create split function
- [ ] Update EDL with two new clip references
- [ ] Maintain clip metadata across split
- [ ] Add keyboard shortcut handler

---

### US-4.5: Delete Clips from Timeline
**As a** user  
**I want to** delete clips from the timeline  
**So that** I can remove unwanted content

**Acceptance Criteria:**
- [ ] Select clip and press Delete/Backspace
- [ ] Right-click context menu with Delete option
- [ ] Gap left where clip was (or ripple delete option)
- [ ] Undo available

**Technical Tasks:**
- [ ] Implement delete handler
- [ ] Remove clip from EDL
- [ ] Implement ripple delete option
- [ ] Integrate with undo system

---

### US-4.6: Move Clips on Timeline
**As a** user  
**I want to** move clips to different positions  
**So that** I can rearrange my edit

**Acceptance Criteria:**
- [ ] Drag clip to new position
- [ ] Clips snap to edges of other clips
- [ ] Can move between tracks
- [ ] Visual indicator during drag

**Technical Tasks:**
- [ ] Implement clip drag on timeline
- [ ] Update position in EDL
- [ ] Implement collision detection
- [ ] Add snap-to-grid/clips logic

---

### US-4.7: Undo/Redo
**As a** user  
**I want to** undo and redo my edits  
**So that** I can recover from mistakes

**Acceptance Criteria:**
- [ ] Cmd/Ctrl+Z for undo
- [ ] Cmd/Ctrl+Shift+Z for redo
- [ ] Undo/redo buttons in toolbar
- [ ] History of at least 50 actions

**Technical Tasks:**
- [ ] Implement command pattern for edits
- [ ] Create undo/redo stack
- [ ] Persist undo history in EDL
- [ ] Create undo/redo UI controls

---

## Epic 5: Video Preview

### US-5.1: Preview Playback
**As a** user  
**I want to** preview my edit in real-time  
**So that** I can see how it looks

**Acceptance Criteria:**
- [ ] Play/pause button
- [ ] Spacebar toggles playback
- [ ] Preview synced to timeline playhead
- [ ] Audio plays with video

**Technical Tasks:**
- [ ] Create preview player component
- [ ] Implement playback engine
- [ ] Sync with timeline playhead
- [ ] Handle audio mixing

---

### US-5.2: Scrub Timeline
**As a** user  
**I want to** scrub through the timeline  
**So that** I can quickly find specific frames

**Acceptance Criteria:**
- [ ] Click on timeline to move playhead
- [ ] Drag playhead to scrub
- [ ] Preview updates in real-time during scrub
- [ ] Frame-accurate positioning

**Technical Tasks:**
- [ ] Implement scrub handling
- [ ] Optimize preview for scrub performance
- [ ] Frame-accurate seek

---

### US-5.3: Fullscreen Preview
**As a** user  
**I want to** view preview in fullscreen  
**So that** I can see details clearly

**Acceptance Criteria:**
- [ ] Fullscreen button on preview
- [ ] F key toggles fullscreen
- [ ] ESC exits fullscreen
- [ ] Maintain aspect ratio

**Technical Tasks:**
- [ ] Implement fullscreen mode
- [ ] Handle keyboard shortcuts
- [ ] Maintain playback state in fullscreen
