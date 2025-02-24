import { useState } from "react"
import NavBar from "../components/NavBar";



function MyPhotos(){

    const [view, setView] = useState("search")



    return (
        <div className="nav">
            <button onClick={()=>setView("search")}>Search</button>
            <button onClick={()=>setView("myphotos")}>My Photos</button>

            <div>
                {view === "search" && <h1>Página de búsqueda</h1>}
                {view === "myphotos" && <h1>Fotos guardadas</h1>}
                <NavBar></NavBar>
            </div>
        </div>

    )
}

export default MyPhotos;