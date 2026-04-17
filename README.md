# Guesstimation

A local web app for playing Fermi-style estimation games with friends on a
shared computer. Register players, then take turns guessing answers to
number-based puzzles — closest guess wins the round.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## How the game works

1. Add 2+ players.
2. The app picks 10 random questions from a pool of 30.
3. Each round, everyone takes a turn typing a guess on the same device (the
   app prompts you to pass it around).
4. After all guesses are in, the answer + reasoning is revealed and points are
   awarded:
   - **Numeric questions**: closest guess = 3 pts, 2nd closest = 2 pts, 3rd
     closest = 1 pt. "Closeness" is measured on a log scale, so a guess that's
     2× off beats one that's 10× off.
   - **Comparison questions** (A vs B): every correct guess = 2 pts.
5. Final leaderboard at the end.

## Add / edit questions

Questions live in [`src/questions.ts`](src/questions.ts). Two shapes supported:

- `numeric` — a single number answer (e.g. "how many piano tuners in NYC?").
- `comparison` — which of two options is larger (e.g. "sand on beaches vs
  stars in the universe?").

Each question has a `reasoning` field that's shown after the reveal, so
players can see how to arrive at the answer.

## Stack

Vite + React + TypeScript. No backend — state lives in memory, refresh
starts a new game.
