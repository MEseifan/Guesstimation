import { useMemo, useState } from "react";
import { QUESTIONS } from "./questions";
import type { Player, RoundResult, Guess } from "./types";
import { pickRandomQuestions, scoreRound } from "./scoring";
import { PlayerSetup } from "./components/PlayerSetup";
import { QuestionScreen } from "./components/QuestionScreen";
import { RevealScreen } from "./components/RevealScreen";
import { GameOver } from "./components/GameOver";

const ROUNDS_PER_GAME = 10;

type Phase =
  | { kind: "setup" }
  | { kind: "guessing"; round: number }
  | { kind: "reveal"; round: number }
  | { kind: "finished" };

export function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [questions, setQuestions] = useState(() => pickRandomQuestions(QUESTIONS, ROUNDS_PER_GAME));
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [phase, setPhase] = useState<Phase>({ kind: "setup" });

  const scoreboard = useMemo(() => {
    return players
      .map((p) => ({ ...p }))
      .sort((a, b) => b.score - a.score);
  }, [players]);

  function startGame(newPlayers: Player[]) {
    setPlayers(newPlayers);
    setQuestions(pickRandomQuestions(QUESTIONS, ROUNDS_PER_GAME));
    setHistory([]);
    setPhase({ kind: "guessing", round: 0 });
  }

  function submitGuesses(guesses: Record<string, Guess>) {
    if (phase.kind !== "guessing") return;
    const question = questions[phase.round];
    const pts = scoreRound(question, guesses);

    setPlayers((prev) =>
      prev.map((p) => ({ ...p, score: p.score + (pts[p.id] ?? 0) })),
    );
    setHistory((prev) => [
      ...prev,
      { question, guesses, pointsAwarded: pts },
    ]);
    setPhase({ kind: "reveal", round: phase.round });
  }

  function nextRound() {
    if (phase.kind !== "reveal") return;
    const nextIdx = phase.round + 1;
    if (nextIdx >= questions.length) {
      setPhase({ kind: "finished" });
    } else {
      setPhase({ kind: "guessing", round: nextIdx });
    }
  }

  function restart() {
    setPlayers([]);
    setHistory([]);
    setPhase({ kind: "setup" });
  }

  function playAgainSamePlayers() {
    setPlayers((prev) => prev.map((p) => ({ ...p, score: 0 })));
    setQuestions(pickRandomQuestions(QUESTIONS, ROUNDS_PER_GAME));
    setHistory([]);
    setPhase({ kind: "guessing", round: 0 });
  }

  return (
    <div className="app">
      <div className="backdrop" aria-hidden />
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__title-mark">~</span>Guesstimation
        </h1>
        {phase.kind === "guessing" || phase.kind === "reveal" ? (
          <div className="app__progress">
            <span className="app__progress-label">
              Round {phase.round + 1} / {questions.length}
            </span>
            <div className="app__progress-bar">
              <div
                className="app__progress-fill"
                style={{
                  width: `${((phase.round + (phase.kind === "reveal" ? 1 : 0)) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : null}
      </header>

      <main className="app__main">
        {phase.kind === "setup" && <PlayerSetup onStart={startGame} />}

        {phase.kind === "guessing" && (
          <QuestionScreen
            key={`q-${phase.round}`}
            question={questions[phase.round]}
            players={players}
            onSubmit={submitGuesses}
            scoreboard={scoreboard}
          />
        )}

        {phase.kind === "reveal" && (
          <RevealScreen
            round={history[history.length - 1]}
            players={players}
            scoreboard={scoreboard}
            isLast={phase.round + 1 >= questions.length}
            onNext={nextRound}
          />
        )}

        {phase.kind === "finished" && (
          <GameOver
            scoreboard={scoreboard}
            history={history}
            onPlayAgain={playAgainSamePlayers}
            onNewGame={restart}
          />
        )}
      </main>

      <footer className="app__footer">
        <span>Reasoning beats recall.</span>
      </footer>
    </div>
  );
}
