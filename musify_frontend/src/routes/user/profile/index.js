import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/Button";
import { getSearchedProfileThunk } from "../../../services/profile-thunks";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from 'react-router-dom';

const ListenerProfileComponent = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const { profile } = useSelector((state) => state.profile);
    const [userProfile, setProfile] = useState(profile);
    const [nameInitials, setNameInitials] = useState("");
    const {pid} = useParams();

    console.log("Profile: ", profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadProfile = async () => {
		try {
			const { payload } = await dispatch(getSearchedProfileThunk(pid));
			setProfile(payload);
            setNameInitials(payload.firstName.charAt(0) + payload.lastName.charAt(0));
			console.log("loadProfile Payload: ", payload);
		} catch (error) {
			console.log("loadProfile Error: ", error);
		}
	};

    useEffect(() => {
        console.log("useEffect: ", profile);
        loadProfile();
    }, []);

    return (

        <div className="w-100 h-100 d-flex flex-column align-items-center">
            {/* <ListenerProfileDataComponent user={profile}/> */}

            <div className="p-5 w-100 d-flex justify-content-center row nav-bar border-b border-solid">
                <button className="col-1 back-btn" onClick={() => navigate('/search-users')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="auto" viewBox="0 0 320 512"><path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </button>
                <div className="col-2">
                    <div className="profile-icon rounded-circle d-flex justify-content-center align-items-center"> 
                        <span className= "font-bold bg-transparent"> {nameInitials}</span>
                    </div>
                </div>
                <div className="col-9">
                    <div className="profile-info text-white d-flex align-items-end">
                        <div>
                        <p className="text-sm"> Listener</p>

                        <h1 className="green-color bg-transparent listener-title">{userProfile.firstName}</h1>

                        <p className="text-sm"> 1 Public Playlist . 1 Follower . 4 Following </p>
                        {/* change follow to unfollow if following */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-8 col-sm-10 col-10 justify-content-left">
                {/* <button className="text-white m-4 border border-solid rounded-3xl px-4 py-2">Follow</button> */}
                <Button text="Follow" className="bg-transparent text-white border rounded px-4 py-2 mb-3" onClick={(e) => { 
                    e.preventDefault();
                }} />
            </div>

            <div className="col-md-8 col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3">
            <h2 className="col-10">Public Playlist</h2>
                <div className="row">
                <div className="col-2 border-solid rounded">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>

            <div className="col-md-8 col-sm-10 col-10 p-5 border rounded border-solid text-white mb-3">
            <h2 className="col-10">Following</h2>
                <div className="row">
                <div className="col-2 border-solid rounded">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>

            <div className="col-md-8 col-sm-10 col-10 p-5 border rounded border-solid text-white mb-5">
            <h2 className="col-10">Followers</h2>
                <div className="row">
                <div className="col-2 border-solid rounded">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-50 bg-dark"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ListenerProfileComponent;