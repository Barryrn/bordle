import { useEffect } from "react";

function useKeyboardInput(dispatch, canType) {
  useEffect(() => {
    if (!canType) return;

    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        event.preventDefault();
        dispatch({ type: "REMOVE_LETTER" });
      } else if (event.key === "Enter") {
        event.preventDefault();
        dispatch({ type: "SUBMIT_GUESS" });
      } else {
        const key = event.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          dispatch({ type: "ADD_LETTER", letter: key });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, canType]);
}

export default useKeyboardInput;
