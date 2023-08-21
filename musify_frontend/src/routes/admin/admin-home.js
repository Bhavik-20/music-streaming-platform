// backend api - frontend service - thunk - reducer - page

import { useEffect, useState } from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getUsersListThunk, verifyArtistThunk, ignoreVerificationThunk} from "../../services/admin-thunk";

const AdminHomeComponent = () => {
    const { usersList } = useSelector((state) => state.admin);
    const [cookies, setCookie, removeCookie] = useCookies(["adminToken"]);
    const [listUsers, setListUsers] = useState(usersList);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loadAdminPage = async () => {
		try {
			const { payload } = await dispatch(getUsersListThunk());
			setListUsers(payload);
			console.log("admin page Payload: ", payload);
		} catch (error) {
			console.log("admin page Error: ", error);
		}
	};

    const verifyArtist = async (id) => {
        // update user role to verified artist
        try {
			const { payload } = await dispatch(verifyArtistThunk(id));
			setListUsers(payload);
			console.log("verifyArtist Payload: ", payload);
		} catch (error) {
			console.log("verifyArtist Error: ", error);
		}
    };

    const ignoreVerification = async (id) => {
        // update user role to artist
        try {
			const { payload } = await dispatch(ignoreVerificationThunk(id));
			setListUsers(payload);
			console.log("ignoreVerification Payload: ", payload);
		} catch (error) {
			console.log("ignoreVerification Error: ", error);
		}
    };

    const logout = async () => {
        console.log(cookies.adminToken);
        removeCookie("adminToken", { path: '/' });
        alert("Success");
        navigate("/admin");
    };

    useEffect(() => {
		loadAdminPage();
	}, []);

    return (

        <div className="w-100 h-100 flex flex-col items-center nav-bar" >
            <span className="pe-5 pt-2 d-flex justify-content-end admin-stamp">
            <i className="bi bi-person-circle"> Admin </i> <span className="ms-1 me-1">|</span>
            <button className="me-3 logout" 
            onClick={(e) => {
                e.preventDefault();
                logout();
            }}>
            <i className="bi bi-box-arrow-right me-2"></i>Log Out
            </button> 
            </span>
            <div className="w-100">
                <div className="p-1 d-flex justify-content-center">
                    <i class="musify-icon bi bi-music-note-beamed"></i>
                    <h1 className="musify">Musify</h1>
                </div>
            </div>

            <div className="col-lg-7 col-sm-10 col-10 mx-auto text-white">
                <h1 className="pb-2">
                    Users
                </h1>
            {listUsers.map((user, index) => (
                <div>
                <div 
                className="w-100 px-10 rounded border border-solid text-white bg-transparent m-1 row list-item" > 
                     <div className="col-1">
                        <div className="profile-pic d-flex justify-content-center align-items-center"> 
                            <span className="bg-transparent">{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="col-8 ps-4">
                        <span className="d-flex justify-content-left user-profile-info"> 
                            <p className="me-2">{user.firstName} {user.lastName}</p> @{user.username} 
                            {user.role === "artist" ? ( <i className="bi bi-x-circle text-warning ms-2 me-2"></i> ) : ( <></> )}
                            {user.role === "artist-verified" ? ( <i className="bi bi-patch-check-fill text-info ms-2 me-2"></i> ) : ( <></> )} - {user.followingCount} Following . {user.followCount} Followers</span>
                        <span className="user-profile-info">Email: {user.email}</span> <br></br>
                        <span className="user-profile-info">Role: {user.role}</span>
                    </div>
                    {user.role === "artist-pending" ? (
                            <div className="col-3">
                                <button className="btn btn-success req-btn me-3 mb-1" onClick={
                                    (e) => {
                                        e.preventDefault();
                                        verifyArtist(user._id);
                                    }
                                }>
                                    <span className="d-lg-none"><i className="bi-patch-check-fill"></i></span>
                                    <span className="d-none d-lg-block">Verify</span>
                                    </button>
                                <button className="btn btn-secondary req-btn" onClick={
                                    (e) => {
                                        e.preventDefault();
                                        ignoreVerification(user._id);
                                    }
                                }>
                                    <span className="d-lg-none"><i className="bi bi-x-circle"></i></span>
                                    <span className="d-none d-lg-block">Ignore</span>
                                    </button>
                            </div>
                        ) : (
                            <div className="col-3">
                            </div>
                        )}
                </div>  
            </div>
            ))}
            </div>

        </div>
    );
}

export default AdminHomeComponent;