import axios from 'axios';
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const SONG_API = `${SERVER_API_URL}/songs`;

export const likeSong = async (currentUserId, songId) => {
    const body = {currentUserId, songId};
    console.log("likeSong service: ", currentUserId, songId);
    const response = await axios.post(`${SONG_API}/like`, body);
    return response.data;
};


export const getLikedSongs = async (currentUserId) => {
    const body = {currentUserId};
    const response = await axios.post(`${SONG_API}/get-all-liked-songs`, body);
    return response.data;
};