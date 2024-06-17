// LanguageSelector.js
import React, { useState, useEffect, useContext } from "react";
import { ContextCreator } from "./ContextCreator";

function LanguageSelector() {
  const languages = [
    "German",
    "English",
    "French",
    "Italian",
    "Spanish",
    "Turkish",
  ];
  const { selectedLanguage1, setSelectedLanguage1 } =
    useContext(ContextCreator);
  const { selectedLanguage2, setSelectedLanguage2 } =
    useContext(ContextCreator);
  const { jsonString1, setJsonString1 } = useContext(ContextCreator);
  const { jsonString2, setJsonString2 } = useContext(ContextCreator);
  const { comparisson, setComparison } = useContext(ContextCreator);
  const [remainingLanguages, setRemainingLanguages] = useState(languages);
  const [words1, setWords1] = useState([]);
  const [words2, setWords2] = useState([]);
  const [randomWord1, setRandomWord1] = useState("");
  const [randomWord2, setRandomWord2] = useState("");
  const { chosenWord, setChosenWord } = useContext(ContextCreator);
  const [updateCounter, setUpdateCounter] = useState(0); // Counter to track updates
  const { resetLanguage1, setresetLanguage1 } = useContext(ContextCreator);
  const { resetLanguage2, setresetLanguage2 } = useContext(ContextCreator);

  useEffect(() => {
    if (selectedLanguage1) {
      loadWords1(selectedLanguage1.toLowerCase());
    }
  }, [selectedLanguage1]);

  useEffect(() => {
    if (words1.length > 0) {
      getRandomWord1();
    }
  }, [words1]);

  useEffect(() => {
    if (selectedLanguage2) {
      loadWords2(selectedLanguage2.toLowerCase());
    }
  }, [selectedLanguage2]);

  useEffect(() => {
    if (words2.length > 0) {
      getRandomWord2();
    }
  }, [words2]);

  useEffect(() => {
    if (updateCounter >= 2) {
      // Check if both words have been updated
      getFinalWord();
      setUpdateCounter(0); // Reset counter after choosing
    }
  }, [updateCounter]);

  const handleChange1 = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage1("");
    setTimeout(() => {
      setSelectedLanguage1(newLanguage);
      const filteredLanguages = languages.filter((rl) => rl !== newLanguage);
      setRemainingLanguages(filteredLanguages);
      setresetLanguage1(newLanguage);
    }, 0);
  };

  const handleChange2 = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage2("");
    setTimeout(() => {
      setSelectedLanguage2(newLanguage);
      setresetLanguage2(newLanguage);
    }, 0);
  };

  const loadWords1 = async (lang) => {
    try {
      const data1 = await import(`../data/${lang}.json`);
      const filteredWords1 = filterWords(data1[lang]);
      setWords1(filteredWords1);
      const jsonObj1 = { [selectedLanguage1]: filteredWords1 };
      setJsonString1(JSON.stringify(jsonObj1, null, 2));
    } catch (error) {
      console.error("Failed to load words data:", error);
      setWords1([]);
      setJsonString1("");
    }
  };

  const loadWords2 = async (lang) => {
    try {
      const data2 = await import(`../data/${lang}.json`);
      const filteredWords2 = filterWords(data2[lang]);
      setWords2(filteredWords2);
      const jsonObj2 = { [selectedLanguage2]: filteredWords2 };
      setJsonString2(JSON.stringify(jsonObj2, null, 2));
    } catch (error) {
      console.error("Failed to load words data:", error);
      setWords2([]);
      setJsonString2("");
    }
  };

  const getRandomWord1 = () => {
    const randomWord = words1[Math.floor(Math.random() * words1.length)];
    setRandomWord1(randomWord);
    setUpdateCounter((prev) => prev + 1); // Increment counter
  };

  const getRandomWord2 = () => {
    const randomWord = words2[Math.floor(Math.random() * words2.length)];
    setRandomWord2(randomWord);
    setUpdateCounter((prev) => prev + 1); // Increment counter
  };

  const getFinalWord = () => {
    const wordChooserFlip = Math.floor(Math.random() * 2);
    const chosenWord =
      wordChooserFlip === 0
        ? randomWord1.toUpperCase()
        : randomWord2.toUpperCase();
    setChosenWord(chosenWord);
    setComparison([
      chosenWord,
      chosenWord,
      chosenWord,
      chosenWord,
      chosenWord,
      chosenWord,
      chosenWord,
    ]);
  };

  const filterWords = (wordsArray) => {
    const regex = /^[a-z]+$/i; // Modified to be case insensitive
    return wordsArray.filter((word) => regex.test(word));
  };

  return (
    <div>
      <div className="selectContainer">
        <select value={selectedLanguage1} onChange={handleChange1}>
          <option value="">Select your language</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        {/*<p>Selected Language: {selectedLanguage1}</p>
      <p>{randomWord1}</p>*/}
        <br />
        <select value={selectedLanguage2} onChange={handleChange2}>
          <option h1 value="">
            Select your language
          </option>
          {remainingLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        {/*<p>Selected Language: {selectedLanguage2}</p>
      <p>{randomWord2}</p>*/}
        {selectedLanguage1.length > 0 && selectedLanguage2.length > 0 ? (
          <p>Let the Bordle begin ✅</p>
        ) : null}
        {/*<p>Chosen Word: {chosenWord}</p>*/}
      </div>
    </div>
  );
}

export default LanguageSelector;
