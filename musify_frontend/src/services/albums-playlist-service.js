import axios from 'axios';
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const ALBUMS_API = `${SERVER_API_URL}/albumsPlaylist`;

export const likeAlbumsPlaylist = async (currentUserId, albumId) => {
    const body = {currentUserId, albumId};
    console.log("likeAlbumsPlaylist service: ", currentUserId, albumId);
    const response = await axios.post(`${ALBUMS_API}/like`, body);
    return response.data;
};


export const getlikedAlbumsPlaylist = async (currentUserId) => {
    const body = {currentUserId};
    const response = await axios.post(`${ALBUMS_API}/get-all-liked-albums`, body);
    return response.data;
};