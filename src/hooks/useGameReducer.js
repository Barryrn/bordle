import { useReducer } from "react";

const MAX_GUESSES = 7;
const WORD_LENGTH = 5;

const initialState = {
  languages: { lang1: "", lang2: "" },
  wordLists: { list1: [], list2: [] },
  chosenWord: "",
  guesses: [],
  currentGuess: [],
  evaluations: [],
  gameStatus: "idle", // 'idle' | 'playing' | 'won' | 'lost'
  message: "",
  currentStreak: 0,
};

function evaluateGuess(guess, targetWord) {
  const result = Array(WORD_LENGTH).fill("absent");
  const targetChars = targetWord.split("");
  const guessChars = [...guess];

  // Pass 1: Mark greens (exact matches)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = "correct";
      targetChars[i] = null;
      guessChars[i] = null;
    }
  }

  // Pass 2: Mark oranges (right letter, wrong position)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessChars[i] === null) continue;
    const targetIndex = targetChars.indexOf(guessChars[i]);
    if (targetIndex !== -1) {
      result[i] = "present";
      targetChars[targetIndex] = null;
    }
  }

  return result;
}

function gameReducer(state, action) {
  switch (action.type) {
    case "SET_LANGUAGES": {
      return {
        ...state,
        languages: { lang1: action.lang1, lang2: action.lang2 },
      };
    }

    case "SET_WORD_LISTS": {
      return {
        ...state,
        wordLists: { list1: action.list1, list2: action.list2 },
      };
    }

    case "SET_CHOSEN_WORD": {
      return {
        ...state,
        chosenWord: action.word,
        gameStatus: "playing",
      };
    }

    case "ADD_LETTER": {
      if (
        state.gameStatus !== "playing" ||
        state.currentGuess.length >= WORD_LENGTH
      )
        return state;
      return {
        ...state,
        currentGuess: [...state.currentGuess, action.letter],
      };
    }

    case "REMOVE_LETTER": {
      if (state.currentGuess.length === 0) return state;
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, -1),
      };
    }

    case "SUBMIT_GUESS": {
      if (
        state.gameStatus !== "playing" ||
        state.currentGuess.length !== WORD_LENGTH
      )
        return state;

      const word = state.currentGuess.join("").toLowerCase();

      // Validate word exists in either word list
      const inList1 = state.wordLists.list1.includes(word);
      const inList2 = state.wordLists.list2.includes(word);

      if (!inList1 && !inList2) {
        return {
          ...state,
          message: `${state.currentGuess.join("")} is not in the word list`,
        };
      }

      const evaluation = evaluateGuess(state.currentGuess, state.chosenWord);
      const newGuesses = [...state.guesses, state.currentGuess];
      const newEvaluations = [...state.evaluations, evaluation];

      const isWin = evaluation.every((e) => e === "correct");
      const isLoss = !isWin && newGuesses.length >= MAX_GUESSES;

      let gameStatus = state.gameStatus;
      let currentStreak = state.currentStreak;

      if (isWin) {
        gameStatus = "won";
        currentStreak = currentStreak + 1;
      } else if (isLoss) {
        gameStatus = "lost";
        currentStreak = 0;
      }

      return {
        ...state,
        guesses: newGuesses,
        currentGuess: [],
        evaluations: newEvaluations,
        gameStatus,
        currentStreak,
        message: "",
      };
    }

    case "SET_MESSAGE": {
      return { ...state, message: action.message };
    }

    case "CLEAR_MESSAGE": {
      return { ...state, message: "" };
    }

    case "RESET_GAME": {
      return {
        ...initialState,
        currentStreak: state.currentStreak,
        languages: state.languages,
      };
    }

    default:
      return state;
  }
}

function useGameReducer() {
  return useReducer(gameReducer, initialState);
}

export { useGameReducer, evaluateGuess, MAX_GUESSES, WORD_LENGTH };
