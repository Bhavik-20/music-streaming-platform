import React, { useState, useEffect } from "react";
import {
	fetchAlbumDetails,
	fetchAlbumTracks,
} from "../spotify-hook/spotifyApi";
import "./album-details.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
	FaHeart,
	FaRegHeart,
	FaChevronLeft,
	FaUnderline,
} from "react-icons/fa";
import {
	likeAlbumsPlaylistThunk,
	getLikedAlbumsPlaylistThunk,
} from "../services/albums-playlist-thunk";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { searchAlbumsByGenre } from "../spotify-hook/spotifyApi";
import { Row, Container, Card } from "react-bootstrap";
import { fetchArtistAlbums } from "../spotify-hook/spotifyApi";
import Nav from "../nav-bar/Nav";

const AlbumDetails = () => {
	const { likedAlbums } = useSelector((state) => state.albumsPlaylist);
	const [likedAlbumsState, setlikedAlbumsState] = useState(likedAlbums);

	const [album, setAlbum] = useState(null);
	const [tracks, setTracks] = useState([]);
	const { albumID } = useParams();
	const [isLiked, setIsLiked] = useState();
	const [artistAlbums, setArtistAlbums] = useState([]);
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
			likeAlbumsPlaylistThunk({ currentUserId, albumId: album.id })
		);
		setIsLiked(payload.includes(album.id));
	};

	const getLikedAlbums = async () => {
		if (currentUserCookies.currentUserId !== undefined && albumID) {
			const currentUserId = currentUserCookies.currentUserId;
			const { payload } = await dispatch(
				getLikedAlbumsPlaylistThunk(currentUserId)
			);
			console.log("Liked Albums: ", payload, payload.includes(albumID));
			setlikedAlbumsState(payload);
			setIsLiked(payload.includes(albumID));
		}
	};

	useEffect(() => {
		const fetchAlbumData = async () => {
			const albumData = await fetchAlbumDetails(albumID);
			setAlbum(albumData);
			const albumTracks = await fetchAlbumTracks(albumID);
			setTracks(albumTracks);
			const artistID = albumData.artists[0].id;
			const artistAlbums = await fetchArtistAlbums(artistID);
			setArtistAlbums(artistAlbums);
		};
		fetchAlbumData();
		getLikedAlbums();
	}, [albumID]);

	return (
		<div className="container-fluid bg-black mt-3">
			<div className="row">
				<div className="col-2 mt-5">
					<Nav />
				</div>
				<div className="col-10">
					<div>
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
							{album && (
								<>
									<div id="album-info" className="row">
										<div className="album-image col">
											<img
												src={album.images[0].url}
												alt={album.name}
												width="200"
												height="200"
											/>
										</div>
										<div className="album-details col">
											<h1>{album.name}</h1>
											{album.artists.map((artist, i) => (
												<b key={i}>{artist.name + " "}</b>
											))}
											{album.release_date}
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
											{tracks.map((track, i) => (
												<tr key={i} className="clickable-row">
													<td>
														<Link
															to={`/tracks/${track.id}`}
															style={{
																textDecoration: "none",
																color: "inherit",
															}}>
															{track.name}
														</Link>
													</td>
													<td>
														<Link
															to={`/tracks/${track.id}`}
															style={{
																textDecoration: "none",
																color: "inherit",
															}}>
															{track.artists.length > 1
																? ` ${track.artists
																		.map((artist) => artist.name)
																		.join(", ")}`
																: `  ${track.artists[0].name}`}
														</Link>
													</td>
													<td>
														<Link
															to={`/tracks/${track.id}`}
															style={{
																textDecoration: "none",
																color: "inherit",
															}}>
															{msToMinSec(track.duration_ms)}
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
									<div className="album-details">
										<h3>More by {album.artists[0].name}</h3>
										<Container style={{ marginTop: "10px" }}>
											<Row className="mx-2 row row-cols-6">
												{artistAlbums.slice(0, 5).map((album, i) => {
													return (
														<Link
															to={`/albums/${album.id}`}
															style={{
																textDecoration: "none",
																color: "inherit",
															}}>
															<Card
																style={{
																	margin: "5px",
																}}
																className="card">
																<Card.Img src={album.images[0].url} />
																<Card.Body>
																	<Card.Title>{album.name} </Card.Title>
																</Card.Body>
															</Card>
														</Link>
													);
												})}
											</Row>
										</Container>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlbumDetails;
