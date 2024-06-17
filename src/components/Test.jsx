import React, { useState, useEffect } from "react";

function Test() {
  const [correctWord] = useState("melonbonus");
  const [tryWord] = useState("melonnanny");
  const [matchIndices, setMatchIndices] = useState([]);
  const [modifiedTryWord, setModifiedTryWord] = useState(tryWord);

  useEffect(() => {
    const lastFiveCorrect = correctWord.slice(-5); // "apple"
    const lastFiveTry = tryWord.slice(-5); // "puppy"
    let tempTryWord = tryWord; // Full tryWord copy for modifications
    let newMatchIndices = [];
    let tempLastFiveTry = lastFiveTry; // Temporary copy for modifications

    Array.from(lastFiveCorrect).forEach((char, index) => {
      const foundIndex = tempLastFiveTry.indexOf(char);
      if (foundIndex !== -1) {
        // Calculate the actual index in the full tryWord
        const actualIndex = tryWord.length - 5 + foundIndex;
        newMatchIndices.push(actualIndex);
        // Replace the matched character in the full temporary tryWord with '0'
        tempTryWord = tempTryWord.substr(0, actualIndex) + '0' + tempTryWord.substr(actualIndex + 1);
        // Also replace the matched character in the temporary lastFiveTry to prevent duplicate matching
        tempLastFiveTry = tempLastFiveTry.substr(0, foundIndex) + '0' + tempLastFiveTry.substr(foundIndex + 1);
      }
    });

    setMatchIndices(newMatchIndices);
    setModifiedTryWord(tempTryWord);
  }, [correctWord, tryWord]);

  return (
    <div>
      <p>Match Indices in Full Try Word: {matchIndices.join(', ')}</p>
      <p>Modified Full Try Word: {modifiedTryWord}</p>
    </div>
  );
}

export default Test;