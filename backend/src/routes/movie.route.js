const express = require('express');
const {
    getTrendingMovies,
    getPopular,
    getDetails,
    search
} = require('../controllers/movie.controller');

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/popular/:type', getPopular);
router.get('/details/:type/:id', getDetails);
router.get('/search/:type', search);

module.exports = router;
