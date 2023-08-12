import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersThunk } from "../services/user-search-thunk";
import TextInput from "../components/shared/TextInput";
import { useDispatch, useSelector } from "react-redux";

const SearchUsers = () => {
    const {usersList} = useSelector((state) => state.userSearch);
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState(usersList);
    console.log("SearchUsers: ", usersList, "results: ", results);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadUsers = async () => {
        try {
            const { payload } = await dispatch(getUsersThunk(searchText));
            setResults(payload);
        } catch (error) {
            console.log("loadUsers Error: ", error);
        }
    };

    useEffect(() => {
		loadUsers();
	}, [results, searchText]);

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
						Search Users
					</h1>
				</div>
                <div>
                    <TextInput
                        label=""
                        placeholder="Search users by username"
                        className="my-6"
                        value={searchText}
                        setValue={setSearchText}
                    />
                    <br></br>

                    {results && results.length > 0 ? (
                        results.map((user, index) => (
                            <div className="text-white text-center text-2xl">
                                <button 
                                className="bg-green-400 font-semibold p-3 px-10 rounded-full" 
                                onClick={(e) => { e.preventDefault();
                                    navigate(`/profile/${user._id}`);}}>
                                    {user.username}
                                </button>  
                            </div>
                        ))
                    ): 
                    (
                        <div className="text-white text-center text-2xl">No users found</div>
                    )}
                </div>
                </div>
        </div>
    );
};

export default SearchUsers;