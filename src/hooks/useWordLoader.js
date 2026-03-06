import { useCallback } from "react";

function useWordLoader() {
  const loadWordList = useCallback(async (language) => {
    try {
      const data = await import(`../data/${language.toLowerCase()}.json`);
      const words = data[language.toLowerCase()];
      const regex = /^[a-z]{5}$/i;
      return words.filter((word) => regex.test(word));
    } catch (error) {
      console.error(`Failed to load ${language} word list:`, error);
      return [];
    }
  }, []);

  const pickRandomWord = useCallback((wordList1, wordList2) => {
    const combined = [...wordList1, ...wordList2];
    if (combined.length === 0) return "";
    return combined[Math.floor(Math.random() * combined.length)].toUpperCase();
  }, []);

  return { loadWordList, pickRandomWord };
}

export default useWordLoader;
