const axios = require('axios');
const https = require('https');

const TMDB_BASE_URL = 'https://api.tmdb.org/3';

exports.fetchFromTMDB = async (url) => {
    const token = process.env.TMDB_API_READ_ACCESS_TOKEN;
    const apiKey = process.env.TMDB_API_KEY;

    // Force IPv4 using family: 4 to resolve connectivity issues common with some ISPs 
    // where IPv6 routing to TMDB servers is broken/throttled.
    const agent = new https.Agent({
        family: 4
    });

    const [path, queryString] = url.split('?');
    const urlParams = new URLSearchParams(queryString || '');

    const options = {
        method: 'GET',
        url: `${TMDB_BASE_URL}${path}`,
        httpsAgent: agent,
        timeout: 30000,
        headers: {
            accept: 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        },
        params: {
            ...Object.fromEntries(urlParams),
            ...(!token ? { api_key: apiKey } : {})
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('TMDB API Error Response:', error.response.data);
            throw new Error(error.response.data.status_message || 'Failed to fetch data from TMDB');
        } else {
            console.error('TMDB API Error:', error.message);
            throw new Error('Network error: TMDB is unreachable or request timed out. Please check if your ISP is blocking api.themoviedb.org');
        }
    }
};
