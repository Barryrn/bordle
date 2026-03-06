import React, { useEffect } from "react";
import { useGame } from "../context/GameContext";

function Toast() {
  const { state, dispatch } = useGame();
  const { message } = state;

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGE" });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div className="toast" role="alert" aria-live="assertive">
      {message}
    </div>
  );
}

export default Toast;
