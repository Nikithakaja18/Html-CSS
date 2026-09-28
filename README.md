# Skillora

A lightweight online examination system built with Node.js and Express. It includes a seeded full-stack fundamentals exam, countdown timer, question navigation, answer selection, submission scoring, and a detailed review screen.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

For development with Node's built-in watcher:

```bash
npm run dev
```

## API

- `GET /api/subjects` returns the available subjects and quiz metadata.
- `GET /quiz/:subject` opens a subject quiz, such as `/quiz/java` or `/quiz/computer-networks`.
- `GET /api/exam/:subject` returns that subject's public exam metadata and questions. Correct answers are not sent to the browser.
- `GET /api/exam` remains the original full-stack fundamentals exam.
- `POST /api/submit` accepts `{ "subject": "java", "answers": { "1": 1 } }` and returns the score plus answer breakdown. The subject is optional for compatibility with existing clients; omitting it scores the original full-stack exam.

Available subject slugs: `java`, `python`, `dbms`, `data-structures`, `operating-systems`, `computer-networks`, and `machine-learning`.

The current version stores exam data in memory so it can run immediately without database configuration. A production version should add authentication, persistent storage, server-side attempt records, and stronger anti-cheating controls.
