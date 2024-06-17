import React, { useState } from "react";
import data from '../data/data.json';
import testdata from '../data/testdata.json';


function Input() {
    const [input, setInput] = useState("");
    const [inputs, setInputs] = useState([]);
    const englishWordsLength = data.english.length;
    const germanWordsLength = data.german.length;
    const randomWordEnglish = Math.floor(Math.random() * englishWordsLength) + 1;
    const randomWordGerman = Math.floor(Math.random() * germanWordsLength) + 1;
    const languageChooser = Math.floor(Math.random() * 2);
    const language = languageChooser === 1 ? "english" : "german";
    const chosenWord = languageChooser === 1 ? data.english[randomWordEnglish]: data.german[randomWordGerman];

    
    
      
    
  

    function handleChange(event) {
        const newInput = event.target.value;
        if (newInput.length < 6) {
            setInput(newInput);
        }
    }

    function handleSubmit() {
        setInputs([...inputs, input]);
        setInput("");
    }
    
    return (
        <div className="container">
        <textarea
            name="content"
            onChange={handleChange}
            placeholder="Place your wordle"
            value={input} // Controlled component
        />
        <button onClick={handleSubmit}>Add to List</button>
        <div>
            {inputs.map((input, index) => (
            <p key={index}>{input}</p>
            ))}
        </div>
        <div>
            
            <p>Selected Word: {chosenWord}</p>
            <p>Selected langauge: {language}</p>
        </div>
        </div>
    );
}
export default Input;
