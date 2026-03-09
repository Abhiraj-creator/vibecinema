const History = require('../models/history.model');

// @desc    Add movie to watch history
// @route   POST /api/history
// @access  Private
exports.addHistory = async (req, res) => {
    try {
        const { movieId, type, title, poster } = req.body;

        // Optionally update existing entry instead of creating new ones if watched recently
        // For simplicity, we just create a new record of the "event"
        const history = await History.create({
            user: req.user.id,
            movieId,
            type,
            title,
            poster
        });

        res.status(201).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user watch history
// @route   GET /api/history
// @access  Private
exports.getHistory = async (req, res) => {
    try {
        const history = await History.find({ user: req.user.id }).sort({ watchedAt: -1 });
        res.status(200).json({ success: true, count: history.length, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a specific history item
// @route   DELETE /api/history/:id
// @access  Private
exports.deleteHistoryItem = async (req, res) => {
    try {
        const history = await History.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!history) {
            return res.status(404).json({ success: false, message: 'History item not found' });
        }

        res.status(200).json({ success: true, message: 'History item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
