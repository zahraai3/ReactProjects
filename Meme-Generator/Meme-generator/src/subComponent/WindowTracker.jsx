import React from "react"

export default function WindowTracker() {

    const [width,setWidth] = React.useState(window.innerWidth)

    

    React.useEffect(()=>{
        window.addEventListener("resize",handleResize)

        function handleResize(){
            setWidth(window.innerWidth)
            console.log("finding a bugggg")
        }

    },[])
    return (
        <h1>Window width: {width}</h1>
    )
}