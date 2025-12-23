import padsData from "./pads"
import React from "react"

export default function Pad(props){
    return(
        <button style={{backgroundColor : props.color}} 
        className={props.on ? "on" : "null"}
        ></button>
    )
}
