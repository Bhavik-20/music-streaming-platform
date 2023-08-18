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
	getUserDataFollowingThunk,
	getUserDataFollowersThunk,
} from "../../../services/profile-thunks";
import Nav from "../../../nav-bar/Nav";
import { fetchItems, fetchTracks, fetchArtistAlbumsFromName } from "../../../spotify-hook/spotifyApi";

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
            const top5Albums = artist_albums.slice(0, 5); 
            setAlbums(top5Albums); 
            console.log("artist albums:", albums);
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
				<div className="col-2 mt-5">
					<Nav />
				</div>
				<div className="col-10">
					<div className="w-100 h-100 d-flex flex-column align-items-center">
						<div className="p-5 w-100 d-flex justify-content-center row nav-bar border-b border-solid">
							{/* <button
								className="col-1 back-btn"
								onClick={() => navigate("/home")}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="auto"
									viewBox="0 0 320 512">
									<path
										fill="currentColor"
										d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
									/>
								</svg>
							</button> */}
							<div className="col-2">
								<div className="profile-icon rounded-circle d-flex justify-content-center align-items-center">
									<span className="bg-transparent"> {nameInitials}</span>
								</div>
							</div>
							<div className="col-1"> </div>
							<div className="col-9">
								<div className="profile-info text-white d-flex align-items-end">
									<div>
										<p className="text-sm"> Listener</p>

										<h1 className="green-color bg-transparent listener-title">
											{userProfile.firstName} {userProfile.lastName} - @
											{userProfile.username}
										</h1>

										<p className="text-sm">
											{" "}
											<a href="#followers" className="text-white">
												{userProfile.followCount} Followers
											</a>{" "}
											.{" "}
											<a href="#following" className="text-white">
												{userProfile.followingCount} Following
											</a>{" "}
										</p>
									</div>
								</div>
							</div>
						</div>

						{userProfile._id !== undefined ? (
							<div className="col-sm-10 col-10 justify-content-left">
								<Button
									text={followButtonText}
									className="bg-transparent text-white border rounded px-4 py-2 mb-3"
									onClick={(e) => {
										e.preventDefault();
										followUser();
									}}
								/>
							</div>
						) : (
							<div></div>
						)}

						{userProfile.role === "listener" ? (
							<div>
								{likedTracks.length === 0 ? (
									""
								) : (
									<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3">
										<h2 className="col-10">Liked Tracks</h2>
										<div className="row">
											{likedTracks.tracks.map((track) => (
												<div
													className="col-lg-2 col-3 border-solid cur mb-5"
													onClick={(e) => {
														e.preventDefault();
														navigate(`/tracks/${track.id}`);
													}}>
													<div className="follower-icon rounded-circle d-flex justify-content-center align-items-center">
														<img
															className="track-img"
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
									<div className="col-md-10 col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3">
										<h2 className="col-10">Liked Albums and Playlists</h2>
										<div className="row">
											{likedAlbums.map((album) => (
												<div
													className="col-lg-2 col-3 border-solid cur mb-2"
													onClick={(e) => {
														e.preventDefault();
														if (album.type === "album") {
															navigate(`/albums/${album.id}`);
														} else {
															navigate(`/playlists/${album.id}`);
														}
													}}>
													<div className="rounded-circle d-flex justify-content-center align-items-center">
														{album.type === "album" ? (
															<img
																className="track-img"
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

								<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3">
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

								<div className="col-sm-10 col-10 p-5 border rounded border-solid text-white mb-5">
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
							<div>
								<h1 className="text-white"> Artist Content </h1>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListenerProfileComponent;
