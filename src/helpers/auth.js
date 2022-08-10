const jwt = require('jsonwebtoken');

const generateJWT = (uid) => new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        return reject(new Error('JWT error'));
      }
  
      return resolve(token);
    });
  });

module.exports = {
  generateJWT,
};
