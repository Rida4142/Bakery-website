const express = require('express');
const router = express.Router();
const { login, createAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/create-admin', createAdmin);
router.get('/me', protect, getMe);

module.exports = router;