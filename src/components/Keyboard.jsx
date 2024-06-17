import React, { useContext, useEffect } from "react";
import { ContextCreator } from "./ContextCreator";

function Keywordentry() {
  const {
    selectedLetters,
    setSelectedLetters,
    gridList,
    setGridList,
    isChecked,
    setIsChecked,
    setBordleList,
    bordleList,
    greenLetter,
    orangeLetters,
    greyLetter
  } = useContext(ContextCreator);

  // Flatten the bordleList to a string of letters
  const checkLetters = bordleList.flat().join("").split("");

  const keyboardFirstRow = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"];
  const keyboardSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyboardThirdRow = ["CHECK", "Y", "X", "C", "V", "B", "N", "M", "BACK"];

  const handleLetterClick = (letter) => {
    if (letter === "BACK") {
      setSelectedLetters(selectedLetters.slice(0, -1));
    } else if (letter === "CHECK" && selectedLetters.length === 5) {
      setIsChecked(true);
    } else if (
      selectedLetters.length < 5 &&
      letter.length === 1 &&
      letter >= "A" &&
      letter <= "Z"
    ) {
      setSelectedLetters([...selectedLetters, letter]);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Backspace") {
        setSelectedLetters((prev) => prev.slice(0, -1));
      } else if (event.key === "Enter" && selectedLetters.length === 5) {
        setIsChecked(true);
      } else {
        const keyUpperCase = event.key.toUpperCase();
        if (
          keyUpperCase.length === 1 &&
          keyUpperCase >= "A" &&
          keyUpperCase <= "Z"
        ) {
          setSelectedLetters((prev) =>
            prev.length < 5 ? [...prev, keyUpperCase] : prev
          );
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedLetters]);
  useEffect(() => {})
  const renderRow = (letters, rowName) => (
    <div className={rowName}>
      {letters.map((letter, index) => {
        // Define the class for each letter
        const letterClass = 
          "letter " +
          (greenLetter.includes(letter) ? "letterGreen " : "") +
          (orangeLetters.includes(letter) ? "letterOrange " : "") +
          (greyLetter.includes(letter) ? "letterGrey " : "");
  
        // Return the span element with the appropriate class
        return (
          <span
            key={index}
            className={letterClass.trim()} // trim() to remove any extra spaces
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="Keyboard">
      {renderRow(keyboardFirstRow, "Firstrow")}
      {renderRow(keyboardSecondRow, "Secondrow")}
      {renderRow(keyboardThirdRow, "Thirdrow")}
      {/* {selectedLetters} <br />
      {selectedLetters.length} */}
    </div>
  );
}

export default Keywordentry;