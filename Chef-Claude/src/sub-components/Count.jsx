import React from "react";

export default function Count(props){

    console.log('count rendered')
    return <h2 className="count">{props.number}</h2>
}

