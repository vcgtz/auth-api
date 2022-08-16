const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users');
const { validationResults } = require('../middlewares/validations');
const { validateJWT, validateRol } = require('../middlewares/auth');
const { existsEmail, existsId } = require('../helpers/validations');

const router = express.Router();

// router.get('/:page?', usersController.index);

router.post(
  '/',
  [
    check('name').notEmpty().withMessage('The name is required'),
    check('lastName').notEmpty().withMessage('The lastname is required'),
    check('email').notEmpty().withMessage('The email is required'),
    check('email').isEmail().withMessage('The email must be valid'),
    check('password').notEmpty().withMessage('The password is required'),
    check('email').custom(existsEmail),
    validationResults,
  ],
  usersController.store
);

router.get(
  '/:id',
  [
    validateJWT,
    validateRol,
    check('id').isMongoId().withMessage('The ID is not valid'),
    check('id').custom(existsId),
    validationResults,
  ],
  usersController.show
);

router.put(
  '/:id',
  [
    check('name').notEmpty().withMessage('The name is required'),
    check('lastName').notEmpty().withMessage('The lastname is required'),
    check('email').notEmpty().withMessage('The email is required'),
    check('email').isEmail().withMessage('The email must be valid'),
    check('id').isMongoId().withMessage('The ID is not valid'),
    check('id').custom(existsId),
    check('email').custom(existsEmail),
    validationResults,
  ],
  usersController.update
);

router.delete(
  '/:id',
  [
    check('id').isMongoId().withMessage('The ID is not valid'),
    check('id').custom(existsId),
    validationResults,
  ],
  usersController.destroy
);

module.exports = router;
