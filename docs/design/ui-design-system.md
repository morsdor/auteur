# Auteur UI Design System

> **Version:** 1.0  
> **Last Updated:** January 30, 2026  
> **Platform:** Web (Next.js) & Desktop (Electron)

---

## 1. Design Philosophy

Auteur's interface embodies a **premium, professional-grade video editing experience** that rivals industry leaders like Adobe Premiere Pro, DaVinci Resolve, and Final Cut Pro. The design prioritizes:

- **Dark-first aesthetic** for reduced eye strain during long editing sessions
- **Cinematic feel** with rich blacks and vibrant accents
- **Information density** balanced with whitespace for clarity
- **Glassmorphic effects** for modern depth and hierarchy
- **Accessibility** with high contrast ratios and clear visual hierarchy

---

## 2. Design Tokens

### 2.1 Color System

#### Primary Palette

| Token Name     | Hex Code  | Usage                        | Notes                               |
| -------------- | --------- | ---------------------------- | ----------------------------------- |
| `bg-primary`   | `#0A0A0A` | Main application background  | Deep black for maximum contrast     |
| `bg-secondary` | `#0F0F0F` | Secondary containers         | Subtle elevation                    |
| `bg-tertiary`  | `#111111` | Sidebar, panels              | Slightly lighter than secondary     |
| `bg-component` | `#141414` | Cards, input fields, modals  | Component-level backgrounds         |
| `bg-elevated`  | `#1A1A1A` | Hover states, active items   | Elevated surfaces                   |
| `bg-overlay`   | `#1E1E1E` | Floating toolbars, dropdowns | Semi-transparent overlays with blur |

#### Accent Colors

| Token Name             | Hex Code  | Usage                              | Visual Effect                  |
| ---------------------- | --------- | ---------------------------------- | ------------------------------ |
| `accent-primary`       | `#00E054` | Primary actions, CTAs, playhead    | Spotify green - brand identity |
| `accent-primary-hover` | `#00FF5E` | Hover state for primary actions    | Brighter variant               |
| `accent-primary-dim`   | `#00B043` | Disabled/inactive primary elements | Dimmed variant                 |
| `accent-purple`        | `#9D00FF` | Speaker tags, special highlights   | Secondary accent               |
| `accent-purple-light`  | `#C479FF` | Speaker tag text, borders          | Lighter purple variant         |
| `accent-orange`        | `#FFB347` | Filler words, warnings             | Attention-grabbing             |
| `accent-blue`          | `#3B82F6` | Informational elements             | Cool accent                    |

#### Text Colors

| Token Name       | Hex Code  | Usage                       | Contrast Ratio        |
| ---------------- | --------- | --------------------------- | --------------------- |
| `text-primary`   | `#FFFFFF` | Headings, primary content   | 21:1 on `bg-primary`  |
| `text-secondary` | `#E0E0E0` | Body text, descriptions     | 17:1 on `bg-primary`  |
| `text-tertiary`  | `#A1A1A1` | Metadata, timestamps        | 8.5:1 on `bg-primary` |
| `text-muted`     | `#888888` | Disabled text, placeholders | 4.5:1 on `bg-primary` |
| `text-subtle`    | `#666666` | Labels, hints               | 3.5:1 on `bg-primary` |
| `text-disabled`  | `#444444` | Disabled elements           | 2.5:1 on `bg-primary` |

#### Border Colors

| Token Name       | Hex Code  | Usage                               | Opacity |
| ---------------- | --------- | ----------------------------------- | ------- |
| `border-subtle`  | `#222222` | Default borders, dividers           | 100%    |
| `border-default` | `#2A2A2A` | Input fields, cards                 | 100%    |
| `border-medium`  | `#333333` | Focused states, dashed borders      | 100%    |
| `border-strong`  | `#444444` | Hover states, emphasized separators | 100%    |

#### Shadows & Effects

| Effect Name                | CSS Value                        | Usage                                        |
| -------------------------- | -------------------------------- | -------------------------------------------- |
| `shadow-glow-green`        | `0 0 15px rgba(0, 224, 84, 0.2)` | Primary buttons, playhead, active indicators |
| `shadow-glow-green-strong` | `0 0 20px rgba(0, 224, 84, 0.4)` | Hover states on primary actions              |
| `shadow-elevation-sm`      | `0 2px 8px rgba(0, 0, 0, 0.3)`   | Small cards, tooltips                        |
| `shadow-elevation-md`      | `0 4px 16px rgba(0, 0, 0, 0.4)`  | Modals, dropdowns                            |
| `shadow-elevation-lg`      | `0 10px 40px rgba(0, 0, 0, 0.5)` | Major UI overlays, dialogs                   |
| `backdrop-blur`            | `blur(12px)`                     | Glassmorphic panels                          |

