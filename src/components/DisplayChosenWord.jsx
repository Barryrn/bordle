// DisplayChosenWord.js
import React, { useContext } from 'react';
import { ContextCreator } from './ContextCreator';

function DisplayChosenWord() {
  const { chosenWord } = useContext(ContextCreator);


  return(
    <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {/*<p>Hello, {chosenWord}</p>*/}
    </div>
  )   // Renders the chosen word dynamically
}

export default DisplayChosenWord;
