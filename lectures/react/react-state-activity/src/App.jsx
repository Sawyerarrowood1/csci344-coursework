import React, {useState, useEffect} from "react";
import Carousel from "./Carousel";
import Galleries from "./Galleries";
import "./App.css";

export default function App() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [photos, setPhotos] = useState([]);

    async function getFlickrPhotos() {
        const url = galleries[activeIndex].endpoint;
        const response = await fetch(url);
        const arrOfObjects = await response.json();
        const arrOfStrings = arrOfObjects.map(obj => obj.img_url);
        console.log(arrOfStrings);
        setPhotos(arrOfStrings);
    }

    useEffect(() => {
        getFlickrPhotos();
    }, [activeIndex]);

    const galleries = [
        {
            name: "Cats",
            endpoint: "https://www.apitutor.org/flickr/simple/?tags=cat"
        },
        {
            name: "Dogs",
            endpoint: "https://www.apitutor.org/flickr/simple/?tags=dog"
        },
        {
            name: "Asheville",
            endpoint: "https://www.apitutor.org/flickr/simple/?tags=asheville"
        },
        {
            name: "Birds",
            endpoint: "https://www.apitutor.org/flickr/simple/?tags=birds"
        },
        {
            name: "Flowers",
            endpoint: "https://www.apitutor.org/flickr/simple/?tags=flowers"
        },
    ];

    return (
        <div>
            <h1>This is a Gallery of Photos</h1>
            {/* sharing state between components often involves moving the
            state variable items to the parent and then passing those items in. */}
            <Galleries 
                galleries={galleries} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} />

            <Carousel photos={photos} />
        </div>
    );
}
