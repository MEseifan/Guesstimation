import type { Question } from "./questions";

export type Player = {
  id: string;
  name: string;
  score: number;
};

export type NumericGuess = { kind: "numeric"; value: number };
export type ComparisonGuess = { kind: "comparison"; value: "A" | "B" };
export type Guess = NumericGuess | ComparisonGuess;

export type RoundResult = {
  question: Question;
  guesses: Record<string, Guess>; // playerId -> guess
  pointsAwarded: Record<string, number>; // playerId -> points this round
};

export type Phase =
  | { kind: "setup" }
  | { kind: "playing"; roundIndex: number; stage: "guessing" | "reveal" }
  | { kind: "finished" };

export type GameState = {
  players: Player[];
  questions: Question[];
  history: RoundResult[];
  pendingGuesses: Record<string, Guess>;
  phase: Phase;
};
