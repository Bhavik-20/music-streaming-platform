import NewReleases from "./NewReleases";
import Trending from "./Trending";
import { getProfileThunk } from "../../services/profile-thunks";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Row, Card } from "react-bootstrap";
import spotifyApi, {
	fetchItems,
	fetchTracks,
} from "../../spotify-hook/spotifyApi";
import Featured from "./Featured";

const ApiComponent = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["token"]);
	const [userCookies, setUserCookies, removeUserCookies] = useCookies([
		"currentUserId",
	]);

	const profile = useSelector((state) => state.myProfile);
	const [userProfile, setUserProfile] = useState(profile.myProfile);
	const [likedTracks, setLikedTracks] = useState([]);
	const [likedAlbums, setLikedAlbums] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loadLikedContent = async () => {
		try {
			if (cookies.token !== undefined) {
				setLoggedIn(true);
				const { payload } = await dispatch(getProfileThunk(cookies.token));

				const liked_tracks = await fetchTracks(payload.likedSongs);
				console.log(payload.likedSongs);
				setLikedTracks(liked_tracks);
				setUserProfile(payload);

				const liked_albums = await fetchItems(payload.likedAlbums);
				setLikedAlbums(liked_albums);
			} else {
				console.log("No token found ", userProfile);
				setUserProfile([]);
				setLikedTracks([]);
				setLikedAlbums([]);
			}
		} catch (error) {
			console.log("loadContent Error: ", error);
		}
	};

	const logout = async () => {
		removeCookie("token", { path: "/" });
		removeUserCookies("currentUserId", { path: "/" });
		setLoggedIn(false);
		alert("Success");
		navigate("/home");
	};

	useEffect(() => {
		loadLikedContent();
	}, [loggedIn]);



	return (
		<div className="container-fluid">
			<div id="welcome" className="w-100">
				<div className="row">
					<div className="jumbotron col-7">
						<h1 className="green-color">Welcome to Musify!</h1>
						<p className="white-color">
							Your personalized online music streaming
						</p>
					</div>
					<div className="col-5">
						{userProfile.length !== 0 ? (
							<div className="d-flex justify-content-end admin-stamp">
								<h2 className="green-color d-none d-lg-block">Hi, {userProfile.firstName}!</h2>
								<button className="mx-3 logout"
									onClick={(e) => {
										e.preventDefault();
										logout();
									}}>
									<i className="bi bi-box-arrow-right me-2"></i>Log Out
								</button>
							</div>
						) : (
							<h2 className="d-flex justify-content-end green-color">Hi, User!</h2>
						)}
					</div>
				</div>
			</div>
			{/* <div className="row">
			<Featured/>
			</div> */}

			{userProfile.length !== 0 ? (
				<div>
					<div id="recently-played">
						<h2 className="green-color">Liked Albums and Playlists</h2>
						{likedAlbums.length === 0 ? (
							<h4 className="text-white">
								You have not liked any Albums or Playlists yet!
							</h4>
						) : (
							<Row className="mx-2 row">
								{likedAlbums.map((album) => (
									<Card
										className="col-lg-2 col-md-3 col-sm-4"
										onClick={(e) => {
											e.preventDefault();
											if (album.type === "album") {
												navigate(`/albums/${album.id}`);
											} else {
												navigate(`/playlists/${album.id}`);
											}
										}}>
										<Card.Img src={album.images[0]?.url} className={album.type === "album"? "" : "card-img-top rounded-circle playlist-img"} />
										<Card.Body>
											<Card.Title >{(album.name.length > 13) ? album.name.substring(0, 11) + "..." : album.name} </Card.Title>
											{/* link to go to album details page */}
										</Card.Body>
									</Card>
								))}
							</Row>
						)}
					</div>
					<div id="recently-played">
						<h2 className="green-color">Liked Tracks</h2>
						{likedTracks.length === 0 ? (
							<h4 className="green-color">
								You have not liked any Tracks yet!
							</h4>
						) : (
							<Row className="mx-2 row">
								{likedTracks.tracks.map((track) => (
									<Card
									className="col-lg-2 col-md-3 col-sm-4"
										onClick={(e) => {
											e.preventDefault();
											navigate(`/tracks/${track.id}`);
										}}>
										<Card.Img
											src={track.album.images[0]?.url}
										/>
										<Card.Body>
											<Card.Title>{(track.name.length > 13) ? track.name.substring(0, 11) + "..." : track.name} </Card.Title>
											{/* link to go to album details page */}
										</Card.Body>
									</Card>
								))}
							</Row>
						)}
					</div>
				</div>
			) : (
				<div></div>
			)}

			{/*For all users */}
			<div id="recently-played">
				<h2 className="green-color">New Releases</h2>
				<NewReleases />
			</div>
			<div id="trending">
				<h2 className="green-color">Featured Playlists</h2>
				<Trending />
			</div>
		</div>
	);
};
export default ApiComponent;
