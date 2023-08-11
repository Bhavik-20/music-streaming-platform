import axios from 'axios';
const ADMIN_API = 'http://localhost:8000/admin';

export const getUsersList = async () => {
    const response = await axios.get(`${ADMIN_API}/users`);
    return response.data;
};