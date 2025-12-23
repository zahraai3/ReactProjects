import padsData from "./components/pads"
import React from "react"
import Pad from "./components/Pad"

export default function Learn(props) {
    const [pads,setpads] = React.useState(padsData)


    const buttonsElement = pads.map(pad => (
        <Pad key={pad.id} color={pad.color}/>
    ))
    
    return (
        <main>
            <div className="pad-container">
                {buttonsElement}
            </div>
        </main>
    )
}
