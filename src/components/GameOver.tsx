import type { Player, RoundResult } from "../types";

type Props = {
  scoreboard: Player[];
  history: RoundResult[];
  onPlayAgain: () => void;
  onNewGame: () => void;
};

export function GameOver({ scoreboard, history, onPlayAgain, onNewGame }: Props) {
  const winner = scoreboard[0];
  const tiedWithWinner = scoreboard.filter((p) => p.score === winner.score);

  return (
    <section className="card gameover">
      <p className="gameover__label">Game over</p>

      {tiedWithWinner.length > 1 ? (
        <h2 className="gameover__title">
          It's a tie! <span>{tiedWithWinner.map((p) => p.name).join(" & ")}</span>
        </h2>
      ) : (
        <h2 className="gameover__title">
          <span>{winner.name}</span> wins!
        </h2>
      )}

      <ol className="final-board">
        {scoreboard.map((p, i) => (
          <li key={p.id} className={`final-row${i === 0 ? " final-row--winner" : ""}`}>
            <span className="final-row__rank">{medal(i)}</span>
            <span className="final-row__name">{p.name}</span>
            <span className="final-row__score">{p.score} pts</span>
          </li>
        ))}
      </ol>

      <details className="gameover__recap">
        <summary>Round-by-round recap</summary>
        <ol className="recap">
          {history.map((r, i) => (
            <li key={i}>
              <p className="recap__prompt">
                <b>Q{i + 1}.</b> {r.question.prompt}
              </p>
              <p className="recap__answer">
                Answer:{" "}
                {r.question.kind === "numeric"
                  ? formatSimple(r.question.answer) +
                    (r.question.unit ? ` ${r.question.unit}` : "")
                  : r.question.answer === "A"
                    ? r.question.optionA
                    : r.question.optionB}
              </p>
            </li>
          ))}
        </ol>
      </details>

      <div className="gameover__actions">
        <button className="btn btn--ghost" onClick={onNewGame} type="button">
          New players
        </button>
        <button className="btn btn--primary" onClick={onPlayAgain} type="button">
          Play again →
        </button>
      </div>
    </section>
  );
}

function medal(i: number) {
  if (i === 0) return "1st";
  if (i === 1) return "2nd";
  if (i === 2) return "3rd";
  return `${i + 1}th`;
}

function formatSimple(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toPrecision(3)} trillion`;
  if (n >= 1e9) return `${(n / 1e9).toPrecision(3)} billion`;
  if (n >= 1e6) return `${(n / 1e6).toPrecision(3)} million`;
  return n.toLocaleString();
}
