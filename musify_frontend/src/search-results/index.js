import React from "react";
import SearchBar from "./search-bar";

const SearchComponent = ({accessToken}) => {



    return (
        <div className="row">
            <div className="col-2">
                Navbar
            </div>
            <div className="col">
            <SearchBar accessToken={accessToken}/>
    
            </div>
     
        </div>
    );
};

export default SearchComponent;