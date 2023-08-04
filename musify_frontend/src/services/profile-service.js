import axios from 'axios';
const PROFILE_API = 'http://localhost:8000/profile/getProfile';

export const getProfile = async (token) => {
    console.log("getProfile Service: ", token);
    const body = {token};
    const response = await axios.post(PROFILE_API, body);
    return response.data;
};