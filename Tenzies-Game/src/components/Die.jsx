

export default function Die(props){
    return(
        <button style={{backgroundColor: props.isHeld ? "#59E391" : "#f5f5f5"}} onClick={()=>props.holdFunc(props.id)}>{props.value}</button>
    )
}