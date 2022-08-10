const { validationResult } = require('express-validator');

const validationResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => ({
      message: err.msg,
    }));

    return res.status(400).json({ status: 'err', errors: messages });
  }

  return next();
};

module.exports = {
  validationResults,
};
