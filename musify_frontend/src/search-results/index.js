import React from "react";
import SearchBar from "./search-bar";
import { FaChevronLeft } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import AlbumDetails from "./album-details";
import { useNavigate } from "react-router-dom";
import Nav from "../nav-bar/Nav";
import Musify from "../nav-bar/Musify";

const SearchComponent = ({ accessToken, spotifyApi }) => {
	const navigate = useNavigate();

	return (
		<div className="container-fluid bg-black mt-3">
			<div className="row">
				<div className="col-2">
					<Musify />
					<Nav />
				</div>
				<div className="col-10">
					<div className="row">
						<div className="col">
							<div className="row" style={{ margin: "10px" }}>
								<div className="col">
									<SearchBar
										accessToken={accessToken}
										spotifyApi={spotifyApi}
									/>
									{/* <AlbumDetails albumID="4aawyAB9vmqN3uQ7FjRGTy" spotifyApi={spotifyApi}/> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchComponent;
