import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"

export default function App(){

    const [dice,setDice] = React.useState(generateAllNewDice)

    function generateAllNewDice(){
        const numsArr = []
        for (let i=0;i<10;i++){
            const rand = Math.floor(Math.random() * 6)+1
            const obj = {value: rand , isHeld:false , id: nanoid() }
            numsArr.push(obj)
        }
        return numsArr
    }
    console.log(generateAllNewDice())

    const DiceElements = dice.map((diceObj)=>{
        return <Die value={diceObj.value} key={diceObj.id}/>
    })

    function rollDice(){
        setDice(generateAllNewDice)
    }

    return(
        <main>
            <div className="container">
                {DiceElements}
            </div>
            <button className="roll-dice " onClick={rollDice}>Roll</button>
        </main>
    )
}

