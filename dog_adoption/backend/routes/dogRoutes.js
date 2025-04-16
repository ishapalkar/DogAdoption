const express = require('express');
const router = express.Router();
const { getDogs, addDog, updateDog, deleteDog } = require('../controllers/dogController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route to view dogs
router.get('/', getDogs);

// Protected routes to add, update, or delete dogs
router.post('/', authMiddleware, addDog);
router.put('/:id', authMiddleware, updateDog);
router.delete('/:id', authMiddleware, deleteDog);

module.exports = router;
