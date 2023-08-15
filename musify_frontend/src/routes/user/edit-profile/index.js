import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getProfileThunk,
	updateProfileThunk,
} from "../../../services/profile-thunks";
import ReadOnlyInput from '../../../components/shared/ReadOnlyInput';
import TextInput from "../../../components/shared/TextInput";
import Button from "../../../components/shared/Button";

const EditProfileComponent = () => {
	const [cookies, setCookie] = useCookies(["token"]);
	const { myProfile } = useSelector((state) => state.myProfile);
	const [profile, setProfile] = useState(myProfile);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const SaveProfileChanges = async () => {
		try {
			const response = await dispatch(
				updateProfileThunk(profile)
			);
			if (response.error) {
				alert("This Username already exists");
			} else {
				alert("Profile updated successfully");
				navigate("/home");
			}
		} catch (error) {
			alert("Error updating profile");
		}
	};

	const loadProfile = async () => {
		try {
			const { payload } = await dispatch(getProfileThunk(cookies.token));
			setProfile(payload);
			// console.log("loadProfile Payload: ", payload);
		} catch (error) {
			console.log("loadProfile Error: ", error);
		}
	};

	const handleUsernameChange = (newUsername) => {
		console.log("New Username:", newUsername); // You can perform any custom logic here
		setProfile({...profile, username: newUsername}); // Update the state with the new value
	};
	
	const handleFirstNameChange = (newFirstName) => {
		console.log("New Firstname:", newFirstName); // You can perform any custom logic here
		setProfile({...profile, firstName: newFirstName}); // Update the state with the new value
	};

	const handleLastNameChange = (newLastName) => {
		console.log("New LastName:", newLastName); // You can perform any custom logic here
		setProfile({...profile, lastName: newLastName}); // Update the state with the new value
	};
	

	useEffect(() => {
		loadProfile();
	}, []);

	return (
		<div className="w-100 h-100 flex flex-col items-center nav-bar">
			<div className="p-5 w-100 d-flex justify-content-center">
				<i class="musify-icon bi bi-music-note-beamed"></i>
				<h1 className="musify">Musify</h1>
			</div>
			<div className="col-xl-5 col-md-6 col-sm-10 col-10 mx-auto center-bordered-block">
				<div className="w-100 font-bold mb-4 d-flex justify-content-center">
					<button className="back-btn col-1" onClick={() => navigate("/home")}>
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
					</button>
					<h1 className="p-4 col-10 green-color d-flex justify-content-center">
						Edit Profile
					</h1>
				</div>

				{/* <EditProfileDataComponent user={editProfile} /> */}
				<div>
					<TextInput
						label="Username"
						placeholder="username"
						className="my-6"
						value={profile.username}
						setValue={handleUsernameChange}
					/>
					<br></br>
					<ReadOnlyInput
						label="Email address"
						className="my-6"
						value={profile.email}
					/>
					<br></br>
					<div className="grid grid-cols-2 gap-4">
						<TextInput
							label="First Name"
							placeholder="eg: Jane"
							className="my-6"
							value={profile.firstName}
							setValue={handleFirstNameChange}
						/>
						<br></br>
						<TextInput
							label="Last Name"
							placeholder="eg: Doe"
							className="my-6"
							value={profile.lastName}
							setValue={handleLastNameChange}
						/>
					</div>
					<br></br>
					<ReadOnlyInput
						label="Role"
						className="my-6"
						value={profile.role}
					/>
					<br></br>
					<div className="mb-3 d-flex justify-content-center">
						<Button
							text="Save Changes"
							className="green-btn"
							onClick={(e) => {
								e.preventDefault();
								SaveProfileChanges();
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfileComponent;
