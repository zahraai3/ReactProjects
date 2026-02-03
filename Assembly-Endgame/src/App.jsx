import { languages  } from "./assets/languages"
import React from "react"
import clsx from 'clsx'
import { getFarewellText } from "./assets/utils"
import { getRandomWord } from "./assets/utils"
import Confetti from "react-confetti"

export default function App(){

    const [currentWord , setCurrentWord] = React.useState(getRandomWord)
    const [guessedLetters , setGuessedLetters] = React.useState([])

    //counting the wrong guesses
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= (languages.length - 1)
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length -1]
    const isLastGuessIncorrect = lastGuessedLetter &&  !currentWord.includes(lastGuessedLetter)
    const numGuessesLeft = languages.length - 1

    //SET is similar to an array but it doesnt accept doublicated 
    function addGuessedLetter(letter){
            setGuessedLetters(prev => 
            prev.includes(letter) ? prev : [...prev , letter]
            )

    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    //langs display
    const langElements = languages.map((item ,index) => (
        <span className={clsx(
            "chip",
            wrongGuessCount > index && "lost" 
        )}
            key={item.name}
            style={ {
                    backgroundColor:item.backgroundColor ,
                    color:item.color
                }}
        > 
            {item.name}
        </span>
    ))

    //word letter displaying
    const letterElement = currentWord.split("").map((letter , index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return(
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })  

    //keyboars display
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
            disabled = {isGameOver}
            aria-disabled={guessedLetters.includes(letter)}
            aria-label={`Letter ${letter}`}
        >
            {letter.toUpperCase()}
        </button>
    )
    })


    const gameStatusClass = clsx("game-status" , {
        won : isGameWon ,
        lost : isGameLost,
        farewell : !isGameOver && isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    {isGameWon && <Confetti/>}
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        } else{
            return null
        }
    }

    function startNewGame(){
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    return(
        <>
            <main>
                <header>
                    <h1>Assembly: Endgame</h1>
                    <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
                </header>

                <section className={gameStatusClass} aria-live="polite" role="status">
                    { renderGameStatus() }
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

                {/** Combined visually-hidden aria-live for status update*/}
                <section className="sr-only" aria-live="polite" role="status">
                    <p>
                        {currentWord.includes(lastGuessedLetter) ? 
                            `Correct ! the letter ${lastGuessedLetter} is in the word` : 
                            `Sorry the letter ${lastGuessedLetter} is not in the word`}
                        You have {numGuessesLeft} attemps left.
                    </p>
                    <p>Current word : {currentWord.split("").map(letter =>
                        guessedLetters.includes(letter) ? letter + "." : "blank")}
                    </p> 
                </section>

                {isGameOver && <button className="new-game" onClick={()=>startNewGame()}>New Game</button>}
            </main>
        </>
    )
}