### 2.2 Typography

#### Font Families

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Roboto Mono', 'Consolas', monospace;
```

**Note:** Inter font should include weights from Thin (100) to Black (900).

#### Font Scale

| Token       | Size   | Line Height | Weight | Usage                         |
| ----------- | ------ | ----------- | ------ | ----------------------------- |
| `text-xs`   | `10px` | `14px`      | 500    | Small labels, badges          |
| `text-sm`   | `11px` | `16px`      | 500    | UI labels, metadata           |
| `text-base` | `13px` | `18px`      | 400    | Default UI text               |
| `text-md`   | `14px` | `20px`      | 500    | Body text, navigation         |
| `text-lg`   | `16px` | `22px`      | 500    | Subheadings                   |
| `text-xl`   | `18px` | `26px`      | 400    | Transcript text, main content |
| `text-2xl`  | `20px` | `28px`      | 600    | Section headers, logo         |
| `text-3xl`  | `24px` | `32px`      | 600    | Page titles                   |
| `text-4xl`  | `32px` | `40px`      | 700    | Hero text                     |

#### Special Typography

| Use Case            | Specification                                                        |
| ------------------- | -------------------------------------------------------------------- |
| **Timecodes**       | `11px`, monospace, medium weight, `#A1A1A1`                          |
| **Speaker Tags**    | `11px`, bold (700), uppercase, `#C479FF`, `0.05em` letter-spacing    |
| **Section Labels**  | `12px`, uppercase, semibold (600), `#666666`, `0.1em` letter-spacing |
| **Transcript Text** | `18px`, regular (400), `#E0E0E0`, `1.6` line-height                  |

### 2.3 Spacing System

Based on **8px base unit** for consistent rhythm:

| Token      | Value  | Usage                            |
| ---------- | ------ | -------------------------------- |
| `space-1`  | `4px`  | Tight spacing, icon padding      |
| `space-2`  | `8px`  | Default gap between elements     |
| `space-3`  | `12px` | Small component padding          |
| `space-4`  | `16px` | Medium padding, card spacing     |
| `space-5`  | `20px` | Large padding                    |
| `space-6`  | `24px` | Section spacing, paragraph gaps  |
| `space-8`  | `32px` | Icon vertical spacing in sidebar |
| `space-10` | `40px` | Page-level padding               |
| `space-12` | `48px` | Major section spacing            |

### 2.4 Border Radius

| Token         | Value    | Usage                        |
| ------------- | -------- | ---------------------------- |
| `radius-sm`   | `4px`    | Badges, small buttons        |
| `radius-md`   | `8px`    | Buttons, inputs, small cards |
| `radius-lg`   | `12px`   | Cards, panels, modals        |
| `radius-full` | `9999px` | Circular buttons, avatars    |

### 2.5 Transitions

| Property            | Duration | Easing                         | Usage                            |
| ------------------- | -------- | ------------------------------ | -------------------------------- |
| `transition-fast`   | `150ms`  | `ease-out`                     | Hover states, small interactions |
| `transition-base`   | `200ms`  | `ease-in-out`                  | Default transitions              |
| `transition-medium` | `300ms`  | `cubic-bezier(0.4, 0, 0.2, 1)` | Animations, fades                |
| `transition-slow`   | `500ms`  | `ease-in-out`                  | Major state changes              |

---

## 3. Layout Specifications

### 3.1 Dashboard (Homepage)

**Screen Dimensions:** `1440px` width × `900px` minimum height

#### Layout Grid

```
┌─────────────────────────────────────────────────────────────┐
│ [Sidebar 240px] │ [Main Workspace - fills remaining]       │
│                 │                                            │
│  - Branding     │  ┌──────────────────────────────────────┐ │
│  - Navigation   │  │ Good morning, Creator                │ │
│  - Settings     │  │ [AI Assistant Input - 160px height]  │ │
│  - Profile      │  └──────────────────────────────────────┘ │
│                 │                                            │
│                 │  Quick Record [4-column grid]             │
│                 │                                            │
│                 │  Recent Projects [Grid with cards]        │
└─────────────────────────────────────────────────────────────┘
```

