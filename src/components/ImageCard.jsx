import { useState } from "react";
import imagen from "../assets/boton-de-informacion.png"

function ImageCard({image}){

    const [flip, setFlip]= useState(true)
    return <div>
        {
            flip ?
            <img src={image.urls.small} key={image.id}></img>
            : 
            <div>
                <p>Description: {image.alt_description}
                </p>
                <p>Width: {image.width}px
                </p>
                <p>Height: {image.height}px
                </p>
                <p>Likes: {image.likes}
                </p>
            </div>
        }
        <div className="buttonInfo" onClick={()=>setFlip(!flip)}><img src={imagen}></img></div>
        <div><p>Add to My Photos</p></div>
    </div>
}

export default ImageCard;