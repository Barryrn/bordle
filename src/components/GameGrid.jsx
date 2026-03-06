import React from "react";
import { useGame } from "../context/GameContext";
import { MAX_GUESSES, WORD_LENGTH } from "../hooks/useGameReducer";

function GameTile({ letter, state }) {
  const ariaLabel = letter
    ? `Letter ${letter}, ${state === "correct" ? "correct position" : state === "present" ? "wrong position" : state === "absent" ? "not in word" : "pending"}`
    : "Empty";

  return (
    <div
      className={`game-tile${state ? ` tile-${state}` : ""}${letter && !state ? " tile-active" : ""}`}
      role="gridcell"
      aria-label={ariaLabel}
      data-state={state || "empty"}
    >
      {letter || ""}
    </div>
  );
}

function GameRow({ guess, evaluation, isCurrent }) {
  const tiles = Array.from({ length: WORD_LENGTH }, (_, i) => ({
    letter: guess?.[i] || "",
    state: evaluation?.[i] || null,
  }));

  return (
    <div className={`game-row${isCurrent ? " row-current" : ""}`} role="row">
      {tiles.map((tile, i) => (
        <GameTile key={i} letter={tile.letter} state={tile.state} />
      ))}
    </div>
  );
}

function GameGrid() {
  const { state } = useGame();
  const { guesses, currentGuess, evaluations } = state;

  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => {
    if (i < guesses.length) {
      return { guess: guesses[i], evaluation: evaluations[i], isCurrent: false };
    }
    if (i === guesses.length) {
      return { guess: currentGuess, evaluation: null, isCurrent: true };
    }
    return { guess: [], evaluation: null, isCurrent: false };
  });

  return (
    <main className="game-main">
      <div className="streak-display">
        <span>Streak: {state.currentStreak}</span>
      </div>
      <div className="game-grid" role="grid" aria-label="Game board">
        {rows.map((row, i) => (
          <GameRow
            key={i}
            guess={row.guess}
            evaluation={row.evaluation}
            isCurrent={row.isCurrent}
          />
        ))}
      </div>
    </main>
  );
}

export default GameGrid;
