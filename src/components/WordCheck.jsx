import React, { useContext, useEffect, useState } from "react";
import { ContextCreator } from "./ContextCreator";

function WordCheck() {
  // Retrieve the current list and update function from context
  const { chosenWord } = useContext(ContextCreator);
  const { selectedLetters, setSelectedLetters } = useContext(ContextCreator);
  const { isChecked, setIsChecked } = useContext(ContextCreator);
  const { existingWord, setExisingWord } = useContext(ContextCreator);
  const { jsonString1, jsonString2 } = useContext(ContextCreator);
  const { bordleList, setBordleList } = useContext(ContextCreator);
  const { correctWord } = useContext(ContextCreator);
  const { messageBox, setMessageBox } = useContext(ContextCreator);

  useEffect(() => {
    if (isChecked) {
      wordExist();
    }
  }, [isChecked]);

  const wordExist = () => {
    const stringSelectedLetters = selectedLetters.join("");
    const lowercaseselectedLetters = stringSelectedLetters.toLowerCase();

    try {
      const data1 = jsonString1 ? JSON.parse(jsonString1) : null;
      const data2 = jsonString2 ? JSON.parse(jsonString2) : null;

      if (
        (data1 && jsonString1.includes(lowercaseselectedLetters)) ||
        (data2 && jsonString2.includes(lowercaseselectedLetters))
      ) {
        setExisingWord(true);
        setBordleList((prevList) => [...prevList, selectedLetters]);
        setSelectedLetters([]);
        setIsChecked(false);
      } else {
        setMessageBox(`${selectedLetters.join("")} is not included in the list`);
        setTimeout(() => {
          setMessageBox(""); // Clear the message after 2 seconds
        }, 1000);
        setExisingWord(false);
        setIsChecked(false);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      {messageBox && (
        <div className="messageBox">
          <span>{messageBox}</span>
        </div>
      )}
    </div>
  );
}

export default WordCheck;
