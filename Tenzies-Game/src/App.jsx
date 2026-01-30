import React, { useEffect, useRef } from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){

    const [dice,setDice] = React.useState(generateAllNewDice)
    const buttonRef = useRef(null)

// كل مرة component يعيد render، الكود كله ينكتب من جديد.

// إذا initial state كان فنكشن ثقيل ونفذته فوراً → كل render راح يشتغل زيادة.

// الليزي ستيت تحل المشكلة:

// React تنادي الفنكشن مرة وحدة فقط.

// يحافظ على الأداء.


    function generateAllNewDice(){
        console.log(" function calleddddd")
        const numsArr = []
        for (let i=0;i<10;i++){
            const rand = Math.floor(Math.random() * 6)+1
            const obj = {value: rand , isHeld:false , id: nanoid() }
            numsArr.push(obj)
        }
        return numsArr
    }
    
    let gameWon = false
    if(dice.every(die => die.isHeld === true && dice[0].value === die.value)){
        console.log("wonnnnnn")
        gameWon = true
    }
    

    const DiceElements = dice.map((diceObj)=>{
        return <Die value={diceObj.value} key={diceObj.id} isHeld={diceObj.isHeld} holdFunc={hold} id={diceObj.id}/>
    })

    function rollDice(){
        if(gameWon){
            setDice(generateAllNewDice())
        } else {
            setDice(prev =>
                prev.map(item =>
                    item.isHeld ? item : { ...item , value: Math.ceil(Math.random() * 6)}
                )
            )
        }
    }

    function hold(id) {
    setDice(prevDice =>
        prevDice.map(item =>
            item.id === id ? { ...item, isHeld: !item.isHeld } : item
        )
    )
}

//مجرد اضافه للمستخدم تسهيل يروح مباشره لزر لعبه جديده
useEffect(() => {
    if(gameWon){
        buttonRef.current.focus()
    }
},[gameWon])

    return(
        <main>
            {gameWon && <Confetti/>}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations you WON! Press "New Game" to start again</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

            <div className="container">
                {DiceElements}
            </div>
            <button  ref={buttonRef} className="roll-dice " onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}

