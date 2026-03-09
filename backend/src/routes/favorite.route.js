const express = require('express');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favorite.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect); // Protect all routes in this file

router.route('/')
    .get(getFavorites)
    .post(addFavorite);

router.delete('/:movieId', removeFavorite);

module.exports = router;
