const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users');
const { validationResults } = require('../middlewares/validations');
const User = require('../models/user');

const router = express.Router();

router.get('/', usersController.index);

router.post('/', [
  check('name').notEmpty().withMessage('The name is required'),
  check('lastName').notEmpty().withMessage('The lastname is required'),
  check('email').notEmpty().withMessage('The email is required'),
  check('password').notEmpty().withMessage('The password is required'),
  check('email').custom(async (value) => {
    const user = await User.findOne({ email: value }).exec();

    if (user) {
      throw new Error('The email already exists');
    }
  }),
  validationResults,
], usersController.store);

router.get('/:id', usersController.show);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.destroy);

module.exports = router;