#### Component Breakdown

##### Left Sidebar

- **Width:** `240px` (fixed)
- **Background:** `#111111`
- **Border Right:** `1px solid #222222`
- **Top Branding Area:** `60px` height
  - Logo: `20px`, bold, white text
  - Optional green dot decoration

##### Navigation Menu

- **Items:** Home, All Projects, Templates, Shared with me
- **Active State:**
  - Background: `#1A1A1A`
  - Left border: `3px solid #00E054`
  - Text color: `#FFFFFF`
- **Inactive State:**
  - Text color: `#888888`
  - Hover: Text changes to `#FFFFFF`
- **Icon + Text Layout:** `14px` text, medium weight, `8px` gap between icon and text

##### AI Assistant Panel

- **Width:** Fills workspace with `40px` padding
- **Height:** `160px`
- **Background:** `#141414`
- **Border:** `1px solid #333333`
- **Border Radius:** `12px`
- **Components:**
  - **Input Area:** Placeholder text in `#666666`
  - **Toolbar:** Bottom-aligned, includes Bold/Italic/List icons and "Attach Media" button
  - **Send Button:**
    - **Position:** Bottom-right corner
    - **Size:** `44px` circle
    - **Background:** `#00E054`
    - **Shadow:** `0 0 15px rgba(0, 224, 84, 0.2)`
    - **Icon:** Black arrow

##### Quick Record Section

- **Header:** "QUICK RECORD" - `12px`, uppercase, `#666666`, wide letter-spacing
- **Grid:** 4 columns with equal spacing
- **Card Specs:**
  - **Background:** `#141414`
  - **Border:** `1px solid #2A2A2A`
  - **Border Radius:** `12px`
  - **Hover:** Border changes to `#444444`, subtle elevation
  - **Icon Size:** `32px`
  - **Icon Color:** `#FFFFFF` (hover: `#00E054`)
  - **Labels:** Video, Audio, Screen, Combo

##### Recent Projects Section

- **Header:**
  - Left: "Recent Projects" - `18px`, white
  - Right: "View All" - `13px`, `#00E054`
- **Grid:** Auto-fill layout with minimum `280px` card width
- **Create New Card:**
  - **Border:** `2px dashed #333333`
  - **Background:** Transparent or very dark gray
  - **Icon:** Large "+" symbol
  - **Hover:** Border changes to `#00E054`
- **Project Cards:**
  - **Thumbnail:** 16:9 aspect ratio
  - **Border:** `1px solid #2A2A2A`
  - **Border Radius:** `12px`
  - **Name:** `14px`, white
  - **Timestamp:** `12px`, `#A1A1A1`
  - **Status Tag:** Top-right, semi-transparent black background

### 3.2 Video Editor Screen

**Screen Dimensions:** `1440px` width × `900px` minimum height

#### Layout Grid

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ [Header Bar - 60px height]                                                    │
├────┬──────────────────────────────────────────────────────────┬───────────────┤
│ L  │                    Center Panel                          │  Right Panel  │
│ e  │  ┌─────────────────────┬─────────────────────────────┐  │   (380px)     │
│ f  │  │ Text Editor         │ Video Preview               │  │               │
│ t  │  │ (480px)             │ (488px)                     │  │  AI Features  │
│    │  │                     │                             │  │  Panel        │
│ 72 │  │ - Toolbar           │ - Controls Bar              │  │               │
│ px │  │ - Transcript        │ - Video Player              │  │               │
│    │  │                     │                             │  │               │
│    │  └─────────────────────┴─────────────────────────────┘  │               │
├────┼──────────────────────────────────────────────────────────┴───────────────┤
│    │ [Video Controls Toolbar - 48px height]                                   │
├────┼───────────────────────────────────────────────────────────────────────────┤
│    │ [Timeline Panel - 180px height]                                          │
└────┴───────────────────────────────────────────────────────────────────────────┘
```

#### Component Breakdown

##### Header Bar

- **Height:** `60px`
- **Background:** `#141414` with `backdrop-filter: blur(12px)`
- **Border Bottom:** `1px solid #2A2A2A`
- **Layout:**
  - **Left Section:**
    - Hamburger menu icon
    - "Auteur" logo (bold, tight letter-spacing)
    - Breadcrumb: "Projects / Tech Summit Keynote_v2"
  - **Right Section:**
    - Collaboration avatars (overlapping circles)
    - "Share" button - outlined with `#333` border
    - "Export" button - `#00E054` background with glow

