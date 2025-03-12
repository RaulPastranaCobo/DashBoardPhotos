import { useState } from "react";
import imagen from "../assets/boton-de-informacion.png";
import corazon from "../assets/corazon.png"

function ImageCard({ image }) {
    const [flip, setFlip] = useState(false);

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

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="flip-container">
            <div className={`card ${flip ? "flipped" : ""}`}>
                <div className="front">
                    <img src={image.urls.small} alt={image.alt_description} />
                    <div className="buttonInfo" onClick={() => setFlip(!flip)}>
                        <img className="icon" src={imagen} alt="info icon" />
                    </div>
                </div>
                <div className="back">
                    <p><strong>Description:</strong> {image.alt_description}</p>
                    <p><strong>Width:</strong> {image.width}px</p>
                    <p><strong>Height:</strong> {image.height}px</p>
                    <p><strong>Likes:</strong> {image.likes}</p>
                    <p><strong>Date Added:</strong> {formatDate(image.created_at)}</p>
                    <div onClick={saveToLocalStorage} className="addToMyPhotos">
                        <img className="like" src={corazon} alt="like" />
                    </div>
                    <div className="buttonInfo" onClick={() => setFlip(!flip)}>
                        <img className="icon" src={imagen} alt="info icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageCard;
