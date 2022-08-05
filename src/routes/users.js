const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.index);
router.post('/', usersController.store);
router.get('/:id', usersController.show);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;
