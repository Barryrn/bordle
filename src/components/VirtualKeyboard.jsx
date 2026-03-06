import React from "react";
import { useGame } from "../context/GameContext";
import useKeyboardInput from "../hooks/useKeyboardInput";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

function Key({ letter, state, onClick }) {
  const isWide = letter === "ENTER" || letter === "BACK";
  const display = letter === "BACK" ? "\u232B" : letter === "ENTER" ? "Enter" : letter;
  const ariaLabel =
    letter === "BACK"
      ? "Delete letter"
      : letter === "ENTER"
        ? "Submit guess"
        : letter;

  return (
    <button
      className={`key${isWide ? " key--wide" : ""}${state ? ` key-${state}` : ""}`}
      onClick={onClick}
      aria-label={ariaLabel}
      data-state={state || ""}
      type="button"
    >
      {display}
    </button>
  );
}

function VirtualKeyboard() {
  const { state, dispatch, keyboardColors } = useGame();
  const canType = state.gameStatus === "playing";

  useKeyboardInput(dispatch, canType);

  const handleClick = (letter) => {
    if (!canType) return;
    if (letter === "BACK") {
      dispatch({ type: "REMOVE_LETTER" });
    } else if (letter === "ENTER") {
      dispatch({ type: "SUBMIT_GUESS" });
    } else {
      dispatch({ type: "ADD_LETTER", letter });
    }
  };

  return (
    <div className="keyboard" role="group" aria-label="Keyboard">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => (
            <Key
              key={letter}
              letter={letter}
              state={keyboardColors[letter]}
              onClick={() => handleClick(letter)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default VirtualKeyboard;
