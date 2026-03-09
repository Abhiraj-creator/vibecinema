const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health Check Route
app.get('/', (req, res) => {
    res.send('Movie Platform API is running...');
});

// Import Routes
const authRoutes = require('./src/routes/auth.route');
const movieRoutes = require('./src/routes/movie.route');
const favoriteRoutes = require('./src/routes/favorite.route');
const historyRoutes = require('./src/routes/history.route');
const adminRoutes = require('./src/routes/admin.route');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
