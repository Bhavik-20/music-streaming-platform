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

	const cardStyle = {
		background: "transparent",
		border: "none",
		marginBottom: "5px",
	};

	const imageStyle = {
		boxShadow: "0px 0px 10px white", // Add white shadow
	};

	const titleStyle = {
		fontSize: "14px",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		color: "white", // Set title color to white
	};

	return (
		<div className="container-fluid">
			<div id="welcome" className="w-100">
				<div className="row">
					<div className="jumbotron col-9">
						<h1 className="green-color">Welcome to Musify!</h1>
						<p className="green-color">
							Your personalized online music streaming
						</p>
					</div>
					<div className="col-3">
						{userProfile.length !== 0 ? (
							<div>
								<h2 className="green-color">Hi, {userProfile.firstName}!</h2>
								<button
									className="green-color"
									onClick={(e) => {
										e.preventDefault();
										logout();
									}}></button>
							</div>
						) : (
							<h2 className="green-color">Hi, User!</h2>
						)}
					</div>
				</div>
			</div>

			{userProfile.length !== 0 ? (
				<div>
					<div id="recently-played">
						<h2 className="green-color">Liked Albums</h2>
						{likedAlbums.length === 0 ? (
							<h4 className="green-color">
								You have not liked any Albums yet!
							</h4>
						) : (
							<Row className="mx-2 col-6 row row-cols-6">
								{likedAlbums.map((album) => (
									<Card
										style={cardStyle}
										className="card"
										onClick={(e) => {
											e.preventDefault();
											if (album.type === "album") {
												navigate(`/albums/${album.id}`);
											} else {
												navigate(`/playlists/${album.id}`);
											}
										}}>
										<Card.Img style={imageStyle} src={album.images[0]?.url} />
										<Card.Body>
											<Card.Title style={titleStyle}>{album.name} </Card.Title>
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
							<Row className="mx-2 row row-cols-6">
								{likedTracks.tracks.map((track) => (
									<Card
										style={cardStyle}
										className="card"
										onClick={(e) => {
											e.preventDefault();
											navigate(`/tracks/${track.id}`);
										}}>
										<Card.Img
											style={imageStyle}
											src={track.album.images[0]?.url}
										/>
										<Card.Body>
											<Card.Title style={titleStyle}>{track.name} </Card.Title>
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
