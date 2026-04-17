import type { Question } from "./questions";
import type { Guess } from "./types";

/**
 * Numeric: rank players by absolute log-ratio to the true answer (so 2× off
 * and 0.5× off are equally bad). Closest gets 3 pts, next 2, next 1. Ties
 * share the higher points.
 *
 * Comparison: each correct player gets 2 pts.
 */
export function scoreRound(
  question: Question,
  guesses: Record<string, Guess>,
): Record<string, number> {
  const points: Record<string, number> = {};
  const playerIds = Object.keys(guesses);
  for (const id of playerIds) points[id] = 0;

  if (question.kind === "comparison") {
    for (const id of playerIds) {
      const g = guesses[id];
      if (g.kind === "comparison" && g.value === question.answer) {
        points[id] = 2;
      }
    }
    return points;
  }

  const truth = question.answer;
  const scored = playerIds.map((id) => {
    const g = guesses[id];
    const v = g.kind === "numeric" ? g.value : NaN;
    const distance = logDistance(v, truth);
    return { id, distance };
  });

  // Players who didn't submit (NaN) go to the bottom.
  scored.sort((a, b) => {
    const ad = Number.isFinite(a.distance) ? a.distance : Infinity;
    const bd = Number.isFinite(b.distance) ? b.distance : Infinity;
    return ad - bd;
  });

  const podium = [3, 2, 1];
  let rank = 0;
  for (let i = 0; i < scored.length; i++) {
    if (i > 0 && scored[i].distance !== scored[i - 1].distance) rank = i;
    const pts = podium[rank];
    if (pts && Number.isFinite(scored[i].distance)) {
      points[scored[i].id] = pts;
    }
  }

  return points;
}

function logDistance(guess: number, truth: number): number {
  if (!Number.isFinite(guess) || guess <= 0 || truth <= 0) {
    return Math.abs(guess - truth);
  }
  return Math.abs(Math.log10(guess) - Math.log10(truth));
}

export function pickRandomQuestions<T>(pool: T[], n: number): T[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}
