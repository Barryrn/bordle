import React, { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import useWordLoader from "../hooks/useWordLoader";

const LANGUAGES = ["German", "English", "French", "Italian", "Spanish", "Turkish"];

function LanguageSelector() {
  const { state, dispatch } = useGame();
  const { loadWordList, pickRandomWord } = useWordLoader();

  const [lang1, setLang1] = useState("");
  const [lang2, setLang2] = useState("");
  const [words1, setWords1] = useState([]);
  const [words2, setWords2] = useState([]);
  const [loading, setLoading] = useState(false);

  const remainingLanguages = LANGUAGES.filter((l) => l !== lang1);
  const bothSelected = lang1 && lang2;

  // Load words when language 1 changes
  useEffect(() => {
    if (!lang1) return;
    setLoading(true);
    loadWordList(lang1).then((words) => {
      setWords1(words);
      setLoading(false);
    });
  }, [lang1, loadWordList]);

  // Load words when language 2 changes
  useEffect(() => {
    if (!lang2) return;
    setLoading(true);
    loadWordList(lang2).then((words) => {
      setWords2(words);
      setLoading(false);
    });
  }, [lang2, loadWordList]);

  // Start game when both word lists are loaded
  useEffect(() => {
    if (words1.length > 0 && words2.length > 0 && bothSelected) {
      dispatch({ type: "SET_LANGUAGES", lang1, lang2 });
      dispatch({ type: "SET_WORD_LISTS", list1: words1, list2: words2 });
      const word = pickRandomWord(words1, words2);
      dispatch({ type: "SET_CHOSEN_WORD", word });
    }
  }, [words1, words2, bothSelected, lang1, lang2, dispatch, pickRandomWord]);

  // Reset when game resets
  useEffect(() => {
    if (state.gameStatus === "idle" && state.chosenWord === "") {
      if (state.languages.lang1 && state.languages.lang2) {
        // Game was reset -- reload with same languages
        setLang1("");
        setLang2("");
        setWords1([]);
        setWords2([]);
        setTimeout(() => {
          setLang1(state.languages.lang1);
          setLang2(state.languages.lang2);
        }, 0);
      }
    }
  }, [state.gameStatus, state.chosenWord, state.languages]);

  const handleChange1 = (e) => {
    const newLang = e.target.value;
    setLang1(newLang);
    setWords1([]);
    if (newLang === lang2) {
      setLang2("");
      setWords2([]);
    }
  };

  const handleChange2 = (e) => {
    setLang2(e.target.value);
    setWords2([]);
  };

  // Hide selector once game is playing
  if (state.gameStatus === "playing" || state.gameStatus === "won" || state.gameStatus === "lost") {
    return null;
  }

  return (
    <div className="language-selector">
      <div className="language-selector-group">
        <label htmlFor="lang-select-1" className="sr-only">
          First language
        </label>
        <select
          id="lang-select-1"
          value={lang1}
          onChange={handleChange1}
          aria-label="Select first language"
        >
          <option value="">Select language 1</option>
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className="language-selector-group">
        <label htmlFor="lang-select-2" className="sr-only">
          Second language
        </label>
        <select
          id="lang-select-2"
          value={lang2}
          onChange={handleChange2}
          aria-label="Select second language"
        >
          <option value="">Select language 2</option>
          {remainingLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="loading-text">Loading words...</p>}
      {bothSelected && !loading && (
        <p className="ready-text">Let the Bordle begin!</p>
      )}
    </div>
  );
}

export default LanguageSelector;
