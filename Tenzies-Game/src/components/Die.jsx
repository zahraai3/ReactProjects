

export default function Die(props){
    return(
        <button 
            style={
                {backgroundColor: 
                    props.isHeld ? "#59E391" : "#f5f5f5"}
                } 
            onClick={
                ()=>props.holdFunc(props.id)
            }
            aria-label={`die with value of ${props.value}, ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}
            >            
        {props.value}</button>
    )
}