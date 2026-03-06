import React from "react";
import { GameProvider } from "../context/GameContext";
import Header from "./Header";
import LanguageSelector from "./LanguageSelector";
import GameGrid from "./GameGrid";
import VirtualKeyboard from "./VirtualKeyboard";
import Toast from "./Toast";
import GameEndModal from "./GameEndModal";

function App() {
  return (
    <GameProvider>
      <Header />
      <LanguageSelector />
      <GameGrid />
      <Toast />
      <VirtualKeyboard />
      <GameEndModal />
    </GameProvider>
  );
}

export default App;
