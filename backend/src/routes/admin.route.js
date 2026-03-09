const express = require('express');
const {
    addMovie,
    updateMovie,
    deleteMovie,
    getAllUsers,
    deleteUser
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes here require login and admin role
router.use(protect);
router.use(authorize('admin'));

// Custom Movie Management
router.post('/movies', addMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

// User Management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;
