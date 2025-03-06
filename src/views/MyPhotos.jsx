import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/header";
import Footer from "../components/Footer";
import Filter from "../components/Filter";

function MyPhotos() {
    const [myPhotos, setMyPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newDescription, setNewDescription] = useState("");

    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem("myPhotos")) || [];
        setMyPhotos(storedImages);
        setFilteredPhotos(storedImages);
    }, []);

    const deletePhoto = (id) => {
        const updatedPhotos = myPhotos.filter((image) => image.id !== id);
        setMyPhotos(updatedPhotos);
        setFilteredPhotos(updatedPhotos);
        localStorage.setItem("myPhotos", JSON.stringify(updatedPhotos));
    };

    const startEditing = (id, currentDescription) => {
        setEditingId(id);
        setNewDescription(currentDescription);
    };

    const saveDescription = (id) => {
        const updatedPhotos = myPhotos.map((image) =>
            image.id === id ? { ...image, alt_description: newDescription } : image
        );
        setMyPhotos(updatedPhotos);
        setFilteredPhotos(updatedPhotos);
        localStorage.setItem("myPhotos", JSON.stringify(updatedPhotos));
        setEditingId(null);
    };

    const filterPhotos = (searchTerm) => {
        const filtered = myPhotos.filter((image) =>
            image.alt_description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPhotos(filtered);
    };

    return (
        <>
            <Header />
            <h2>My Photos</h2>
            <Filter onFilter={filterPhotos} />
            <div className="galleryFavorite">
                {filteredPhotos.length === 0 ? (
                    <p>No hay fotos guardadas</p>
                ) : (
                    <div className="galleryFavoriteImages">
                        {filteredPhotos.map((image) => (
                            <div key={image.id}>
                                <img src={image.urls.small} alt={image.alt_description} />
                                {editingId === image.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={newDescription}
                                            onChange={(e) => setNewDescription(e.target.value)}
                                        />
                                        <button onClick={() => saveDescription(image.id)}>Guardar</button>
                                    </>
                                ) : (
                                    <>
                                        <p>{image.alt_description}</p>
                                        <button onClick={() => startEditing(image.id, image.alt_description)}>
                                            Editar Descripción
                                        </button>
                                    </>
                                )}
                                <button onClick={() => deletePhoto(image.id)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default MyPhotos;
