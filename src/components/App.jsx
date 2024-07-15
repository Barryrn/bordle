import React from 'react';
import { ContextProvider } from './ContextCreator';
import Header from './Header';
import LanguageSelector from './LanguageSelector';
import Keywordentry from './Keyboard';
import WordCheck from './WordCheck';
import GridPlacing from './GridPlacing';
import WinLose from './WinLose';

function App() {
  return (
    <ContextProvider>
      <Header />
      <LanguageSelector />
      <GridPlacing />
      <Keywordentry />
      <WordCheck />
      <WinLose />
     
    </ContextProvider>
  );
} 
 
export default App;
