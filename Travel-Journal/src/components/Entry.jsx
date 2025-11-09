export default function Entry(props){
    return (
        <article className="artical-journal">
            <div className="fuji-div">
                <img 
                    className="fuji" 
                    src={props.img.src} 
                    alt={props.img.alt} 
                />
            </div>
            <div className="info">
                <img className="icon-fuji" src="src/assets/marker.png" alt="marker-icon" />
                <span>{props.country}</span>
                <a href={props.googleMapsLink} target="_blank">View on Google Maps</a>
                <h2>{props.title}</h2>
                <p className="date">{props.dates}</p>
                <p>{props.text}</p>

            </div>
            
        </article>
    )
}