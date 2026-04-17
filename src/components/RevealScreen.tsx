import { useMemo } from "react";
import type { Player, RoundResult } from "../types";
import { formatNumber } from "../format";

type Props = {
  round: RoundResult;
  players: Player[];
  scoreboard: Player[];
  isLast: boolean;
  onNext: () => void;
};

export function RevealScreen({ round, players, scoreboard, isLast, onNext }: Props) {
  const { question, guesses, pointsAwarded } = round;

  const rows = useMemo(() => {
    return players.map((p) => {
      const guess = guesses[p.id];
      const pts = pointsAwarded[p.id] ?? 0;
      return { player: p, guess, pts };
    });
  }, [players, guesses, pointsAwarded]);

  const ranked = useMemo(() => {
    if (question.kind !== "numeric") return rows;
    return [...rows].sort((a, b) => {
      const da = a.guess.kind === "numeric" ? Math.abs(Math.log10(Math.max(a.guess.value, 1e-9)) - Math.log10(question.answer)) : Infinity;
      const db = b.guess.kind === "numeric" ? Math.abs(Math.log10(Math.max(b.guess.value, 1e-9)) - Math.log10(question.answer)) : Infinity;
      return da - db;
    });
  }, [rows, question]);

  return (
    <section className="card reveal">
      <div className="reveal__question">
        <p className="reveal__label">The answer</p>
        <h2 className="reveal__prompt">{question.prompt}</h2>

        {question.kind === "numeric" ? (
          <div className="reveal__answer">
            <span className="reveal__number">{formatNumber(question.answer)}</span>
            {question.unit && <span className="reveal__unit">{question.unit}</span>}
          </div>
        ) : (
          <div className="reveal__answer reveal__answer--comparison">
            <span className="reveal__number">
              {question.answer === "A" ? question.optionA : question.optionB}
            </span>
          </div>
        )}

        <p className="reveal__reasoning">{question.reasoning}</p>
      </div>

      <div className="reveal__results">
        <h3>This round</h3>
        <ul className="result-list">
          {ranked.map(({ player, guess, pts }) => (
            <li key={player.id} className={`result-row${pts > 0 ? " result-row--scored" : ""}`}>
              <span className="result-row__name">{player.name}</span>
              <span className="result-row__guess">
                {guess.kind === "numeric"
                  ? formatNumber(guess.value)
                  : guess.value === "A"
                    ? question.kind === "comparison"
                      ? question.optionA
                      : guess.value
                    : question.kind === "comparison"
                      ? question.optionB
                      : guess.value}
              </span>
              <span className="result-row__points">
                {pts > 0 ? `+${pts}` : "—"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="reveal__standings">
        <h3>Standings</h3>
        <ol className="standings">
          {scoreboard.map((p, i) => (
            <li key={p.id} className="standings__row">
              <span className="standings__rank">{i + 1}</span>
              <span className="standings__name">{p.name}</span>
              <span className="standings__score">{p.score}</span>
            </li>
          ))}
        </ol>
      </aside>

      <button className="btn btn--primary btn--wide" onClick={onNext} type="button">
        {isLast ? "See final results →" : "Next round →"}
      </button>
    </section>
  );
}
