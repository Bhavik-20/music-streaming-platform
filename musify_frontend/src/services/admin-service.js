import axios from 'axios';
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const ADMIN_API = `${SERVER_API_URL}/admin`;

export const getUsersList = async () => {
    const response = await axios.get(`${ADMIN_API}/users`);
    return response.data;
};

export const verifyArtist = async (id) => {
    const body = {id};
    const response = await axios.put(`${ADMIN_API}/verify-artist`, body);
    return response.data;
}

export const ignoreVerification = async (id) => {
    const body = {id};
    const response = await axios.put(`${ADMIN_API}/ignore-verify-artist`, body);
    return response.data;
}