const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['movie', 'tv'],
        required: true,
    },
    title: {
        type: String,
    },
    poster: {
        type: String,
    },
    watchedAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for efficient querying of user's history ordered by time
historySchema.index({ user: 1, watchedAt: -1 });

module.exports = mongoose.model('History', historySchema);
