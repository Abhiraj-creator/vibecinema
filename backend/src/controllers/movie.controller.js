const { fetchFromTMDB } = require('../services/tmdb.service');

// @desc    Get Trending Movies
// @route   GET /api/movies/trending
// @access  Public
exports.getTrendingMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB('/trending/movie/day');
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Popular Movies/TV
// @route   GET /api/movies/popular/:type
// @access  Public
exports.getPopular = async (req, res) => {
    const { type } = req.params; // 'movie' or 'tv'
    try {
        const data = await fetchFromTMDB(`/${type}/popular`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Movie/TV Details
// @route   GET /api/movies/details/:type/:id
// @access  Public
exports.getDetails = async (req, res) => {
    const { type, id } = req.params;
    try {
        const data = await fetchFromTMDB(`/${type}/${id}?append_to_response=videos,credits,similar,images`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Search Movie/TV/Person
// @route   GET /api/movies/search/:type
// @access  Public
exports.search = async (req, res) => {
    const { type } = req.params;
    const { query } = req.query;
    try {
        const data = await fetchFromTMDB(`/search/${type}?query=${query}`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
