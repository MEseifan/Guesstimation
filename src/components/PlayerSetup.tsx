import { useState } from "react";
import type { Player } from "../types";

type Props = {
  onStart: (players: Player[]) => void;
};

export function PlayerSetup({ onStart }: Props) {
  const [names, setNames] = useState<string[]>(["", ""]);
  const [error, setError] = useState<string | null>(null);

  function updateName(i: number, value: string) {
    setNames((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  function addPlayer() {
    if (names.length >= 10) return;
    setNames((prev) => [...prev, ""]);
  }

  function removePlayer(i: number) {
    if (names.length <= 1) return;
    setNames((prev) => prev.filter((_, idx) => idx !== i));
  }

  function start() {
    const cleaned = names.map((n) => n.trim()).filter(Boolean);
    if (cleaned.length < 2) {
      setError("Add at least 2 players to start.");
      return;
    }
    const lower = cleaned.map((n) => n.toLowerCase());
    if (new Set(lower).size !== lower.length) {
      setError("Give each player a unique name.");
      return;
    }
    const players: Player[] = cleaned.map((name, idx) => ({
      id: `p${idx}-${name.toLowerCase().replace(/\s+/g, "-")}`,
      name,
      score: 0,
    }));
    onStart(players);
  }

  return (
    <section className="card setup">
      <div className="setup__intro">
        <h2 className="card__title">Who's playing?</h2>
        <p className="card__subtitle">
          Add 2 or more players. You'll take turns entering guesses on the same device.
        </p>
      </div>

      <div className="setup__players">
        {names.map((name, i) => (
          <div key={i} className="player-input">
            <span className="player-input__index">{i + 1}</span>
            <input
              className="player-input__field"
              placeholder={`Player ${i + 1}`}
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (i === names.length - 1) addPlayer();
                }
              }}
              maxLength={24}
              autoFocus={i === 0}
            />
            {names.length > 1 && (
              <button
                className="player-input__remove"
                onClick={() => removePlayer(i)}
                aria-label={`Remove player ${i + 1}`}
                type="button"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="setup__actions">
        <button className="btn btn--ghost" onClick={addPlayer} disabled={names.length >= 10} type="button">
          + Add player
        </button>
        <button className="btn btn--primary" onClick={start} type="button">
          Start game →
        </button>
      </div>

      {error && <p className="setup__error">{error}</p>}

      <div className="setup__rules">
        <h3>How it works</h3>
        <ul>
          <li>10 questions per game, picked at random from a pool of 30.</li>
          <li>Each round, every player types a guess. The app reveals the answer at the end.</li>
          <li>
            Numeric questions: closest gets <b>3 pts</b>, 2nd <b>2 pts</b>, 3rd <b>1 pt</b>. Distance is measured on a log scale, so 2× off beats 10× off.
          </li>
          <li>
            Comparison questions: every correct answer gets <b>2 pts</b>.
          </li>
        </ul>
      </div>
    </section>
  );
}
