import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Button from "../../components/shared/Button";
import { getProfileThunk } from "../../services/profile-thunks";
import { useCookies } from "react-cookie";
import ListenerProfileDataComponent from "./listener-profile-data";

const ListenerProfileComponent = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const { profile } = useSelector((state) => state.profile);
    console.log("Profile: ", profile);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileThunk(cookies.token));
    }, []);
    return (

        <div className="w-100 h-100 d-flex flex-column align-items-center">
            <ListenerProfileDataComponent user={profile}/>

            <div className="col-md-8 col-sm-10 col-10 justify-content-left">
                <button className="text-white m-4 border border-solid rounded-3xl px-4 py-2">Follow</button>
                {/* <Button text="Follow" className="bg-transparent text-white border rounded" onClick={(e) => { }} /> */}
            </div>

            <div className="col-md-8 col-sm-10 col-10 p-5 border rounded-xl border-solid border-gray-300 text-white ">
                <span className="text-2xl font-bold mb-5">Public Playlists</span>
                <div className="row">
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>

            <div className="col-md-8 col-sm-10 col-10 mt-4 p-5 border rounded-xl border-solid border-gray-300 text-white ">
                <span className="text-2xl font-bold mb-5">Followers</span>
                <div className="row">
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>

            <div className="col-md-8 col-sm-10 col-10 mt-4 p-5 border rounded-xl border-solid border-gray-300 text-white ">
                <span className="text-2xl font-bold mb-5">Following</span>
                <div className="row">
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                <div className="col-2 border-solid border-gray-300">
                    <div className="h-20 bg-white"></div>
                    <p>Taylor Swift</p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ListenerProfileComponent;