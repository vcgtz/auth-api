const express = require('express');
const userRoutes = require('./users');

const router = express.Router();

router.get('/', (req, res) => res.json({ status: 'ok' }));

router.use('/users', userRoutes);

module.exports = router;
