import { useState } from "react";
import imagen from "../assets/boton-de-informacion.png";

function ImageCard({ image }) {
    const [flip, setFlip] = useState(true);

    const saveToLocalStorage = () => {
        const storedImages = JSON.parse(localStorage.getItem("myPhotos")) || [];
        
        const isAlreadySaved = storedImages.some((img) => img.id === image.id);
        
        if (!isAlreadySaved) {
            const newImages = [...storedImages, image];
            localStorage.setItem("myPhotos", JSON.stringify(newImages));
        } else {
            alert("Esta imagen ya está guardada.");
        }
    };

    return (
        <div className="gallery">
            {flip ? (
                <img src={image.urls.small} alt={image.alt_description} key={image.id} />
            ) : (
                <div>
                    <p>Description: {image.alt_description}</p>
                    <p>Width: {image.width}px</p>
                    <p>Height: {image.height}px</p>
                    <p>Likes: {image.likes}</p>
                </div>
            )}
            <div className="buttonInfo" onClick={() => setFlip(!flip)}>
                <img className="icon" src={imagen} alt="info icon" />
            </div>
            <div>
                <p onClick={saveToLocalStorage} className="addToMyPhotos">
                    Add to My Photos
                </p>
            </div>
        </div>
    );
}

export default ImageCard;
