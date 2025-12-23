import padsData from "./components/pads"
import React from "react"

export default function Learn(props) {
    const [pads,setpads] = React.useState(padsData)
    const style = {
        backgroundColor : props.darkmode ? "#222222" : "#cccccc"
    }
    

    const buttonsElement = pads.map(pad => (
        <button key={pad.id} style={style}></button>
    ))
    
    return (
        <main>
            <div className="pad-container">
                {buttonsElement}
            </div>
        </main>
    )
}
