import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getProfileThunk,
	getUserDataFollowingThunk,
	getUserDataFollowersThunk,
} from "../services/profile-thunks";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/shared/Button";
import { fetchItems, fetchTracks } from "../spotify-hook/spotifyApi";
import Nav from "../nav-bar/Nav";
import Musify from "../nav-bar/Musify";

const MyProfileComponent = () => {
	const [cookies, setCookie] = useCookies(["token"]);
	const [currentUserCookies, setCurrentUserCookies] = useCookies([
		"currentUserId",
	]);
	const profile = useSelector((state) => state.myProfile);
	const [userProfile, setProfile] = useState(profile.myProfile);
	const [userProfileFollowingList, setUserProfileFollowingList] = useState(
		profile.userDataFollowing
	);
	const [userProfileFollowersList, setUserProfileFollowersList] = useState(
		profile.userDataFollowers
	);
	const [nameInitials, setNameInitials] = useState("");
	const [likedTracks, setLikedTracks] = useState([]);
	const [likedAlbums, setLikedAlbums] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loadProfile = async () => {
		try {
			const { payload } = await dispatch(getProfileThunk(cookies.token));
			setProfile(payload);
			setNameInitials(payload.firstName.charAt(0) + payload.lastName.charAt(0));

			const followingList = await dispatch(
				getUserDataFollowingThunk(currentUserCookies.currentUserId)
			);
			setUserProfileFollowingList(followingList.payload);

			const followerList = await dispatch(
				getUserDataFollowersThunk(currentUserCookies.currentUserId)
			);
			setUserProfileFollowersList(followerList.payload);

			const liked_tracks = await fetchTracks(payload.likedSongs);
			setLikedTracks(liked_tracks);
			console.log(liked_tracks);

			const liked_albums = await fetchItems(payload.likedAlbums);
			setLikedAlbums(liked_albums);
			console.log(liked_albums);
		} catch (error) {
			console.log("loadProfile Error: ", error);
		}
	};

	useEffect(() => {
		loadProfile();
	}, []);

	return (
		<div className="container-fluid bg-black mt-3">
			<div className="row">
				<div className="col-2">
					<Musify />
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
							<div className="col-1"></div>
							<div className="col-9">
								<div className="profile-info text-white d-flex align-items-end">
									<div>
										<p className="text-sm"> Listener</p>

										<h1 className="green-color bg-transparent listener-title">
											{userProfile.firstName} {userProfile.lastName} - @
											{userProfile.username}
										</h1>

										<p className="text-sm">
											<a href="#followers" className="text-white">{userProfile.followCount} Followers</a> .{" "}
											<a href="#following" className="text-white">{userProfile.followingCount} Following</a>{" "}
										</p>
										{/* change follow to unfollow if following */}
									</div>
								</div>
							</div>
						</div>

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
											<p className="d-none d-sm-block">{(track.name.length > 13) ? track.name.substring(0, 11) + "..." : track.name}</p>
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
													/>) : (
													<img
														className="playlist-img"
														src={album.images[0].url}
														alt=""
													/>
												)}

											</div>
											<div className="w-100 d-flex justify-content-center align-items-center">
												<p className="d-none d-sm-block">{(album.name.length > 13) ? album.name.substring(0, 13) + "..." : album.name}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{userProfile.followCount == 0 ? (
							""
						) : (
							<div className="col-md-10 col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3">
								<h2 className="col-10" id="followers">Followers</h2>
								<div className="row">
									{userProfileFollowersList.map((follower) => (
										<div
											className="col-lg-2 col-3 border-solid cur"
											onClick={(e) => {
												e.preventDefault();
												navigate(`/profile/${follower._id}`);
											}}>
											<div className="follower-icon rounded-circle d-flex justify-content-center align-items-center">
												<span className="bg-transparent">
													{" "}
													{follower.firstName.charAt(0).toUpperCase()}
													{follower.lastName.charAt(0).toUpperCase()}
												</span>
											</div>
											<div className="w-100 d-flex justify-content-center align-items-center">
												<p className="d-none d-sm-block">
													{follower.firstName} {follower.lastName}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						<div className="col-md-10 col-sm-10 col-10 p-5 border rounded border-solid text-white mb-5">
							<h2 className="col-10" id="following">Following</h2>
							<div className="row">
								{userProfile.followingCount == 0 ? (
									<div className="w-100 d-flex justify-content-center align-items-center">
										<Button
											text="Search Users"
											className="green-btn"
											onClick={(e) => {
												e.preventDefault();
												navigate("/search-users");
											}}>
											{" "}
										</Button>
									</div>
								) : (
									userProfileFollowingList.map((following) => (
										<div
											className="col-lg-2 col-3 border-solid cur"
											onClick={(e) => {
												e.preventDefault();
												navigate(`/profile/${following._id}`);
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
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfileComponent;
