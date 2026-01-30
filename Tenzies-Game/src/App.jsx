import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"

export default function App(){

    const [dice,setDice] = React.useState(generateAllNewDice)

    function generateAllNewDice(){
        const numsArr = []
        for (let i=0;i<10;i++){
            const rand = Math.floor(Math.random() * 6)+1
            const obj = {value: rand , isHeld:true , id: nanoid() }
            numsArr.push(obj)
        }
        return numsArr
    }
    

    const DiceElements = dice.map((diceObj)=>{
        return <Die value={diceObj.value} key={diceObj.id} isHeld={diceObj.isHeld} holdFunc={hold} id={diceObj.id}/>
    })

    function rollDice(){
        setDice(generateAllNewDice)
    }

    function hold(id) {
    setDice(prevDice =>
        prevDice.map(item =>
            item.id === id ? { ...item, isHeld: !item.isHeld } : item
        )
    )
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

