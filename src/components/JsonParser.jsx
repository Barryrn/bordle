import React from "react";
import testdata from '../data/testdata.json';

function JsonParser() {

    const englishWordsLength = testdata.english.length;
    const germanWordsLength = testdata.german.length;
    const test = JSON.stringify(testdata.german);;
    

    var german = [];
    var english = ["white"];
    


    let i = 0;
    while (i < germanWordsLength) {
        
        const germanword = testdata.german[i];
        if (!germanword.includes('ä') && !germanword.includes('ö') && !germanword.includes('ü')) {
            german.push(`"${germanword}"`);
        }
        i++;
    }
   

    let u =0;
    while (u < englishWordsLength) {

        const englishword = testdata.english[u];
        if (!englishword.includes('ä') && !englishword.includes('ö') && !englishword.includes('ü')) {
            english.push(`"${englishword}",`);
        }
        u++;
    }

    
    return(
        <div>
            <p>{german}</p>
            <p>{english}</p>
            <p>{test}</p>


        </div>
        
    )
    
} 

export default JsonParser;