##### Left Sidebar (Navigation Icons)

- **Width:** `72px`
- **Background:** `#111111`
- **Icons:** Vertical stack, `20px` size, `32px` vertical spacing
- **Labels:** `10px` text below icons
- **Items:**
  - Script (active - green accent with background glow)
  - Media
  - Review
  - Effects
  - Color
  - Audio Mixer
  - Export Settings
- **Active State:** `#00E054` color with subtle background glow
- **Hover State:** Icon color changes to `#EEE`

##### Center Panel - Text Editor Section

- **Width:** `480px`
- **Background:** White space (consider light background for contrast)
- **Max Content Width:** `600px`, centered
- **Floating Toolbar:**
  - **Position:** Top of editor
  - **Background:** `rgba(30, 30, 30, 0.6)` with `backdrop-filter: blur(12px)`
  - **Border Radius:** `8px`
  - **Height:** `40px`
  - **Layout:**
    - Left: Bold/Italic buttons
    - Center: Search field
    - Right: Auto-Delete toggle (green when active)
- **Transcript:**
  - **Speaker Tags:**
    - **Position:** Above paragraphs (not inline)
    - **Style:** Purple gradient pill
    - **Background:** `rgba(157, 0, 255, 0.15)`
    - **Text Color:** `#C479FF`
    - **Font:** `11px`, bold, uppercase
    - **Padding:** `4px 12px`
    - **Border Radius:** `12px`
  - **Paragraph Text:**
    - **Font Size:** `18px`
    - **Color:** `#E0E0E0`
    - **Line Height:** `1.6`
    - **Spacing:** `24px` between paragraphs
  - **Highlighted Words:**
    - Filler words: `#FFB347` (orange)
    - Emphasis: `#00E054` (green)
  - **Scrollable:** With `180px` bottom padding for timeline

##### Center Panel - Video Preview Section

- **Width:** `488px`
- **Video Controls Bar:**
  - **Height:** `44px`
  - **Background:** `#121212`
  - **Border:** `1px solid #222`
  - **Layout:**
    - Left: Skip Back, Play (green), Skip Forward (20px icons)
    - Center: Timecode "00:04:12 / 00:12:45" (monospace)
    - Right: Split clip, Add marker, Zoom, Frame rate
- **Video Player:**
  - **Aspect Ratio:** 16:9
  - **Background:** `#000000`
  - **Border Radius:** `8px`
  - **Border:** `1px solid #333`
  - **Shadow:** `0 4px 16px rgba(0, 0, 0, 0.4)`
  - **Overlay Controls:** Appear on hover with 300ms transition
  - **Pop-out Button:** Top-right corner with tooltip
  - **Timecode Overlay:** Top-left, monospace `11px`, `rgba(0, 0, 0, 0.5)` background

##### Right Sidebar - AI Features Panel

- **Width:** `380px`
- **Background:** `#141414`
- **Header:**
  - "AI FEATURES" - `12px`, uppercase, `#666`
  - "BETA" tag - small badge
- **Feature List:**
  - 10 AI features with pricing
  - Each item shows:
    - Feature name (`13px`, bold)
    - Unit rate
    - Credit cost
    - Price
  - **Hover State:** `#1E1E1E` background
  - **Borders:** `1px solid #222` between items

##### Video Controls Toolbar

- **Height:** `48px`
- **Background:** `#121212`
- **Border Top:** `1px solid #222`
- **Layout:**
  - **Left:** Playback controls (Skip Back, Play/Pause with green highlight, Skip Forward, Stop)
  - **Center:** Edit tools (Razor, Selection, Trim, Hand, Zoom)
  - **Center-Right:** View options (Snap toggle, Waveform toggle, Thumbnail size slider)
  - **Right:** Timeline zoom controls, Fit to window, Timecode display
- **Icon Size:** `18-20px` with `8px` spacing
- **Hover:** Icons accent with `#00E054`

##### Timeline Panel

