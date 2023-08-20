import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/Button";
import {
	getSearchedProfileThunk,
	followUserThunk,
} from "../../../services/profile-thunks";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
	FaChevronLeft
} from "react-icons/fa";
import {
	getUserDataFollowingThunk,
	getUserDataFollowersThunk,
} from "../../../services/profile-thunks";
import Nav from "../../../nav-bar/Nav";
import Musify from "../../../nav-bar/Musify";
import { fetchItems, fetchTracks, fetchArtistAlbumsFromName, fetchArtistTracksFromName, fetchArtistFromName } from "../../../spotify-hook/spotifyApi";

const ListenerProfileComponent = () => {
	const [cookies, setCookie] = useCookies(["token"]);
	const profile = useSelector((state) => state.profile);
	const [userProfile, setProfile] = useState(profile.profile);
	const [userProfileFollowingList, setUserProfileFollowingList] = useState(
		profile.userDataFollowing
	);
	const [userProfileFollowersList, setUserProfileFollowersList] = useState(
		profile.userDataFollowers
	);

	const [nameInitials, setNameInitials] = useState("");
	const [likedTracks, setLikedTracks] = useState([]);
	const [likedAlbums, setLikedAlbums] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [topTracks, setTopTracks] = useState([]);
	const [artistFollowers, setArtistFollowers] = useState(0);
	const [artistPopularity, setArtistPopularity] = useState(0);

	const [followButtonText, setFollowButtonText] = useState("");
	const { pid } = useParams();
	const [currentUserCookies, setCurrentUserCookies] = useCookies([
		"currentUserId",
	]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const followUser = async () => {
		const currentUserId = cookies.token;
		const followUserId = pid;
		const { payload } = await dispatch(
			followUserThunk({ currentUserId, followUserId })
		);
		setProfile(payload);
		setNameInitials(payload.firstName.charAt(0) + payload.lastName.charAt(0));

		const followingList = await dispatch(getUserDataFollowingThunk(pid));
		setUserProfileFollowingList(followingList.payload);

		const followerList = await dispatch(getUserDataFollowersThunk(pid));
		setUserProfileFollowersList(followerList.payload);

		if (payload.followers.includes(currentUserCookies.currentUserId)) {
			setFollowButtonText("Unfollow");
		} else {
			setFollowButtonText("Follow");
		}
	};

	const msToMinSec = (milliseconds) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
	  
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
	  
		const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	  
		return formattedTime;
	  }

	const loadProfile = async () => {
		try {
			const { payload } = await dispatch(getSearchedProfileThunk(pid));
			setProfile(payload);
			setNameInitials(
				payload.firstName.charAt(0).toUpperCase() +
					payload.lastName.charAt(0).toUpperCase()
			);

			const followingList = await dispatch(getUserDataFollowingThunk(pid));
			setUserProfileFollowingList(followingList.payload);

			const followerList = await dispatch(getUserDataFollowersThunk(pid));
			setUserProfileFollowersList(followerList.payload);

			if (payload.followers.includes(currentUserCookies.currentUserId)) {
				setFollowButtonText("Unfollow");
			} else {
				setFollowButtonText("Follow");
			}

			const liked_tracks = await fetchTracks(payload.likedSongs);
			setLikedTracks(liked_tracks);

			const liked_albums = await fetchItems(payload.likedAlbums);
			setLikedAlbums(liked_albums);

			console.log("fetchAlbums: ", payload.firstName + " " + payload.lastName);
            const artist_albums = await fetchArtistAlbumsFromName(payload.firstName + " " + payload.lastName); 
            const top_Albums = artist_albums.slice(0, 6); 
            setAlbums(top_Albums);

			//artist_tracks is an array containing track objects, can map through and get track.name, track.album.images[0], and track.popularity
			//track.duration_ms provides duration in ms. Refer to album-details and track-details page for helper function on converting duration to minutes and seconds
			const artist_tracks = await fetchArtistTracksFromName(payload.firstName + " " + payload.lastName); 
            const topTracks = artist_tracks.slice(0, 10); 
			setTopTracks(topTracks);

			//followers and popularity are set as state vars but other artist info can be fetched using artistObject.desiredField
			const artistObject = await fetchArtistFromName(payload.firstName + " " + payload.lastName); 

			//Integer of followers count
			setArtistFollowers(artistObject.followers.total);

			//Integer of artist's popularity score
			setArtistPopularity(artistObject.popularity);
            console.log("artist albums:", albums);
			console.log("artist tracks:", topTracks);
			console.log("artist", artistObject);
		} catch (error) {
			console.log("loadProfile Error: ", error);
		}
	};


	useEffect(() => {
		loadProfile();
	}, [pid]);

	return (
		<div className="container-fluid bg-black mt-3">
			<div className="row">
				<div className="col-2">
					<Musify />
					<Nav />
				</div>
				<div className="col-10">
					<div className="w-100 h-100 d-flex flex-column align-items-center">
						<div className="p-5 w-100 d-flex justify-content-center align-items-center row nav-bar border-b border-solid">
						<div className="col-1">
							<FaChevronLeft
								className="section"
								style={{
									height: "40px",
									margin: "15px",
								}}
								onClick={(e) => {
									e.preventDefault();
									navigate(-1);
								}}
							/>
							</div>
							<div className="col-2">
								<div className="profile-icon rounded-circle d-flex justify-content-center align-items-center">
									<span className="bg-transparent"> {nameInitials}</span>
								</div>
							</div>
							<div className="col-1"> </div>
							<div className="col-8">
								<div className="profile-info text-white d-flex align-items-end">
									<div>
									<p className="text-sm"> 
										{userProfile.role === "listener" ?
											"Listener" : userProfile.role === "artist-verified" ? (
											<>
												<i className="verified col-1 bi bi-patch-check-fill" /> Verified Artist
											</>
											) : "Artist"}
										</p>

										<h1 className="green-color bg-transparent listener-title">
											{userProfile.firstName} {userProfile.lastName} - @
											{userProfile.username}
										</h1>
										
										{userProfile.role === "listener" ? 
										(<p className="text-sm">
											{" "}
											<a href="#followers" className="text-white">
												{userProfile.followCount} Followers
											</a>{" "}
											.{" "}
											<a href="#following" className="text-white">
												{userProfile.followingCount} Following
											</a>{" "}
										</p>) : userProfile.role === "artist-verified" ?
										 <p> {artistFollowers} Followers . {artistPopularity} Popularity </p> 
										: <p> {userProfile.followCount} Followers </p> }
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-10 col-10 justify-content-left">
							<Button
								text={followButtonText}
								className="bg-transparent text-white border rounded px-4 py-2 mb-3"
								onClick={(e) => {
									e.preventDefault();
									if(currentUserCookies.currentUserId !== undefined) {
										followUser();
									} else {
										navigate("/login");
									}
								}}
							/>
						</div>

						{userProfile.role === "artist" || userProfile.role === "artist-pending" ?
						<div className="col-sm-10 col-10 text-white mb-3 mx-auto">
							<p>The artist has not posted any content yet !</p>
						</div> : ""} 

						{userProfile.role !== "artist-verified" ? (
							<div>
								{likedTracks.length === 0 ? (
									""
								) : (
									<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3 mx-auto">
										<h2 className="col-10">Liked Tracks</h2>
										<div className="row">
											{likedTracks.tracks.map((track) => (
												<div
													className="col-lg-2 col-3 border-solid cur mt-2"
													onClick={(e) => {
														e.preventDefault();
														navigate(`/tracks/${track.id}`);
													}}>
													<div className="follower-icon rounded-circle d-flex justify-content-center align-items-center card">
														<img
															className="track-img card-img"
															src={track.album.images[0].url}
															alt=""
														/>
													</div>
													<div className="w-100 d-flex justify-content-center align-items-center">
														<p className="d-none d-sm-block">
															{track.name.length > 13
																? track.name.substring(0, 11) + "..."
																: track.name}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								{likedAlbums.length === 0 ? (
									""
								) : (
									<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3 mx-auto">
										<h2 className="col-10">Liked Albums and Playlists</h2>
										<div className="row">
											{likedAlbums.map((album) => (
												<div
													className="col-lg-2 col-3 border-solid cur mt-2"
													onClick={(e) => {
														e.preventDefault();
														if (album.type === "album") {
															navigate(`/albums/${album.id}`);
														} else {
															navigate(`/playlists/${album.id}`);
														}
													}}>
													<div className="rounded-circle d-flex justify-content-center align-items-center card">
														{album.type === "album" ? (
															<img
																className="track-img card-img"
																src={album.images[0].url}
																alt=""
															/>
														) : (
															<img
																className="playlist-img"
																src={album.images[0].url}
																alt=""
															/>
														)}
													</div>
													<div className="w-100 d-flex justify-content-center align-items-center">
														<p className="d-none d-sm-block">
															{album.name.length > 13
																? album.name.substring(0, 13) + "..."
																: album.name}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3 mx-auto">
									<h2 id="followers" className="col-10">
										Followers
									</h2>
									<div className="row">
										{userProfileFollowersList.map((follower) => (
											<div
												className="col-lg-2 col-3 border-solid"
												onClick={(e) => {
													e.preventDefault();
													e.preventDefault();
													if (
														follower._id !== currentUserCookies.currentUserId
													) {
														navigate(`/profile/${follower._id}`);
													} else {
														navigate(`/my-profile`);
													}
												}}>
												<div className="follower-icon rounded-circle d-flex justify-content-center align-items-center">
													<span className="bg-transparent">
														{" "}
														{follower.firstName.charAt(0).toUpperCase()}
														{follower.lastName.charAt(0).toUpperCase()}
													</span>
												</div>
												<div className="w-100 d-flex justify-content-center align-items-center">
													<p>
														{follower.firstName} {follower.lastName}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-5 mx-auto">
									<h2 className="col-10" id="following">
										Following
									</h2>
									<div className="row">
										{userProfileFollowingList.map((following) => (
											<div
												className="col-lg-2 col-3 border-solid"
												onClick={(e) => {
													e.preventDefault();
													if (
														following._id !== currentUserCookies.currentUserId
													) {
														navigate(`/profile/${following._id}`);
													} else {
														navigate(`/my-profile`);
													}
												}}>
												<div className="follower-icon rounded-circle d-flex justify-content-center align-items-center">
													<span className="bg-transparent">
														{" "}
														{following.firstName.charAt(0).toUpperCase()}
														{following.lastName.charAt(0).toUpperCase()}
													</span>
												</div>
												<div className="w-100 d-flex justify-content-center align-items-center">
													<p>
														{following.firstName} {following.lastName}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						) : (
							<>
							<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-5">
								<h1 className="text-white"> Popular Tracks </h1>
								<div> 
								<ul className="list-group">
									{topTracks.map((track, index) => (
									<li className="list-group-item cur" 
									onClick={(e) => {
										e.preventDefault();
										navigate(`/tracks/${track.id}`);
									}}
									key={index}>
										<div className="d-flex justify-content-between align-items-center row">
											<div className="col-2 card">
												<img src={track.album.images[0].url} className="track-img card-img"/>
											</div>
										<div className="col-8">
											<h5 className="mb-1">{track.name}</h5>
											<p className="mb-1 d-none d-lg-block">{track.artists.map((artist, index) => (
												index === track.artists.length - 1 ? artist.name : artist.name + ", "
											))}</p>
											<small className="d-none d-md-block">{track.album.name}</small>
										</div>
										<span className="badge badge-primary badge-pill col-1">#{track.popularity}</span>
										<span className="badge badge-primary badge-pill col-1">{msToMinSec(track.duration_ms)}</span>
										</div>
									</li>
									))}
								</ul>
								</div>
							</div>

							<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3 mx-auto">
										<h2 className="col-10">Top Albums</h2>
										<div className="row">
											{albums.map((album) => (
												<div
													className="col-lg-2 col-3 border-solid cur mt-2"
													onClick={(e) => {
														e.preventDefault();
														if (album.type === "album") {
															navigate(`/albums/${album.id}`);
														} else {
															navigate(`/playlists/${album.id}`);
														}
													}}>
													<div className="rounded-circle d-flex justify-content-center align-items-center card">
														{album.type === "album" ? (
															<img
																className="track-img card-img"
																src={album.images[0].url}
																alt=""
															/>
														) : (
															<img
																className="playlist-img"
																src={album.images[0].url}
																alt=""
															/>
														)}
													</div>
													<div className="w-100 d-flex justify-content-center align-items-center">
														<p className="d-none d-sm-block">
															{album.name.length > 13
																? album.name.substring(0, 13) + "..."
																: album.name}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListenerProfileComponent;
