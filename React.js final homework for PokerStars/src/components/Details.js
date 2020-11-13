import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Details = () => {
    const history = useHistory();
    const id = history.location.search.match(/\d+/gm)[0];
    
    const [moreDetails, setMoreDetails] = useState();

    useEffect(() => {

        fetch(`http://localhost:3001/albums/${id}`)
            .then(response => response.json())
            .then(data => setMoreDetails(data));
    },[]);

    return (
        <div className="details">
           {moreDetails ? <p id="title">Title: {moreDetails.title}</p> : ''};
           {moreDetails ? <img id="img" src={moreDetails.image}/> : ''};
           {moreDetails ? <p id="author">Author: {moreDetails.author}</p> : ''};
           {moreDetails && moreDetails.songs && moreDetails.songs.length > 0 ? <p id="songs">Songs: {moreDetails.songs.join(', ')}</p> : ''};

        </div>
    );
};

export default Details;