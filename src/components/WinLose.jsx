import React, { useContext, useState } from "react";
import { ContextCreator } from "./ContextCreator";

function WinLose() {
  const {
    correctWord,
    entryLimit,
    bordleList,
    comparisson,
    selectedLetters,
    setSelectedLetters,
    greenList,
    setGreenList,
    orangeList,
    setOrangeList,
    chosenWord,
    setChosenWord,
    gridList,
    setGridList,
    setCorrectWord,
    setEntryLimit,
    greyList,
    setGreyList,
    greyLetter,
    setGreyLetter,
    greenLetter,
    setGreenLetter,
    orangeLetter,
    setOrangeLetter,
    setOrangeLetters,
    orangeLetters,
    orangeLists,
    setOrangeLists,
    setBordleList,
    setComparison,
    selectedLanguage1,
    setSelectedLanguage1,
    selectedLanguage2,
    setSelectedLanguage2,
    setJsonString1,
    setJsonString2,
    resetLanguage1,
    setresetLanguage1,
    resetLanguage2,
    setresetLanguage2,
  } = useContext(ContextCreator);

  const handleReset = () => {
    setBordleList([]);
    setGridList([]);
    setEntryLimit(false);
    setCorrectWord(false);
    setJsonString1("");
    setJsonString2("");
    setComparison([]);
    setChosenWord("");
    
    // Reset languages to empty string first to force re-render
    setSelectedLanguage1("");
    setSelectedLanguage2("");
    
    // Delay the reset to new language
    setTimeout(() => {
      setSelectedLanguage1(`${resetLanguage1}`);
      setSelectedLanguage2(`${resetLanguage2}`);
    }, 0);
  };

  const getEndScreen = () => {
    // No game end condition met
    if (!correctWord && !entryLimit) return null;

    const endScreenClass = correctWord
      ? "winMessage"
      : entryLimit
      ? "loseMessage"
      : "";
    const endScreenMessage = correctWord
      ? "You Won! 😁"
      : entryLimit
      ?(
        <>
          You Lost! 😔 <br /> The correct word was: {chosenWord}
        </>
      )
      : "";

    return (
      <div className="endScreen">
        {<h1 className={endScreenClass}>{endScreenMessage}</h1>}
        {
          <button className="restartButton" onClick={handleReset}>
            Play Again
          </button>
        }
      </div>
    );
  };

  return getEndScreen();
}

export default WinLose;