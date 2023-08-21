import axios from 'axios';
const USER_SEARCH_API = 'http://localhost:8000/user-info';

export const getUsers = async (search, token) => {
    const response = await axios.get(`${USER_SEARCH_API}/search?searchTerm=${search}&token=${token}`);
    return response.data;
};
