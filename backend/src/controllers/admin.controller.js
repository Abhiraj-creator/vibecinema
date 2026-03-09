const Movie = require('../models/movie.model');
const User = require('../models/user.model');

// --- Movie Management ---

// @desc    Add custom movie
// @route   POST /api/admin/movies
// @access  Private/Admin
exports.addMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update custom movie
// @route   PUT /api/admin/movies/:id
// @access  Private/Admin
exports.updateMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete custom movie
// @route   DELETE /api/admin/movies/:id
// @access  Private/Admin
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- User Management ---

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
