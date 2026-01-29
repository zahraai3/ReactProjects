import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

import WindowTracker from "./subComponent/WindowTracker"

export default function App() {
    /**
     * Challenge:
     * 1. Create state called `show`, default to `true`
     * 2. When the button is clicked, toggle `show`
     * 3. Only display `<WindowTracker>` if `show` is `true`
     */
    
    const [show,setShow] = useState(true)

    return (
        <main className="container">
            <button onClick={()=> {setShow(prev=> !prev)}}>
                Toggle WindowTracker
            </button>
            {show && <WindowTracker />}
        </main>
    )
}




// export default function App(p) {
//     return (
//         <>
//             <Header/>
//             <Main/>
//         </>
//     )
// }
