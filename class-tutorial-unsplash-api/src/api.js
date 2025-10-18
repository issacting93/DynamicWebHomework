// base url  : https//api.unsplash.com
// endpoint/routeL

import axios from "axios";

const searchImages = async (term) => { 
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
            Authorization: 'Client-ID IOuIu6CMf3XaWdrPiEBI8IN8OUKt51tJTEBFIvkUztQ',
        },
        params: {query: term,
        },
   
    }) //axios returns a promise so we need to await it 

    console.log(response.data.results)
    return response.data.results
    
}

export default searchImages