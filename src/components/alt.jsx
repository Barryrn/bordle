import React, { useContext } from "react";
import { ContextCreator } from "./ContextCreator";

function WinLose() {
  const { correctWord, entryLimit } = useContext(ContextCreator);

  const handleReset = () => {
    window.location.reload();
  };

  const getEndScreen = () => {
    // No game end condition met
    if (!correctWord && !entryLimit) return null;

    
    const endScreenClass = correctWord ? "winMessage" : (entryLimit ? "loseMessage": "");
    const endScreenMessage = correctWord ? "You Won! 😁" : (entryLimit ? "You Lost! 😔" : "");

    return (
      <div className="endScreen">
        <h1 className={endScreenClass}>{endScreenMessage}</h1>
        <button className="restartButton" onClick={handleReset}>
          Play Again
        </button>
      </div>
    );
  };

  return getEndScreen();
}

export default WinLose;
