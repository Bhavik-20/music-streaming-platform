import { useEffect, useState } from "react";
import { getUsersThunk } from "../services/user-search-thunk";
import TextInput from "../components/shared/TextInput";
import { useDispatch, useSelector } from "react-redux";

const SearchUsers = () => {
    const {usersList} = useSelector((state) => state.userSearch);
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState(usersList);
    console.log("SearchUsers: ", usersList, "results: ", results);
    const dispatch = useDispatch();

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
        <div>
            <TextInput
                label="Search"
                placeholder="Search users by username"
                className="my-6"
                value={searchText}
                setValue={setSearchText}
            />
            {results && results.length > 0 ? (
                results.map((user, index) => (
                    <div className="text-danger text-center text-2xl">{user.username}</div>

                ))
            ): 
            (
                <div className="text-danger text-center text-2xl">No users found</div>
            )}

        </div>
    );
};

export default SearchUsers;