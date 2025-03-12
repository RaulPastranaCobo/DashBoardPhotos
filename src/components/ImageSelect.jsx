import React from "react";

const ImageSelect = ({ images }) => {
  return (
    <div>
      <h2>Imágenes guardadas</h2>
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} />
        ))}
      </div>
    </div>
  );
};

export default ImageSelect;
