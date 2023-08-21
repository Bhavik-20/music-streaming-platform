import axios from 'axios';
const ALBUMS_API = 'http://localhost:8000/albumsPlaylist';

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