import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	fetchPlaylistDetails,
	fetchPlaylistTracks,
} from "../spotify-hook/spotifyApi";
import "./album-details.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
	likeAlbumsPlaylistThunk,
	getLikedAlbumsPlaylistThunk,
} from "../services/albums-playlist-thunk";
import Nav from "../nav-bar/Nav";
import Musify from "../nav-bar/Musify";

const PlaylistDetails = () => {
	const { likedAlbums } = useSelector((state) => state.albumsPlaylist);
	const [likedAlbumsState, setlikedAlbumsState] = useState(likedAlbums);

	const [playlist, setPlaylist] = useState(null);
	const [tracks, setTracks] = useState([]);
	const { playlistID } = useParams();
	const [isLiked, setIsLiked] = useState();
	const [currentUserCookies, setCurrentUserCookies] = useCookies([
		"currentUserId",
	]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const msToMinSec = (durationMs) => {
		const minutes = Math.floor(durationMs / 60000);
		const seconds = ((durationMs % 60000) / 1000).toFixed(0);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	const likeAlbums = async () => {
		const currentUserId = currentUserCookies.currentUserId;
		const { payload } = await dispatch(
			likeAlbumsPlaylistThunk({ currentUserId, albumId: playlist.id })
		);
		setIsLiked(payload.includes(playlist.id));
	};

	const getLikedAlbums = async () => {
		if (currentUserCookies.currentUserId !== undefined && playlistID) {
			const currentUserId = currentUserCookies.currentUserId;
			const { payload } = await dispatch(
				getLikedAlbumsPlaylistThunk(currentUserId)
			);
			console.log("Liked Albums: ", payload, payload.includes(playlistID));
			setlikedAlbumsState(payload);
			setIsLiked(payload.includes(playlistID));
		}
	};

	useEffect(() => {
		const fetchPlaylistData = async () => {
			const playlistData = await fetchPlaylistDetails(playlistID);
			setPlaylist(playlistData);
			const playlistTracks = await fetchPlaylistTracks(playlistID);
			setTracks(playlistTracks);
			// const playlistLikes = playlist.followers.total;
		};
		fetchPlaylistData();
		getLikedAlbums();
	}, [playlistID]);

	return (
		<div className="container-fluid bg-black mt-3">
			<div className="row">
				<div className="col-2">
					<Musify />
					<Nav />
				</div>
				<div className="col-10">
					<div className="row">
						<div className="col-2">
							<FaChevronLeft
								className="section"
								style={{
									height: "40px",
									margin: "15px",
								}}
								onClick={(e) => {
									e.preventDefault();
									navigate("/search");
								}}
							/>
						</div>
						<div className="centered-container">
							{playlist && (
								<>
									<div id="album-info" className="row">
										<div className="album-image col">
											<img
												src={playlist.images[0].url}
												alt={playlist.name}
												width="200"
												height="200"
											/>
										</div>
										<div className="album-details col">
											<h1>{playlist.name}</h1>
											<h3>Owner: {playlist.owner.display_name}</h3>
											<div className="col">
												<button
													style={{
														background: "black",
														color: "white",
														border: "none",
													}}
													onClick={
														currentUserCookies.currentUserId === undefined
															? () => navigate("/login")
															: likeAlbums
													}>
													{isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
												</button>
											</div>
										</div>
									</div>
									<table className="centered-table">
										<thead>
											<tr>
												<th>Title</th>
												<th>Artists</th>
												<th>Length</th>
											</tr>
										</thead>
										<tbody>
											{tracks.map((item, i) => (
												<tr key={i} className="clickable-row">
													<td>
														<Link
															to={`/tracks/${item.track.id}`}
															style={{
																textDecoration: "none",
																color: "inherit",
															}}>
															{item.track.name}
														</Link>
													</td>
													<td>
														<Link
															to={`/tracks/${item.track.id}`}
															style={{
																textDecoration: "none",
																color: "inherit",
															}}>
															{item.track.artists
																? item.track.artists.length > 1
																	? ` ${item.track.artists
																			.map((artist) => artist.name)
																			.join(", ")}`
																	: `  ${item.track.artists[0].name}`
																: "No artist information"}
														</Link>
													</td>
													<td>
														<Link
															to={`/tracks/${item.track.id}`}
															style={{
																textDecoration: "none",
																color: "inherit",
															}}>
															{msToMinSec(item.track.duration_ms)}
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaylistDetails;
