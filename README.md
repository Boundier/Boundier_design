# Boundier Demo

A concept demo for Conscient Technology influence detection.

## Overview

This demo illustrates how the Conscient engine analyzes social media content for influence cues and tracks user vulnerability patterns in real-time.

**Tech Stack:**
- React + Vite
- Tailwind CSS
- Framer Motion
- Recharts
- LocalStorage (for persistence)

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Scoring Rules (Conscient Engine)

The engine uses a deterministic rule-based system to calculate Influence Vectors and Response Vectors.

### Influence Vector
Calculated based on content analysis:
- **Fear**: Triggered by words like "warn", "danger", "risk", high tension audio, or shocked facial expressions.
- **Urgency**: Triggered by time-sensitive words ("now", "today", "limited") and intense punctuation.
- **Hype**: Triggered by clickbait phrases ("you won't believe") and specific vocabulary.
- **Authority**: Triggered by references to experts, studies, or research.
- **Curiosity**: Triggered by questions or information gaps.
- **Visual Hype**: Derived from thumbnail saturation and facial presence.

### Response Vector
Calculated based on user interaction:
- **Engagement**: Based on dwell time.
- **Hesitation**: Rapid tap-then-scroll behavior.
- **Fixation**: Repeated opens or long dwell time.
- **Clickbait Response**: Fast click-through rate.

## Data & Privacy

**Privacy Note:** This is a client-side only demo. All analysis happens in your browser and data is stored in your browser's LocalStorage. No data is sent to any server.

### Resetting Data
You can reset all collected data by clicking the trash icon in the Dashboard.

## License

Demo purposes only.
