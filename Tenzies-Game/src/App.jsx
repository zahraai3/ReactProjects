import React from "react";
import Die from "./components/Die";

export default function App(){

    const [dice,setDice] = React.useState(allNewDice)

    function allNewDice(){
        const numsArr = []
        for (let i=0;i<10;i++){
            const rand = Math.floor(Math.random() * 6)+1
            numsArr.push(rand)
        }
        return numsArr
    }
    console.log(allNewDice( ))

    const DiceElements = dice.map((num)=>{
        return <Die value={num} />
    })

    return(
        <main>
            <div className="container">
                {DiceElements}
            </div>
        </main>
    )
}

