import React from "react";
import SearchBar from "./search-bar";

const SearchComponent = ({accessToken, spotifyApi}) => {



    return (
        <div className="row">
            <div className="col-2">
                Navbar
            </div>
            <div className="col">
            <SearchBar accessToken={accessToken} spotifyApi={spotifyApi}/>
    
            </div>
     
        </div>
    );
};

export default SearchComponent;