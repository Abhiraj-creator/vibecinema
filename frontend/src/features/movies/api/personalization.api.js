import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api`;

const personalizationApi = {
    // Favorites
    getFavorites: async (token) => {
        const response = await axios.get(`${API_URL}/favorites`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    addFavorite: async (movieData, token) => {
        const response = await axios.post(`${API_URL}/favorites`, movieData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    removeFavorite: async (movieId, token) => {
        const response = await axios.delete(`${API_URL}/favorites/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    // History
    getHistory: async (token) => {
        const response = await axios.get(`${API_URL}/history`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    addHistory: async (movieData, token) => {
        const response = await axios.post(`${API_URL}/history`, movieData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    deleteHistoryItem: async (historyId, token) => {
        const response = await axios.delete(`${API_URL}/history/${historyId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export default personalizationApi;
