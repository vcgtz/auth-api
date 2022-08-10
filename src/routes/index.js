const express = require('express');
const userRoutes = require('./users');
const authRoutes = require('./auth');

const router = express.Router();

router.get('/', (req, res) => res.json({ status: 'ok' }));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
