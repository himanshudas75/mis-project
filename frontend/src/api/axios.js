import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default axios.create({
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    baseURL: BASE_URL,
});
