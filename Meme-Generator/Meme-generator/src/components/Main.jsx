import {useState , useEffect} from "react"

export default function Main(){

    const [meme,setMeme] = useState({topText:"", buttomText:"" , imageUrl:"http://i.imgflip.com/1bij.jpg"})
    
    function handleChange(e){
        const {name,value} = e.currentTarget
        setMeme(prevMeme =>({
            ...prevMeme,
            [name]:value
        }))
        console.log(meme[name])
    }
    return(
        <main>
            <div className="form">
                <label>Top Text 
                    <input 
                        type="text" 
                        name="topText" 
                        placeholder={meme.topText} 
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Buttom Text
                    <input 
                        type="text" 
                        name="buttomText"
                        placeholder={meme.buttomText}
                        onChange={handleChange}
                        value={meme.buttomText}
                    />
                </label>

                <button>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.buttomText}</span>
            </div>
        </main>
    )
}