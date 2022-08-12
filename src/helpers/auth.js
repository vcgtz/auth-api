const jwt = require('jsonwebtoken');

const generateJWT = (id) =>
  new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '1m' },
      (err, token) => {
        if (err) {
          return reject(new Error('JWT error'));
        }

        return resolve(token);
      }
    );
  });

module.exports = {
  generateJWT,
};
