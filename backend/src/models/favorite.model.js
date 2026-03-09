const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Compound index to ensure a user can't favorite the same movie twice
favoriteSchema.index({ user: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
