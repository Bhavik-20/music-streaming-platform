import axios from 'axios';
const PROFILE_API = 'http://localhost:8000/profile';

export const getProfile = async (token) => {
    console.log("getProfile Service: ", token);
    const body = {token};
    const response = await axios.post(`${PROFILE_API}/getProfile`, body);
    return response.data;
};

export const getSearchedProfile = async (pid) => {
    // console.log("getProfile Service: ", pid);
    // const body = {pid};
    console.log("getProfile Service: ", `${PROFILE_API}/getSearchedProfile/${pid}`);
    const response = await axios.get(`${PROFILE_API}/getSearchedProfile/${pid}`);
    return response.data;
};

export const updateProfile = async(profile) => {
    console.log("updateProfile Service: ", profile);
    const body = {profile};
    const response = await axios.put(`${PROFILE_API}/update-profile`, body);
    return response.data;
};