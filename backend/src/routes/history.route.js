const express = require('express');
const { addHistory, getHistory, deleteHistoryItem } = require('../controllers/history.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect); // Protect all routes in this file

router.route('/')
    .get(getHistory)
    .post(addHistory);

router.delete('/:id', deleteHistoryItem);

module.exports = router;
