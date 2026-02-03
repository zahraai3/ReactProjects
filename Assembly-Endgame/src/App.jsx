import Header from "./components/Header"
import Main from "./components/Main"
import { languages  } from "./assets/languages"

export default function App(){

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
            </main>
        </>
    )
}