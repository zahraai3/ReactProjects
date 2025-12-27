import padsData from "./pads"
import React from "react"

export default function Pad(props){
    const [on,setOn] = React.useState(props.on)

    function toggleOn(){
        setOn(prevState => !prevState)
    }

    return(
        <button style={{backgroundColor : props.color}} 
        className={on ? "on" : "null"}
        onClick={props.func}
        ></button>
    )
}
