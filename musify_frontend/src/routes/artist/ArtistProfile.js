import TextInput from "../../components/shared/TextInput";
import DropDown from "../../components/shared/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { editProfilePOSTRequest, makeUserDataPOSTRequest } from "../../utils/serverHelpers";
import Button from "../../components/shared/Button";
import { fetchArtistAlbumsFromName } from "../../spotify-hook/spotifyApi";

const ArtistProfileComponent = () => {
    const navigate = useNavigate(); 
    const [albums, setAlbums] = useState([]);

    const fetchAlbums = async () => {
        try {
            const artist_albums = await fetchArtistAlbumsFromName("Taylor Swift"); 
            const top5Albums = artist_albums.slice(0, 5); 
            setAlbums(top5Albums); 
            console.log("artist albums:", albums);
        } catch (error) {
            console.log("loadContent Error: ", error);
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);
    return (

        <div className="w-100 h-100 d-flex flex-column align-items-center">
            <div className="p-5 w-100 d-flex justify-content-center row nav-bar border-b border-solid artist-banner">
                <button className="col-1 text-white back-btn" onClick={() => navigate('/home')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="auto" viewBox="0 0 320 512"><path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </button>
                
                <div className="col-9 h-50">
                    <div className="w-100 artist-profile-info text-white d-flex align-items-end">
                        <div>
                        <div className="row"> 
                        {/* <span className="col-1 verified"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill="currentColor" d="M8.38 14.72h-.71L6 13H3.53L3 12.5v-2.42L1.31 8.36v-.71L3 5.93V3.5l.53-.5H6l1.67-1.71h.71L10.1 3h2.43l.5.49v2.44l1.71 1.72v.71L13 10.08v2.42l-.5.5h-2.4l-1.72 1.72Zm-1.65-4.24h.71l3.77-3.77L10.5 6L7.09 9.42L5.71 8.04L5 8.75l1.73 1.73Z"/></svg></span> */}
                            <i class="verified col-1 bi bi-patch-check-fill text-primary"></i>
                            <p className="col-11 pt-2 text-white font-weight-bold"> Verified Artist</p>
                        </div>
                        <span className="artist-title bg-transparent">Taylor Swift</span>

                        <p className="text-sm font-weight-bold"> 1625793097 monthly listeners </p>
                        {/* change follow to unfollow if following */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8 col-sm-10 col-10 mx-auto justify-content-left">
                <Button text="Follow" className="bg-transparent text-white border rounded px-4 py-2 mt-3 mb-3" onClick={(e) => { }} />
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
            <h2 className="col-10">Top Albums</h2>
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

export default ArtistProfileComponent;