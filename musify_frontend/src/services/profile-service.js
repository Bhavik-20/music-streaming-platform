import axios from 'axios';
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const PROFILE_API = `${SERVER_API_URL}/profile`;

export const deleteProfile = async (user_id) => {
    const body = {user_id};
    const response = await axios.post(`${PROFILE_API}/deleteProfile`, body);
    return response.data;
};

export const getProfile = async (token) => {
    const body = {token};
    const response = await axios.post(`${PROFILE_API}/getProfile`, body);
    return response.data;
};

export const getSearchedProfile = async (pid) => {
    // console.log("getProfile Service: ", pid);
    // const body = {pid};
    const response = await axios.get(`${PROFILE_API}/getSearchedProfile/${pid}`);
    return response.data;
};

export const followUser = async (token, pid) => {
    console.log("followUser Service: ", token, pid);
    const response = await axios.post(`${PROFILE_API}/followUser`, {token, pid});
    return response.data;
}

export const updateProfile = async(profile) => {
    const body = {profile};
    const response = await axios.put(`${PROFILE_API}/update-profile`, body);
    return response.data;
};

export const getUserDataFollowing = async (user_id) => {
    const body = {user_id};
    const response = await axios.post(`${PROFILE_API}/user-data-following`, body);
    return response.data;
}

export const getUserDataFollowers = async (user_id) => {
    const body = {user_id};
    const response = await axios.post(`${PROFILE_API}/user-data-followers`, body);
    return response.data;
}