- **Height:** `180px`
- **Position:** Fixed at bottom
- **Background:** Glassmorphic dark theme with `backdrop-filter: blur(12px)`
- **Track Labels Column:**
  - **Width:** `100px`
  - **Tracks:**
    - Video - Main Track (`60px` height)
    - Audio - Waveform (`50px` height)
    - Text - Subtitles (`38px` height)
  - **Label Style:** `11px`, semibold, white main text with `9px` `#666` subtitle
- **Timeline Tracks:**
  - **Video Track:**
    - Thumbnail frames: `80px × 48px` each
    - `2px` spacing between frames
    - Border: `1px solid #222`
  - **Audio Track:**
    - SVG waveform visualization
    - Gradient: `#444` to `#666`
  - **Subtitle Track:**
    - Text blocks in `#1A1A1A` pills
- **Playhead:**
  - **Color:** `#00E054`
  - **Width:** `2px`
  - **Shadow:** `0 0 10px rgba(0, 224, 84, 0.6)`
  - **Handle:** Circular, `10px` diameter at top
  - **Position:** Spans all tracks vertically

---

## 4. Component Library

### 4.1 Buttons

#### Primary Button

```css
background: #00e054;
color: #000000;
padding: 10px 20px;
border-radius: 8px;
font-size: 13px;
font-weight: 600;
box-shadow: 0 0 15px rgba(0, 224, 84, 0.2);
transition: all 200ms ease-in-out;

/* Hover */
background: #00ff5e;
box-shadow: 0 0 20px rgba(0, 224, 84, 0.4);
```

#### Secondary Button

```css
background: transparent;
color: #ffffff;
border: 1px solid #333;
padding: 10px 20px;
border-radius: 8px;
font-size: 13px;
font-weight: 500;
transition: all 200ms ease-in-out;

/* Hover */
background: #1a1a1a;
border-color: #444;
```

#### Icon Button

```css
width: 36px;
height: 36px;
background: transparent;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;
transition: all 150ms ease-out;

/* Hover */
background: #1e1e1e;
color: #00e054;
```

### 4.2 Input Fields

#### Text Input

```css
background: #141414;
border: 1px solid #2a2a2a;
border-radius: 8px;
padding: 10px 14px;
font-size: 13px;
color: #e0e0e0;
font-family: 'Inter', sans-serif;
transition: border-color 200ms ease-in-out;

/* Focus */
border-color: #00e054;
outline: none;
box-shadow: 0 0 0 3px rgba(0, 224, 84, 0.1);

/* Placeholder */
color: #666666;
```

### 4.3 Cards

#### Project Card

```css
background: #141414;
border: 1px solid #2a2a2a;
border-radius: 12px;
overflow: hidden;
transition: all 200ms ease-in-out;

/* Hover */
border-color: #444;
transform: translateY(-2px);
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
```

#### Feature Card (Quick Record)

```css
background: #141414;
border: 1px solid #2a2a2a;
border-radius: 12px;
padding: 32px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 12px;
transition: all 200ms ease-in-out;

/* Hover */
border-color: #444;
```

### 4.4 Speaker Tags

```css
background: rgba(157, 0, 255, 0.15);
color: #c479ff;
font-size: 11px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.05em;
padding: 4px 12px;
border-radius: 12px;
display: inline-block;
margin-bottom: 8px;
```

### 4.5 Timeline Playhead

```css
/* Playhead line */
width: 2px;
background: #00e054;
height: 100%;
box-shadow: 0 0 10px rgba(0, 224, 84, 0.6);
position: absolute;

/* Playhead handle */
width: 10px;
height: 10px;
background: #00e054;
border-radius: 50%;
position: absolute;
top: -5px;
left: -4px;
box-shadow: 0 0 8px rgba(0, 224, 84, 0.8);
cursor: grab;
```

### 4.6 Glassmorphic Panel

```css
background: rgba(30, 30, 30, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.05);
border-radius: 12px;
```

---

## 5. Interaction States

### 5.1 Hover States

| Element             | Default        | Hover                                |
| ------------------- | -------------- | ------------------------------------ |
| **Navigation Item** | `#888888` text | `#FFFFFF` text, `#1E1E1E` background |
| **Icon Button**     | Transparent    | `#1E1E1E` background, `#00E054` icon |
| **Primary Button**  | `#00E054`      | `#00FF5E`, stronger glow             |
| **Project Card**    | Normal         | `translateY(-2px)`, stronger shadow  |
| **Timeline Clip**   | Normal         | Highlight border, cursor changes     |

