const Favorite = require('../models/favorite.model');

// @desc    Add movie to favorites
// @route   POST /api/favorites
// @access  Private
exports.addFavorite = async (req, res) => {
    try {
        const { movieId, type, title, poster } = req.body;

        // Check if already in favorites
        const existing = await Favorite.findOne({ user: req.user.id, movieId });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Already in favorites' });
        }

        const favorite = await Favorite.create({
            user: req.user.id,
            movieId,
            type,
            title,
            poster
        });

        res.status(201).json({ success: true, data: favorite });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: favorites.length, data: favorites });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Remove movie from favorites
// @route   DELETE /api/favorites/:movieId
// @access  Private
exports.removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({
            user: req.user.id,
            movieId: req.params.movieId
        });

        if (!favorite) {
            return res.status(404).json({ success: false, message: 'Favorite not found' });
        }

        res.status(200).json({ success: true, message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
