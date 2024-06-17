// ContextCreator.js
import React, { createContext, useState } from "react";

export const ContextCreator = createContext();

export const ContextProvider = ({ children }) => {
  const [chosenWord, setChosenWord] = useState("");
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [totalEntries, setTotalEntries] = useState([]);
  const [comparisson, setComparison] = useState([]);
  const [greenList, setGreenList] = useState([]);
  const [greyList, setGreyList] = useState([]);
  const [gridList, setGridList] = useState([]);
  const [orangeList, setOrangeList] = useState([]);
  const [orangeLists, setOrangeLists] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedLanguage1, setSelectedLanguage1] = useState("");
  const [selectedLanguage2, setSelectedLanguage2] = useState("");
  const [existingWord, setExisingWord] = useState(false);
  const [correctWord, setCorrectWord] = useState(false);
  const [entryLimit, setEntryLimit] = useState(false);
  const [bordleList, setBordleList] = useState([]);
  const [jsonString1, setJsonString1] = useState("");
  const [jsonString2, setJsonString2] = useState("");
  const [messageBox, setMessageBox] = useState("");
  const [greyLetter, setGreyLetter] = useState([]);
  const [greenLetter, setGreenLetter] = useState([]);
  const [orangeLetter, setOrangeLetter] = useState([]);
  const [orangeLetters, setOrangeLetters] = useState([]);
  const [resetLanguage1, setresetLanguage1] = useState("");
  const [resetLanguage2, setresetLanguage2] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  // Debug: Log the current state to see if it updates
  console.log("Current chosen word:", chosenWord);

  return (
    <ContextCreator.Provider
      value={{
        chosenWord,
        setChosenWord,
        selectedLetters,
        setSelectedLetters,
        isChecked,
        setIsChecked,
        selectedLanguage1,
        setSelectedLanguage1,
        selectedLanguage2,
        setSelectedLanguage2,
        existingWord,
        setExisingWord,
        correctWord,
        setCorrectWord,
        jsonString1,
        setJsonString1,
        jsonString2,
        setJsonString2,
        bordleList,
        setBordleList,
        totalEntries,
        setTotalEntries,
        comparisson,
        setComparison,
        greenList,
        setGreenList,
        orangeList,
        setOrangeList,
        gridList,
        setGridList,
        entryLimit,
        setEntryLimit,
        messageBox,
        setMessageBox,
        greyList,
        setGreyList,
        greyLetter,
        setGreyLetter,
        greenLetter,
        setGreenLetter,
        orangeLetter,
        setOrangeLetter,
        orangeLetters,
        setOrangeLetters,
        orangeLists,
        setOrangeLists,
        resetLanguage1,
        setresetLanguage1,
        resetLanguage2,
        setresetLanguage2,
        currentStreak,
        setCurrentStreak,
      }}
    >
      {children}
    </ContextCreator.Provider>
  );
};