### 5.2 Active States

| Element                | Active Style                                              |
| ---------------------- | --------------------------------------------------------- |
| **Navigation Item**    | `#1A1A1A` background, `3px` left green border, white text |
| **Sidebar Icon**       | `#00E054` color with background glow                      |
| **Toggle Switch**      | Green background when on                                  |
| **Timeline Selection** | Blue overlay with handles                                 |

### 5.3 Focus States

| Element          | Focus Style                                          |
| ---------------- | ---------------------------------------------------- |
| **Input Field**  | `#00E054` border, `rgba(0, 224, 84, 0.1)` box-shadow |
| **Button**       | Outline with `#00E054` at `3px` offset               |
| **Video Player** | Green border glow                                    |

---

## 6. Iconography

### 6.1 Icon System

- **Library:** [Lucide Icons](https://lucide.dev/) or custom SVG icons
- **Default Size:** `20px` for toolbar, `32px` for feature cards
- **Stroke Width:** `2px` for outline icons
- **Color:** Inherits from parent, typically `#FFFFFF` or `#888888`

### 6.2 Icon Categories

#### Navigation Icons

- Home (house)
- All Projects (folder)
- Templates (grid)
- Shared with me (users)
- Settings (gear)

#### Edit Tools

- Razor/Split (scissors)
- Selection (arrow)
- Trim (crop)
- Hand (hand)
- Zoom (magnifying glass)

#### Playback Controls

- Play (triangle)
- Pause (two bars)
- Skip Forward/Back (triangles with bars)
- Stop (square)

#### Media Icons

- Video (camera)
- Audio (microphone)
- Screen (monitor)
- Combo (layers)

---

## 7. Responsive Behavior

### 7.1 Breakpoints

| Breakpoint        | Width             | Adjustments                                                         |
| ----------------- | ----------------- | ------------------------------------------------------------------- |
| **Desktop Large** | `≥1440px`         | Default layout                                                      |
| **Desktop**       | `1024px - 1439px` | Reduce sidebar widths slightly                                      |
| **Tablet**        | `768px - 1023px`  | Stack center panels vertically, collapse left sidebar to icons only |
| **Mobile**        | `<768px`          | Single column layout, bottom navigation                             |

### 7.2 Layout Adaptations

#### Dashboard (Mobile)

- Sidebar becomes bottom tab bar
- AI Assistant full-width
- Quick Record cards in 2-column grid
- Project cards in single column

#### Video Editor (Tablet)

- Left sidebar collapses to icon-only
- Text editor and video preview stack vertically
- Right panel becomes collapsible drawer
- Timeline remains at bottom but with smaller track heights

---

## 8. Accessibility Standards

### 8.1 Contrast Requirements

All text meets **WCAG 2.1 AA standards**:

- Normal text: Minimum 4.5:1 contrast ratio
- Large text (18px+): Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio

### 8.2 Keyboard Navigation

- All interactive elements are keyboard accessible
- Visible focus indicators (green outline)
- Logical tab order
- Keyboard shortcuts for common actions:
  - `Space`: Play/Pause
  - `F`: Fullscreen video
  - `Cmd/Ctrl + S`: Save
  - `Cmd/Ctrl + Z`: Undo

### 8.3 Screen Reader Support

- Semantic HTML elements
- ARIA labels for icons and interactive elements
- Live regions for timeline updates
- Audio descriptions for video previews (where applicable)

---

## 9. Animation & Motion

### 9.1 Principles

- **Purpose-driven:** Animations should provide feedback or guide attention
- **Subtle:** Avoid excessive or distracting motion
- **Fast:** Keep durations under 300ms for most interactions
- **Smooth:** Use cubic-bezier easing for natural feel

### 9.2 Common Animations

#### Fade In/Out

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

animation: fadeIn 200ms ease-in-out;
```

#### Slide Up

```css
@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

animation: slideUp 250ms cubic-bezier(0.4, 0, 0.2, 1);
```

#### Glow Pulse (for active playhead)

```css
@keyframes glowPulse {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(0, 224, 84, 0.6);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 224, 84, 0.8);
  }
}

