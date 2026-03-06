import React, { useEffect, useRef } from "react";
import { useGame } from "../context/GameContext";

function GameEndModal() {
  const { state, dispatch } = useGame();
  const { gameStatus, chosenWord } = state;
  const buttonRef = useRef(null);

  const isVisible = gameStatus === "won" || gameStatus === "lost";

  useEffect(() => {
    if (isVisible && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleReset = () => {
    dispatch({ type: "RESET_GAME" });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Game result">
      <div className="modal-content">
        {gameStatus === "won" ? (
          <h2 className="modal-title modal-title--win">You Won!</h2>
        ) : (
          <>
            <h2 className="modal-title modal-title--lose">You Lost!</h2>
            <p className="modal-word">
              The word was: <strong>{chosenWord}</strong>
            </p>
          </>
        )}
        <p className="modal-streak">Streak: {state.currentStreak}</p>
        <button
          ref={buttonRef}
          className="modal-button"
          onClick={handleReset}
          type="button"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameEndModal;
