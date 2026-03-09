import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/movies`;

const movieApi = {
    getTrending: async () => {
        const response = await axios.get(`${API_URL}/trending`);
        return response.data;
    },
    getPopular: async (type) => { // 'movie' or 'tv'
        const response = await axios.get(`${API_URL}/popular/${type}`);
        return response.data;
    },
    getDetails: async (type, id) => {
        const response = await axios.get(`${API_URL}/details/${type}/${id}`);
        return response.data;
    },
    search: async (type, query) => {
        const response = await axios.get(`${API_URL}/search/${type}?query=${query}`);
        return response.data;
    }
};

export default movieApi;
