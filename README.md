# Think That, Say That

A web app that transforms text into theatrical monologues in the style of famous playwrights. Paste any text, pick a style, and Claude AI rewrites it as a stage monologue. Export your monologue as PDF, DOC, or CSV.

## Playwright Styles

- **Anton Chekhov** — Subtext, longing, naturalistic dialogue, emotional undercurrents
- **Bertolt Brecht** — Epic theatre, alienation effect, didactic, political commentary
- **Samuel Beckett** — Minimalist, pauses, existential uncertainty
- **Arthur Miller** — American tragedy, moral struggle, social critique
- **Sam Shepard** — American mythology, fragmented identity, lyricism
- **David Mamet** — Staccato rhythms, repetition, interrupted speech
- **Martin McDonagh** — Dark comedy, violence, Irish vernacular, moral ambiguity

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

## iOS (Capacitor)

The app includes Capacitor integration for iOS deployment. After building the React app, sync and open in Xcode:

```
npm run build
npx cap sync ios
npx cap open ios
```

## Tech Stack

- React
- Tailwind CSS
- Express (API proxy)
- Claude API (claude-sonnet-4-20250514)
- Capacitor (iOS)
- jsPDF (PDF export)
