# Monologue Generator

A web app that transforms text into theatrical monologues in the style of famous playwrights. Paste any text, pick a style, and Claude AI rewrites it as a stage monologue.

## Playwright Styles

- **Samuel Beckett** — Minimalist, pauses, existential uncertainty
- **David Mamet** — Staccato rhythms, repetition, interrupted speech
- **Quentin Tarantino** — Pop culture, vernacular, conversational
- **Harold Pinter** — Menacing pauses, power dynamics, subtext
- **Sam Shepard** — American mythology, fragmented identity, lyricism
- **Caryl Churchill** — Overlapping dialogue, temporal shifts, political

## Setup

### 1. Install dependencies

```
npm install
```

### 2. Add your API key

Create a `.env.local` file in the project root:

```
ANTHROPIC_API_KEY=your-api-key-here
```

### 3. Start the servers

Start the proxy server:

```
npm run server
```

In a separate terminal, start the React dev server:

```
npm start
```

The app will be available at http://localhost:3000.

## Tech Stack

- React
- Tailwind CSS
- Express (API proxy)
- Claude API (claude-sonnet-4-20250514)
