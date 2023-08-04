import { Icon } from "@iconify/react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk } from "../../services/profile-thunks";
import EditProfileDataComponent from "./edit-profile-data";

const EditProfileComponent = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    // console.log("Edit Profile Component: ", cookies.token);

    const roleOptions = [
        { value: 'artist', label: 'Artist' },
        { value: 'listener', label: 'Listener' },
    ];

    const { editProfile } = useSelector((state) => state.editProfile);
    console.log("Edit Profile Component: ", editProfile);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileThunk(cookies.token));
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center nav-bar">
            <div className="p-5 w-full flex justify-center">
                <Icon icon="fxemoji:musicalnote" width="100" />
                <span className="text-green-300 text-5xl">Musify</span>
            </div>
            <div className="col-xl-7 col-md-8 col-sm-10 col-10 mt-4 p-5 flex flex-col border rounded-xl border-solid border-gray-300 ">
                <div className="text-green-300 font-bold text-5xl grid grid-cols-11">
                    <button onClick={() => navigate('/home')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" viewBox="0 0 320 512"><path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                    </button>
                    <h1 className="p-4 col-span-10">Edit Profile</h1>
                </div>
                
                <EditProfileDataComponent user={editProfile} />
            </div>
        </div>
    );
}

export default EditProfileComponent;