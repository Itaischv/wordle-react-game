import React, {useCallback, useEffect, useState} from 'react';
import useKeyboard  from "../hooks/useKeyboard";
import Line from "./Line";

import {debounce} from "../playground";

const NUM_OF_GUESSES = 6;
const WORD_LENGTH = 5;
const WORD_LIST_API_URL = `https://random-word-api.vercel.app/api?words=100&length=${WORD_LENGTH}`;

export default function Wordle() {
    // Fetch a word from the url, set it in a local state

    const [word, setWord] = useState("");
    const [guesses, setGuesses] = useState(Array(NUM_OF_GUESSES).fill(null))
    const [currentGuess, setCurrentGuess] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);

    const fetchWord = async () => {
        const response = await fetch(WORD_LIST_API_URL);
        const words = await response.json();
        const word = words[Math.floor(Math.random() * words.length)];
        setWord(word);
    };

    const handleNewGame = () => {
        setGuesses(Array(NUM_OF_GUESSES).fill(null));
        setCurrentGuess("");
        setIsGameOver(false);
        fetchWord();
    }

    const handleKeyDown = useCallback((e) => {
        if(isGameOver) return;

        if (e.key === "Enter") {
            // If guess length is not the WORD_LENGTH we don't register the guess

            if (currentGuess.length !== WORD_LENGTH) return;
            const isCorrect = currentGuess === word;
            if (isCorrect) setIsGameOver(true);

            setGuesses(prevGuesses => {
                // copy the current guesses, add the new one to the last filled index
                const guessesDup = [...prevGuesses];
                const firstEmptyIndex = prevGuesses.findIndex(g => g === null);
                guessesDup[firstEmptyIndex] = currentGuess
                return guessesDup;
            })
            setCurrentGuess("")
            console.debug("guesses.findIndex(g => g === null) === -1",
                guesses.findIndex(g => g === null) === -1)
            if(guesses.findIndex(g => g === null) === -1) setIsGameOver(true);
        }

        if (e.key === "Backspace") {
            setCurrentGuess(prev => prev.substring(0, prev.length - 1))
            return;
        }

        if (currentGuess.length >= WORD_LENGTH) return;

        if (!/^[a-zA-Z]$/.test(e.key)) return;

        setCurrentGuess(prev => {
            return prev + e.key.toLowerCase()
        });

    })

    useKeyboard(handleKeyDown, [handleKeyDown]);

    useEffect(() => {
        fetchWord();
    }, [])

    useEffect(() => {
        debounce(() => console.debug("DEBOUNCE!"), 1000)
    }, [])

    return (
        <div className="board">
            {
                guesses?.map((guess, index) => {
                    const isCurrentGuess = index === guesses.findIndex(g => g === null);
                    return <Line key={index}
                                 guess={isCurrentGuess ? currentGuess : guess || ""}
                                 word={word}
                                 isCurrentGuess={isCurrentGuess}
                    />
                })
            }
            {isGameOver && (
                guesses.includes(word) ? (
                    <span>Success!</span>
                ) : (
                    <span>Loser! the word is {word}</span>
                )
            )}
            <p>
                <button onClick={handleNewGame}>Start a new game</button>
            </p>

        </div>
    );
}