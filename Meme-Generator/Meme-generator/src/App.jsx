import Header from "./components/Header";
import Main from "./components/Main";

import React, { useState } from "react"

export default function App(props) {
    const [starWarsData, setStarWarsData] = React.useState(null)
    const[count,setCount] = useState(0)
    
    console.log("first console!")

    React.useEffect(() => {
        fetch("https://swapi.dev/api/people/1")
        .then(res => res.json())
        .then(data => setStarWarsData(data))
        console.log("fetched !!")
    },[]) 
    
    return (
        <div> 
          <h1>The count is {count}</h1>
          <button onClick={() => setCount(prev => prev + 1)}>ADD</button>
        </div>
    )
}
{/* <pre>{JSON.stringify(starWarsData, null, 2)}</pre> */}