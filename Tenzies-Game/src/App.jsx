import React from "react";
import Die from "./components/Die";

export default function App(){

    function allNewDice(){
        const numsArr = []
        for (let i=0;i<10;i++){
            const rand = Math.floor(Math.random() * 6)+1
            numsArr.push(rand)
        }
        return numsArr
    }
    console.log(allNewDice( ))

    return(
        <main>
            <div className="container">
                <Die value={1}/>
                <Die value={1}/>
                <Die value={1}/>
                <Die value={1}/>
                <Die value={1}/>
                <Die value={1}/>
                <Die value={1}/>
                <Die value={1}/>
                <Die value={1}/>
                <Die value={1}/>
            </div>
        </main>
    )
}
