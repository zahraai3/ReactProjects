import padsData from "./sub-components/pads"
import React from "react"
import Pad from "./sub-components/Pad"

export default function Learn(props) {
    const [pads,setpads] = React.useState(padsData)

    const buttonsElement = pads.map(pad => { 
        return(
        <Pad key={pad.id} color={pad.color} on={pad.on} func={()=>toggle(pad.id)}/>
        )
})

    function toggle(id){
        setpads(prev => prev.map(pad => 
        pad.id == id ? {...pad , on : !pad.on} : pad
        ))
        console.log("workedddd")
    } 

    return (
        <main> 
            <div className="pad-container">
                {buttonsElement}
            </div>
        </main>
    )
}
