import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import { saveAs } from "file-saver";
import download from "../assets/descargas.png";
import deleteIcon from "../assets/papelera.png";
import edit from "../assets/lapiz.png";
import tick from "../assets/garrapata.png";

function MyPhotos() {
  const [myPhotos, setMyPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [sortOption, setSortOption] = useState("");

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

  const sortPhotos = (option) => {
    setSortOption(option);
    const [key, order] = option.split("-");
    const sortedPhotos = [...filteredPhotos].sort((a, b) => {
      let comparison = 0;
      if (key === "width") comparison = a.width - b.width;
      if (key === "height") comparison = a.height - b.height;
      if (key === "likes") comparison = a.likes - b.likes;
      return order === "asc" ? comparison : -comparison;
    });
    setFilteredPhotos(sortedPhotos);
  };

  const downloadPhoto = (url, filename) => {
    saveAs(url, filename);
  };

  return (
    <>
      <Filter onFilter={filterPhotos} />
      <div className="selection">
        <select
          className="orderBy"
          onChange={(e) => sortPhotos(e.target.value)}
          value={sortOption}
        >
          <option value="width-asc">Width ↓</option>
          <option value="width-desc">Width ↑</option>
          <option value="height-asc">Height ↓</option>
          <option value="height-desc">Height ↑</option>
          <option value="likes-asc">Likes ↓</option>
          <option value="likes-desc">Likes ↑</option>
        </select>
      </div>
      <div className="galleryFavorite">
        {filteredPhotos.length === 0 ? (
          <p className="emptyPhotos">No hay fotos guardadas</p>
        ) : (
          <div className="galleryFavoriteImages">
            {filteredPhotos.map((image) => (
              <div key={image.id} className="photoCard">
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  className="photoView"
                />
                <div className="photoInfo">
                  <p>
                    <strong>Likes:</strong> {image.likes}
                  </p>
                  <p>
                    <strong>Width:</strong> {image.width} px
                  </p>
                  <p>
                    <strong>Height:</strong> {image.height} px
                  </p>
                </div>

                {editingId === image.id ? (
                  <>
                    <textarea
                      className="description"
                      type="textarea"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />

                    <div className="iconContainer">
                      <div onClick={() => saveDescription(image.id)}>
                        <img src={tick} className="tickIcon" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{image.alt_description}</p>

                    <div className="iconContainer">
                      <div
                        onClick={() =>
                          startEditing(image.id, image.alt_description)
                        }
                      >
                        <img src={edit} className="editIcon" />
                      </div>
                    </div>
                  </>
                )}

                <div className="iconContainer">
                  <div onClick={() => deletePhoto(image.id)}>
                    <img src={deleteIcon} className="deleteIcon" />
                  </div>
                  <div
                    onClick={() =>
                      downloadPhoto(image.urls.full, `photo-${image.id}.jpg`)
                    }
                  >
                    <img src={download} className="downloadIcon" />
                  </div>
                </div>
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
