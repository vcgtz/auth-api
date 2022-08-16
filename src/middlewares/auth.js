const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).json({
      status: 'err',
      errors: [{ message: 'Token is missing or invalid' }],
    });
  }

  try {
    const decoded = jwt.verify(req.header('Authorization'), process.env.SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(400).json({
        status: 'err',
        errors: [{ message: 'The user does not exist' }],
      });
    }

    return next();
  } catch (err) {
    return res.status(401).json({
      status: 'err',
      errors: [{ message: 'Token is missing or invalid' }],
    });
  }
};

const validateRol = async (req, res, next) => {
  if (req.user.role !== 'USER_ROLE') {
    return res.status(401).json({
      status: 'err',
      errors: [{ message: 'You do not have permissions' }],
    });
  }

  return next();
};

module.exports = {
  validateJWT,
  validateRol,
};
