import React, { createContext, useContext, useMemo } from "react";
import { useGameReducer } from "../hooks/useGameReducer";
import useKeyboardColors from "../hooks/useKeyboardColors";

const GameContext = createContext();

function GameProvider({ children }) {
  const [state, dispatch] = useGameReducer();
  const keyboardColors = useKeyboardColors(state.guesses, state.evaluations);

  const value = useMemo(
    () => ({ state, dispatch, keyboardColors }),
    [state, dispatch, keyboardColors]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGame };
