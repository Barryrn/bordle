import { useMemo } from "react";

function useKeyboardColors(guesses, evaluations) {
  return useMemo(() => {
    const colors = {};
    guesses.forEach((guess, guessIndex) => {
      guess.forEach((letter, letterIndex) => {
        const evaluation = evaluations[guessIndex]?.[letterIndex];
        if (!evaluation) return;
        const current = colors[letter];
        // Priority: correct > present > absent
        if (evaluation === "correct") {
          colors[letter] = "correct";
        } else if (evaluation === "present" && current !== "correct") {
          colors[letter] = "present";
        } else if (!current) {
          colors[letter] = "absent";
        }
      });
    });
    return colors;
  }, [guesses, evaluations]);
}

export default useKeyboardColors;
