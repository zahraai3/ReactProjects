export default function Star(props){
    console.log("Star rendered")
    console.log(props.isFavorite)
    return (
        <button
                        aria-pressed={props.isFavorite}
                        aria-label={props.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        className="favorite-button"
                         onClick={props.toggleFavorite}
                    >
                        <img
                            src={props.icon}
                            alt={props.isFavorite ? "filled star icon" : "empty star icon"}
                            className="favorite"
                        />
                    </button>
    )
}
