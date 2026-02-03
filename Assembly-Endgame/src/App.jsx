import Header from "./components/Header"
import Main from "./components/Main"
import { languages  } from "./assets/languages"
import React from "react"
import clsx from 'clsx'

export default function App(){

    const [currentWord , setCurrentWord] = React.useState("react")

    const [guessedLetters , setGuessedLetters] = React.useState([])

    //another way to do it :  // similar to an array but it doesnt accept doublicated 
    function addGuessedLetter(letter){
            setGuessedLetters(prev => 
            prev.includes(letter) ? prev : [...prev , letter]
            )
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const langElements = languages.map((item) => (
        <span className="chip"
            key={item.name}
            style={ {
                    backgroundColor:item.backgroundColor ,
                    color:item.color
                }}
        > 
            {item.name}
        </span>
    ))

    const letterElement = currentWord.split("").map(letter => (
        <span key={letter}>{letter.toUpperCase()}</span>
    ))  

    //EDITED
    const keyboardElement = alphabet.split("").map((letter, index) => {

    const isGuessed = guessedLetters.includes(letter)
    const isRight = currentWord.includes(letter); 

    return (
        <button
            className={clsx(
                "letterBtn",
                isGuessed && isRight && "RightBtn",
                isGuessed && !isRight && "falseBtn"
            )}
            key={index}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>
    )
    })

    return(
        <>
            <main>
                <header>
                    <h1>Assembly: Endgame</h1>
                    <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
                </header>
                <section className="game-status">
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </section>
                <section className="language-chips">
                    {langElements}
                </section >
                <section className="word">
                    {letterElement}
                </section>
                <section className="keyboard">
                    {keyboardElement}
                </section>
                <button className="new-game">New Game</button>
            </main>
        </>
    )
}