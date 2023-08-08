import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk, updateProfileThunk} from "../../services/profile-thunks";
import EditProfileDataComponent from "./edit-profile-data";

const EditProfileComponent = () => {
	const [cookies, setCookie] = useCookies(["token"]);
	const navigate = useNavigate();

	const roleOptions = [
		{ value: "artist", label: "Artist" },
		{ value: "listener", label: "Listener" },
	];

	const { editProfile } = useSelector((state) => state.editProfile);

	const dispatch = useDispatch();

	const loadProfile = async () => {
		console.log("loadProfile");
		try {
			const { payload } = await dispatch(getProfileThunk(cookies.token));
			console.log("loadProfile Payload: ", payload);
		} catch (error) {
			console.log("loadProfile Error: ", error);
		}
	};

	useEffect(() => {
		console.log("Edit Profile Component");
		loadProfile();
	}, []);

	return (
		<div className="w-full h-full flex flex-col items-center nav-bar">
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
					<h1 className="p-4 col-10 green-color d-flex justify-content-center">Edit Profile</h1>
				</div>

				<EditProfileDataComponent user={editProfile} />
				
			</div>
		</div>
	);
};

export default EditProfileComponent;
