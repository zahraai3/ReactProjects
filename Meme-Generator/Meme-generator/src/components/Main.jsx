import {useState , useEffect} from "react"

export default function Main(){
    const [meme,setMeme] = useState({topText:"One does not simply", buttomText:"Walk into Mordor" , imageUrl:"http://i.imgflip.com/1bij.jpg"})
    return(
        <main>
            <div className="form">
                <label>Top Text 
                    <input 
                        type="text" 
                        name="topText" 
                        placeholder={meme.topText} 
                    />
                </label>

                <label>Buttom Text
                    <input 
                        type="text" 
                        name="bottomText"
                        placeholder={meme.buttomText}
                    />
                </label>

                <button>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">One does not simply</span>
                <span className="bottom">Walk into Mordor</span>
            </div>
        </main>
    )
}