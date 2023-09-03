import axios from 'axios';
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USER_SEARCH_API = `${SERVER_API_URL}/user-info`;

export const getUsers = async (search, token) => {
    const response = await axios.get(`${USER_SEARCH_API}/search?searchTerm=${search}&token=${token}`);
    return response.data;
};
