import { languages  } from "./assets/languages"
import React from "react"
import clsx from 'clsx'
import { getFarewellText } from "./assets/utils"

export default function App(){

    const [currentWord , setCurrentWord] = React.useState("react")
    const [guessedLetters , setGuessedLetters] = React.useState([])

    
    //counting the wrong guesses
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    console.log(wrongGuessCount)
    
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= (languages.length - 1)
    const isGameOver = isGameWon || isGameLost
    
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
    const letterElement = currentWord.split("").map(letter => (
        <span  key={letter}>{guessedLetters.includes(letter) ?  letter.toUpperCase() : ""}</span>
    ))  

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
        >
            {letter.toUpperCase()}
        </button>
    )
    })


    const gameStatusClass = clsx("game-status" , {
        won : isGameWon ,
        lost : isGameLost
    })

    function renderGameStatus(){
        if(isGameWon){
            return (
                        <>
                            <h2>You win!</h2>
                            <p>Well done! 🎉</p>
                        </> 
                    )
        }
        if(isGameLost){
            return (
                        <>
                            <h2>Game Over!</h2>
                            <p>You lose! Better start learning Assembly 😭</p>
                        </>
                )
        }
        else {
            //هاي هنا طريقتي الي توصلتلها علمود اكدر اعرض هاي الجزىيه وحسب الشروط
            if(guessedLetters.length == 0){
                    return null
            }else {
                if (!currentWord.includes(guessedLetters[guessedLetters.length - 1]) ){
                        const lang = languages[wrongGuessCount -1].name
                        return (
                            <>
                                <h2>{getFarewellText(lang)}</h2>
                            </>
                        )
                    }
                
            }
        
        }
    }

    return(
        <>
            <main>
                <header>
                    <h1>Assembly: Endgame</h1>
                    <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
                </header>
                <section className={gameStatusClass}>
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
                {isGameOver && <button className="new-game">New Game</button>}
            </main>
        </>
    )
}