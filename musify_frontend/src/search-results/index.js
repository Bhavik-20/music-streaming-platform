import React from "react";
import SearchBar from "./search-bar";
import { FaChevronLeft } from "react-icons/fa";
import { BsPersonCircle} from 'react-icons/bs'
import AlbumDetails from "./album-details";

const SearchComponent = () => {
  return (
    <div className="row">
      <div className="col-2">Navbar</div>
      <div className="col">
        <div className="row" style={{margin: "10px"}}>
          <div className="col-1">
            <FaChevronLeft style={{
                  height: "40px"
                }}/>
          </div>
          <div className="col">
            <SearchBar />
          </div>
          <div className="col-1">
            <BsPersonCircle style={{
                  fontSize: "40px"
                }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;