import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersThunk } from "../services/user-search-thunk";
import TextInput from "../components/shared/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Nav from "../nav-bar/Nav";
import Musify from "../nav-bar/Musify";

const SearchUsers = () => {
	const { usersList } = useSelector((state) => state.userSearch);
	const [searchText, setSearchText] = useState("");
	const [results, setResults] = useState(usersList);

	const [cookies] = useCookies(["token"]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loadUsers = async () => {
		try {
			const { payload } = await dispatch(
				getUsersThunk({ search: searchText, token: cookies.token })
			);
			sessionStorage.setItem("searchText", searchText);
  			sessionStorage.setItem("searchResults", JSON.stringify(payload));
			setResults(payload);
		} catch (error) {
			console.log("loadUsers Error: ", error);
		}
	};

	useEffect(() => {
		const savedSearchTerm = sessionStorage.getItem("searchText");
		const savedResults = JSON.parse(sessionStorage.getItem("searchResults"));

		if (savedSearchTerm && savedResults) {
			setSearchText(savedSearchTerm);
			setResults(savedResults);
		}
	}, []);

	useEffect(() => {
		
		loadUsers();
	}, [results, searchText]);

	return (
		<div className="container-fluid bg-black mt-3">
			<div className="row">
				<div className="col-2">
					<Musify />
					<Nav />
				</div>
				<div className="col-10">
					<div className="w-100 h-100 flex flex-col items-center nav-bar">
						{/* <div className="p-5 w-100 d-flex justify-content-center">
							<i class="musify-icon bi bi-music-note-beamed"></i>
							<h1 className="musify">Musify</h1>
						</div> */}
						<div className="col-xl-7 col-md-10 col-sm-12 mx-auto center-bordered-block">
							<div className="w-100 font-bold mb-4 row">
								{/* <button
									className="back-btn col-2"
									onClick={() => navigate("/home")}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="100"
										viewBox="0 0 320 512">
										<path
											fill="currentColor"
											d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
										/>
									</svg>
								</button> */}
								<h1 className="p-4 green-color d-flex justify-content-center">
									Search Users
								</h1>
							</div>
							<div>
								<TextInput
									label=""
									placeholder="Search users by username"
									className="my-6"
									value={searchText}
									setValue={setSearchText}>
									{" "}
								</TextInput>
								<br></br>

								{results && results.length > 0 ? (
									results.map((user, index) => (
										<div>
											<div
												className="w-100 px-10 rounded text-white bg-transparent m-1 row cur list-item"
												onClick={(e) => {
													e.preventDefault();
													navigate(`/profile/${user._id}`);
												}}>
												<div className="col-2 profile-pic d-flex justify-content-center align-items-center">
													<span className="bg-transparent">
														{user.firstName.charAt(0).toUpperCase() +
															user.lastName.charAt(0).toUpperCase()}
													</span>
												</div>
												<div className="col-10 ps-4">
													<span className="d-flex justify-content-left user-profile-info">
														<p className="me-2">
															{user.firstName} {user.lastName}
														</p>{" "}
														@{user.username}
														{user.role === "artist-verified" ? (
															<i className="bi bi-patch-check-fill text-info ms-2 me-2"></i>
														) : (
															<></>
														)}
														- {user.followingCount} Following .{" "}
														{user.followCount} Followers
													</span>
													<span className="user-profile-info">
														Email: {user.email}
													</span>{" "}
													<br></br>
													<span className="user-profile-info">
														Role:{" "}
														{user.role == "artist-verified"
															? "verified artist"
															: user.role == "listener"
															? "listener"
															: "artist"}{" "}
													</span>
												</div>
											</div>
										</div>
									))
								) : (
									<div className="text-white text-center text-2xl">
										No users found
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchUsers;
