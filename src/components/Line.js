import React from 'react';
import '../App.css'

const WORD_LENGTH = 5;

function Line({guess, word, isCurrentGuess}) {

    const block = [];

    for(let i = 0; i < WORD_LENGTH; i++) {
        const letter = guess[i] || "";
        // Check letter status in word:
        let status = "";
        if(!isCurrentGuess && guess.length) {
            if (letter === word[i]) {
                status = "correct"
            }
            else if(word.includes(letter)) {
                status = "misplaced"
            }
            else {
                status = "incorrect"
            }
        }

        block.push(<div key={i} className={`block ${status}`}>{letter}</div>);
    }
    return (
       <div className={"line"}>
           {block}
       </div>
    );
}

export default Line;