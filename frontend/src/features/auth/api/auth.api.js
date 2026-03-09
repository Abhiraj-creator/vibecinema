import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/auth`;

const authApi = {
    signup: async (userData) => {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    },
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    },
    getProfile: async (token) => {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export default authApi;
