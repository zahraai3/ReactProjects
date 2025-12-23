import padsData from "./components/pads"
import React from "react"

export default function Learn() {
    const [pads,setpads] = React.useState(padsData)
    
    const buttonsElement = pads.map(pad => (
        <button key={pad.id}></button>
    ))
    
    return (
        <main>
            <div className="pad-container">
                {buttonsElement}
            </div>
        </main>
    )
}
