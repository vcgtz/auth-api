const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth');
const { validationResults } = require('../middlewares/validations');

const router = express.Router();

router.post(
  '/login',
  [
    check('email').notEmpty().withMessage('The email is required'),
    check('email').isEmail().withMessage('The email must be valid'),
    check('password').notEmpty().withMessage('The password is required'),
    validationResults,
  ],
  authController.login
);

module.exports = router;
