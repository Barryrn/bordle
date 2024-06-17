import React from 'react';
import { ContextProvider } from './ContextCreator';
import Header from './Header';
import LanguageSelector from './LanguageSelector';
import DisplayChosenWord from './DisplayChosenWord';
import Keywordentry from './Keyboard';
import WordCheck from './WordCheck';
import GridPlacing from './GridPlacing';
import WinLose from './WinLose';
import CurrentStreak from './CurrentStreak';

function App() {
  return (
    <ContextProvider>
      <Header />
      <CurrentStreak />
      <LanguageSelector />
      <GridPlacing />
      <Keywordentry />
      <WordCheck />
      <WinLose />
     
    </ContextProvider>
  );
} 
 
export default App;
