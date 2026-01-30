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
    

    const DiceElements = dice.map((diceObj)=>{
        return <Die value={diceObj.value} key={diceObj.id} isHeld={diceObj.isHeld} holdFunc={hold} id={diceObj.id}/>
    })

    function rollDice(){
        setDice(prev =>
            prev.map(item =>
                item.isHeld ? item : { ...item , value: Math.ceil(Math.random() * 6)}
            )
        )
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
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {DiceElements}
            </div>
            <button className="roll-dice " onClick={rollDice}>Roll</button>
        </main>
    )
}

