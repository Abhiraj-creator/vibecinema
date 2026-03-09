const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    poster: {
        type: String, // URL
    },
    description: {
        type: String,
    },
    movieID: {
        type: String, // TMDB ID if it's a copy, or custom ID
    },
    releaseDate: {
        type: String,
    },
    trailerLink: {
        type: String,
    },
    genre: {
        type: [String],
    },
    category: {
        type: String,
        enum: ['movie', 'tv'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Movie', movieSchema);