animation: glowPulse 2s ease-in-out infinite;
```

---

## 10. Implementation Notes

### 10.1 CSS Architecture

**Recommended Approach:** Tailwind CSS with custom theme configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-secondary': '#0F0F0F',
        'accent-primary': '#00E054',
        // ... (all design tokens)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Roboto Mono', 'monospace'],
      },
      spacing: {
        // 8px base unit system
      },
    },
  },
};
```

**Alternative:** CSS Variables for easy theme switching

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #0f0f0f;
  --accent-primary: #00e054;
  /* ... */
}
```

### 10.2 Component Library

Use **shadcn/ui** as the base component library (as specified in PRD), with custom theming to match Auteur design tokens.

**Key Components:**

- Button
- Input
- Card
- Dialog/Modal
- Dropdown Menu
- Tooltip
- Slider
- Toggle
- Tabs
- Avatar

### 10.3 Custom Components

Build these components from scratch:

- Timeline (complex video editing timeline)
- Video Player (with custom controls)
- Waveform Visualizer
- Transcript Editor (Tiptap-based)
- AI Feature Panel

### 10.4 State Management

- **Zustand:** For global application state
- **React Query:** For server state and API calls
- **Local State:** React hooks for component-specific state

---

## 11. Design Assets

### 11.1 Logo Specifications

**Primary Logo:**

- Text: "Auteur"
- Font: Inter, Bold (700)
- Size: `20px`
- Color: `#FFFFFF`
- Optional: Small green dot accent (`#00E054`)

### 11.2 Favicon

- Size: `32x32px`, `64x64px`, `128x128px`
- Design: Stylized "A" or camera icon
- Background: `#0A0A0A`
- Icon color: `#00E054`

### 11.3 Loading States

**Spinner:**

- Size: `24px`, `32px`, `48px` variants
- Color: `#00E054`
- Animation: Smooth rotation at 1s duration

**Skeleton Loaders:**

- Background: `#141414`
- Shimmer effect: `linear-gradient(90deg, #141414 25%, #1E1E1E 50%, #141414 75%)`
- Animation: Slide shimmer across element

---

## 12. Design References

### 12.1 Inspiration

Auteur's design draws inspiration from:

- **Adobe Premiere Pro:** Professional timeline, multi-track editing
- **DaVinci Resolve:** Color grading panels, clean dark interface
- **Final Cut Pro:** Magnetic timeline, modern UI patterns
- **Spotify:** Green accent color, glassmorphic panels

### 12.2 Industry Standards

- **Dark theme:** Reduces eye strain for long editing sessions
- **Timeline at bottom:** Industry standard for video editors
- **Preview in center:** Natural focal point for editors
- **Toolbars at edges:** Quick access without obscuring work area

---

## 13. Version History

| Version | Date             | Changes                                                     |
| ------- | ---------------- | ----------------------------------------------------------- |
| 1.0     | January 30, 2026 | Initial design system consolidation from UI mockups and PRD |

---

## Appendix A: Color Palette Quick Reference

### Background Colors

```
#0A0A0A - Main background
#0F0F0F - Secondary background
#111111 - Sidebar, panels
#141414 - Cards, components
#1A1A1A - Active/hover states
#1E1E1E - Overlays
```

### Accent Colors

```
#00E054 - Primary accent (Spotify green)
#9D00FF - Purple accent
#C479FF - Light purple
#FFB347 - Orange (warnings)
```

### Text Colors

```
#FFFFFF - Primary text
#E0E0E0 - Secondary text
#A1A1A1 - Tertiary text
#888888 - Muted text
#666666 - Subtle text
#444444 - Disabled text
```

### Border Colors

```
#222222 - Subtle borders
#2A2A2A - Default borders
#333333 - Medium borders
#444444 - Strong borders
```

---

## Appendix B: File Organization

### Design Files

```
docs/design/
├── ui-design-system.md          # This document
├── images/
│   ├── auteur-dashboard.png     # Dashboard mockup
│   └── video-editor-pro.png     # Editor mockup
└── assets/
    ├── logo.svg
    ├── icons/
    └── patterns/
```

### Implementation

```
packages/ui/
├── components/
│   ├── buttons/
│   ├── cards/
│   ├── inputs/
│   └── timeline/
├── styles/
│   ├── tokens.css              # Design tokens as CSS variables
│   └── globals.css             # Global styles
└── theme/
    └── tailwind-preset.js      # Tailwind theme configuration
```

---

**End of Document**
