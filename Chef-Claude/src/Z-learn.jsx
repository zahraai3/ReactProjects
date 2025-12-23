import padsData from "./components/pads"
import React from "react"
import Pad from "./components/Pad"

export default function Learn(props) {
    const [pads,setpads] = React.useState(padsData)


    const onOf = padsData.on ? "On" : "Off"

    const buttonsElement = pads.map(pad => {
        return(
        <Pad key={pad.id} color={pad.color} on={pad.on}/>
        )
})
    
    return (
        <main>
            <div className="pad-container">
                {buttonsElement}
            </div>
        </main>
    )
}
