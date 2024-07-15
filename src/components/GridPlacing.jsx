import React, { useContext, useEffect, useState } from "react";
import { ContextCreator } from "./ContextCreator";

function GridPlacing() {
  const {
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
    correctWord,
    setCorrectWord,
    entryLimit,
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
    resetLanguage1,
    setresetLanguage1,
    resetLanguage2,
    setresetLanguage2,
    currentStreak,
    setCurrentStreak,
  } = useContext(ContextCreator);

  const [modifiedTryWord, setModifiedTryWord] = useState("");

  
  // Calculate flat versions of the lists, joining nested arrays to single strings.
  const flatCharList = bordleList.flat().join("").split("");
  const flatComparisonList = comparisson.flat().join("").split("");

  // Extract the last five characters of both lists to compare recent entries.
  const lastFiveCharList = flatCharList.slice(-5);
  const lastFiveComparisonList = flatComparisonList.slice(-5);

  // Effect hook to manage green states (correct placements)
  useEffect(() => {
    let updatedGreenList = [];
    let updateGreenListLetter = [];
    let modifiedFlatCharList = flatCharList;
    const minLength = Math.min(flatCharList.length, flatComparisonList.length);
    for (let i = 0; i < minLength; i++) {
      if (flatCharList[i] === flatComparisonList[i]) {
        updatedGreenList.push(i);
        updateGreenListLetter.push(flatCharList[i]);
      }
    }
    for (let j = 0; j < 5; j++) {
      if (lastFiveComparisonList[j] === lastFiveCharList[j]) {
        lastFiveComparisonList[j] = "0";
      }
    }

    // Update states with these new lists
    setModifiedTryWord(lastFiveComparisonList);
    setGreenList(updatedGreenList);
    setGreenLetter(updateGreenListLetter);
  }, [
    flatCharList,
    flatComparisonList,
    setGreenList,
    setGreenLetter,
    gridList,
  ]);

  
  useEffect(() => {
    if (gridList.length === 0) {
      setOrangeList([]);
      setOrangeLetter([]);
      setOrangeLetters([]);
    } else {
      let tempTryWord = flatCharList.join("");
      let updatedOrangeList = [...orangeList];
      let updateOrangeListLetter = [];

      lastFiveComparisonList.forEach((char, index) => {
        const foundIndex = lastFiveCharList.indexOf(char);
        if (foundIndex !== -1) {
          updateOrangeListLetter.push(char);
          const actualIndex = flatCharList.length - 5 + foundIndex;
          if (!updatedOrangeList.includes(actualIndex)) {
            updatedOrangeList.push(actualIndex);
          }
          tempTryWord =
            tempTryWord.substring(0, actualIndex) +
            "0" +
            tempTryWord.substring(actualIndex + 1);
        }
      });

      setOrangeList(updatedOrangeList);
      setOrangeLetter(updateOrangeListLetter);
    }
  }, [
    flatCharList,
    lastFiveCharList,
    lastFiveComparisonList,
    orangeList,
    setOrangeList,
    setOrangeLetter,
    gridList,
    greenList,
    orangeLetter,
    greenLetter,
    setGreyList,
    setGreyLetter,
  ]);

  useEffect(() => {
    if (gridList.length === 0) {
      setOrangeList([]);
      setOrangeLetter([]);
      setOrangeLetters([]);
    } else {
      // Filter out green letters from the current orange letters
      const filteredOrangeLetter = orangeLetter.filter(
        (element) => !greenLetter.includes(element)
      );

      // Combine the existing orangeLetters with the new filteredOrangeLetter
      // Ensure no duplicates and remove any that have turned green
      const updatedOrangeLetters = Array.from(
        new Set([...orangeLetters, ...filteredOrangeLetter])
      ).filter((letter) => !greenLetter.includes(letter));

      setOrangeLetters(updatedOrangeLetters);
    }
  }, [orangeLetter, greenLetter, gridList]);

  useEffect(() => {
    const filteredOrangeList = orangeList.filter(
      (element) => !greenList.includes(element)
    );
    setOrangeLists(filteredOrangeList);

    const updateGreyList = flatCharList
      .map((_, index) => index)
      .filter(
        (index) =>
          !greenList.includes(index) && !filteredOrangeList.includes(index)
      );

    const updateGreyLetter = flatCharList.filter(
      (char, index) =>
        !greenLetter.includes(char) && !orangeLetters.includes(char)
    );

    setGreyList(updateGreyList);
    setGreyLetter(updateGreyLetter);
  }, [
    flatCharList,
    greenList,
    orangeList,
    orangeLetter,
    greenLetter,
    setOrangeLetters,
    setGreyList,
    setGreyLetter,
    gridList,
  ]);

  useEffect(() => {
    let theGridList =
      selectedLetters.length <= 0
        ? [...bordleList]
        : [...bordleList, ...selectedLetters];
    setGridList(theGridList);
  }, [selectedLetters, bordleList, setGridList]);

  useEffect(() => {
    if (flatCharList.length === 35) {
      setEntryLimit(true);
    } else if (gridList.length === 0) {
      setEntryLimit(false);
    }
  }, [flatCharList, setEntryLimit]);

  useEffect(() => {
    if (
      lastFiveCharList.length === 5 &&
      chosenWord === lastFiveCharList.join("")
    ) {
      setCorrectWord(true);
    } else if (gridList.length === 0) {
      setCorrectWord(false);
    }
  }, [lastFiveCharList, chosenWord, setCorrectWord]);

  const gridItems = Array.from({ length: 35 }, (_, index) => {
    const isGreen = greenList.includes(index);
    const isOrange = orangeLists.includes(index);
    const isGrey = greyList.includes(index);

    let itemClass =
      "grid-item" +
      (isGreen ? " item-green" : "") +
      (isOrange ? " item-orange" : "") +
      (isGrey ? " item-grey" : "");

    return (
      <div key={index} className={itemClass}>
        {gridList.flat().join("").split("")[index] || " "}
      </div>
    );
  });

  useEffect(() => {
    if (correctWord) {
      setCurrentStreak(currentStreak + 1);
    }
  }, [correctWord, setCorrectWord]);

  useEffect(() => {
    if (entryLimit === 35 && chosenWord != lastFiveCharList) {
      setCurrentStreak(0);
    }
  }, [entryLimit, setEntryLimit]);

  return (
    <div>
      <div className="streak">
        <h3>Current Streak: {currentStreak}</h3>
      </div>
      <div className="rows-grid">{gridItems}</div>
      <div>
        {
       /*<p>{bordleList}</p>
        <p>{modifiedTryWord}</p>
        <p>{greenLetter}</p>
        <p>{greenList}</p>
        <p>{bordleList}</p>
        <p>{comparisson}</p>
        <p>{correctWord}</p>
        <p>{entryLimit ? "true" : "false"}</p>
        <p>{correctWord ? "true" : "false"}</p>
        <p>{gridList}</p>
        <p>{orangeLists}</p>
        <p>{orangeList}</p>
        <p>{greenList}</p>
        <p>Bordlelist: {bordleList.flat().join("").split("").length}</p>
        <p>Green Letters: {greenLetter.join(", ")}</p>
        <p>Orange Letters: {orangeLetters.join(", ")}</p>
        <p>{orangeLetter}</p>
        <p>Grey Letters: {greyLetter.join(", ")}</p>
        */}
      </div>
    </div>
  );
}

export default GridPlacing;
