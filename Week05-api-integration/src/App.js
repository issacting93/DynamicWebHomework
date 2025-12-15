import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';  
import SearchBar from './components/Searchbar';   
import searchImages from './api';
import ImageList from './components/Imagelist';

const App = () => {   

  const [images, setImages] = useState([]);

  const handleSubmit = async (term) => { 
    const result  = await searchImages(term); 
    setImages(result); // update state with results
  }

  return <div>
            App
             <SearchBar onSubmit={handleSubmit} /> 
               {images.length} images found
               <ImageList images={images} />
        </div>
}
 
export default App;
