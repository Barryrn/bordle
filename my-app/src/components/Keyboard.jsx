import React, { useContext } from 'react';
import { ContextCreator } from './ContextCreator';
import { BackSpaceIcon } from '../SVG/BackspaceIcon';

function Keywordentry() {
    // Retrieve the current list and update function from context
    const { selectedLetters, setSelectedLetters } = useContext(ContextCreator);

    // Predefined rows of the keyboard
    const keyboardFirstRow = ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'];
    const keyboardSecondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const keyboardThirdRow = ['CKECK','Y', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

    // Function to handle letter selection
    const handleLetterClick = (letter) => {
        if (letter === 'BACK') {
            setSelectedLetters(selectedLetters.slice(0, -1));
        } else if(selectedLetters.length < 5) {
            setSelectedLetters([...selectedLetters, letter]);
        }
    };

    /*{document.addEventListener("keypress", function(event) {
        const char = event.key; // Get the key that was pressed
        const charUpperCase = char.toUpperCase(); // Convert to uppercase
        if ( selectedLetters.length < 5) { 
            setSelectedLetters([...selectedLetters,charUpperCase]);
        } 
    });}*/

    // Component that renders each row of letters
    const renderRow = (letters, rowName) => (
        <div className={rowName}>
            {letters.map((letter, index) => (
                <span key={index} className='letter' onClick={() => handleLetterClick(letter)}>
                    {letter}
                </span>
            ))}
        </div>
    );

    return (
        <div className='Keyboard'>
            {renderRow(keyboardFirstRow, 'Firstrow')}
            {renderRow(keyboardSecondRow, 'Secondrow')}
            {renderRow(keyboardThirdRow, 'Thirdrow')}
            {selectedLetters} <br />
            {selectedLetters.length}
            
        </div>
    );
}

export default Keywordentry;
