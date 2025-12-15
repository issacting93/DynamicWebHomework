import React from "react";
import ImageItem from "./Imageitem";

const ImageList = ({ images }) => {
  return (
    <div className="image-list ">
      {images.map((image) => (
        <ImageItem key={image.id} image={image} />
      ))}        
    </div>
  );
};

export default ImageList;   