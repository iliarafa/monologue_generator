# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Think That, Say That** — A React app that generates theatrical monologues in the style of famous playwrights using the Anthropic API. Includes iOS support via Capacitor.

## Commands

```bash
# Install dependencies
npm install

# Start React dev server (port 3000)
npm start

# Start API proxy server (port 3002) — required for monologue generation
npm run server

# Production build
npm run build

# Run tests
npm run test

# iOS build & deploy
npm run build && npx cap sync ios && npx cap open ios
```

Both `npm start` and `npm run server` must be running for development. The CRA proxy setting in package.json routes `/api/*` requests from :3000 to :3002.

## Environment

Create `.env.local` at the project root with `ANTHROPIC_API_KEY=your-key`.

## Architecture

**Tech stack:** React 19 (plain JS, not TypeScript), Tailwind CSS, Express proxy server, Capacitor for iOS.

**Routing:** No React Router. App.js manages a `currentView` state that switches between four views: `input`, `playwrightSelect`, `textInput`, and `result`.

**Monologue generation flow:**
1. User enters text (TextInputPage) and selects a playwright style (PlaywrightSelectPage)
2. InputPage shows selections; "Generate Monologue" triggers `generateMonologue()` in App.js
3. Frontend POSTs to `/api/generate` → Express proxy (server.js) forwards to Anthropic API with the API key
4. Response displayed in ResultPage with export options (PDF/DOC/CSV/clipboard)

**API details:** Uses `claude-sonnet-4-20250514` model, 4000 max tokens. Each playwright style has a detailed prompt in the `stylePrompts` object in App.js (~lines 49-105). Seven styles: Chekhov, Brecht, Beckett, Miller, Shepard, Mamet, McDonagh.

**Export:** `src/utils/exportUtils.js` handles PDF (jsPDF), DOC (HTML blob), CSV, and Web Share API with clipboard fallback.

**iOS considerations:** The app uses fixed positioning, `overflow: hidden`, and safe-area-inset CSS to prevent scroll/bounce on iOS. `index.css` contains critical viewport fixes. Capacitor config disables scrolling (`ios.scrollEnabled: false`).

**Styling:** DOS-era retro aesthetic — black borders, white backgrounds, Georgia serif and monospace fonts, blink animation for cursor effect. Tailwind classes used throughout components.
