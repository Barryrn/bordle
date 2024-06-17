import React, { useContext, useEffect, useState } from "react";
import { ContextCreator } from "./ContextCreator";

function CurrentStreak() {
  {/*const {
    currentStreak,
    setCurrentStreak,
    correctWord,
    setCorrectWord,
    entryLimit,
    setEntryLimit,
  } = useContext(ContextCreator);

  useEffect(() => {
    if (correctWord) {
      setCurrentStreak(currentStreak + 1);
    }
  }, [correctWord, setCorrectWord]);

  useEffect(() => {
    if (entryLimit) {
      setCurrentStreak(0);
    }
  }, [entryLimit, setEntryLimit]);
  return (
    <div className="streak">
      <h3> Current Streak: {currentStreak}</h3>
    </div>
  );
  */}
}

export default CurrentStreak;
