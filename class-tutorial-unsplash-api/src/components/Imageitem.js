import React from "react";


const ImageItem = (prop) => {
  const { image } = prop;
  return (
    <div className="image-item p-4 border rounded-lg shadow-md m-2 h-[400px] bg-black place-items-center">    
        <img src={image.urls.small} alt={image.title} className="w-full h-auto max-h-[300px] rounded-lg object-cover" />
        <h3 className="mt-2 text-lg font-semibold text-white text-center">{image.title}</h3>
        <p className="text-gray-400 text-center">{image.description}</p>
    </div>
    );
    }


export default ImageItem;