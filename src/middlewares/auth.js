const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).json({
      status: 'err',
      errors: [{ message: 'Token is missing or invalid' }],
    });
  }

  try {
    const decoded = jwt.verify(req.header('Authorization'), process.env.SECRET);

    console.log(decoded);
    return next();
  } catch (err) {
    return res.status(401).json({
      status: 'err',
      errors: [{ message: 'Token is missing or invalid' }],
    });
  }
};

module.exports = {
  validateJWT,
};
