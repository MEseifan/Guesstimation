import { useMemo, useState } from "react";
import type { Question } from "../questions";
import type { Guess, Player } from "../types";
import { parseNumber, formatNumber } from "../format";

type Props = {
  question: Question;
  players: Player[];
  scoreboard: Player[];
  onSubmit: (guesses: Record<string, Guess>) => void;
};

export function QuestionScreen({ question, players, scoreboard, onSubmit }: Props) {
  const [turnIdx, setTurnIdx] = useState(0);
  const [guesses, setGuesses] = useState<Record<string, Guess>>({});
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const current = players[turnIdx];
  const isLast = turnIdx === players.length - 1;

  const preview = useMemo(() => {
    if (question.kind !== "numeric") return null;
    const parsed = parseNumber(input);
    if (parsed === null) return null;
    return formatNumber(parsed);
  }, [input, question.kind]);

  function advance(nextGuesses: Record<string, Guess>) {
    if (isLast) {
      onSubmit(nextGuesses);
    } else {
      setTurnIdx(turnIdx + 1);
      setInput("");
      setError(null);
    }
  }

  function submitNumeric() {
    const parsed = parseNumber(input);
    if (parsed === null || parsed < 0) {
      setError("Enter a number. Try 1.2b, 500k, or 37000.");
      return;
    }
    const next = { ...guesses, [current.id]: { kind: "numeric" as const, value: parsed } };
    setGuesses(next);
    advance(next);
  }

  function submitComparison(choice: "A" | "B") {
    const next = { ...guesses, [current.id]: { kind: "comparison" as const, value: choice } };
    setGuesses(next);
    advance(next);
  }

  return (
    <section className="card question">
      <div className="question__turn">
        <div className="turn-pills">
          {players.map((p, i) => (
            <span
              key={p.id}
              className={`turn-pill${i === turnIdx ? " turn-pill--active" : ""}${guesses[p.id] ? " turn-pill--done" : ""}`}
            >
              {p.name}
            </span>
          ))}
        </div>
        <p className="question__pass">
          Pass the device to <b>{current.name}</b>
          {" — "}other players, close your eyes!
        </p>
      </div>

      <div className="question__body">
        <p className="question__label">Question</p>
        <h2 className="question__prompt">{question.prompt}</h2>

        {question.kind === "numeric" ? (
          <form
            className="question__form"
            onSubmit={(e) => {
              e.preventDefault();
              submitNumeric();
            }}
          >
            <div className="numeric-input">
              <input
                autoFocus
                key={current.id}
                className="numeric-input__field"
                placeholder="Your guess"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(null);
                }}
                inputMode="decimal"
              />
              {question.unit && <span className="numeric-input__unit">{question.unit}</span>}
            </div>
            {preview && <p className="question__preview">= {preview}</p>}
            {error && <p className="question__error">{error}</p>}
            <p className="question__hint">
              Tip: shortcuts like <code>3.5b</code>, <code>500k</code>, or <code>1.2m</code> work too.
            </p>
            <button className="btn btn--primary btn--wide" type="submit">
              {isLast ? "Reveal answer →" : `Next: ${players[turnIdx + 1].name} →`}
            </button>
          </form>
        ) : (
          <div className="comparison">
            <button
              className="comparison__option"
              onClick={() => submitComparison("A")}
              type="button"
            >
              <span className="comparison__label">A</span>
              <span className="comparison__text">{question.optionA}</span>
            </button>
            <div className="comparison__vs">vs</div>
            <button
              className="comparison__option"
              onClick={() => submitComparison("B")}
              type="button"
            >
              <span className="comparison__label">B</span>
              <span className="comparison__text">{question.optionB}</span>
            </button>
          </div>
        )}
      </div>

      <aside className="question__sidebar">
        <h3>Standings</h3>
        <ol className="standings">
          {scoreboard.map((p) => (
            <li key={p.id} className="standings__row">
              <span className="standings__name">{p.name}</span>
              <span className="standings__score">{p.score}</span>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
