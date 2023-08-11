// backend api - frontend service - thunk - reducer - page

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getUsersListThunk,
} from "../../services/admin-thunk";

const AdminHomeComponent = () => {
    const { usersList } = useSelector((state) => state.admin);
    const [listUsers, setListUsers] = useState(usersList);

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

    useEffect(() => {
		loadAdminPage();
	}, []);

    return (

        <div className="w-100 h-100 flex flex-col items-center nav-bar" >
            <span className="pe-5 pt-2 d-flex justify-content-end admin-stamp"><i className="bi bi-person-circle"> Admin | <a href="/login">Logout</a></i> </span>
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
            {usersList.map((user, index) => (
                <div className="border rounded border-solid list-item mb-3 row">
                    <div className="col-1">
                        <div className="profile-pic"> </div>
                    </div>
                    <div className="col-8 ps-4">
                        <span className="d-flex justify-content-left user-profile-info"> <p className="me-2">{user.firstName} {user.lastName}</p> @{user.username} - 1 public playlist . 234 Following . 234 Followers</span>
                        <span className="user-profile-info">Email: {user.email}</span>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success req-btn me-3">Accept</button>
                        <button className="btn btn-danger req-btn">Delete</button>
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
}

export default AdminHomeComponent;