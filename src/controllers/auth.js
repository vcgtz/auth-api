const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/auth');
const User = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 'err',
        errors: [{ message: 'Email and/or password are invalid' }],
      });
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        status: 'err',
        errors: [{ message: 'Email and/or password are invalid' }],
      });
    }

    const token = await generateJWT(user.id);

    return res.json({
      status: 'ok',
      token,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'err',
      errors: [{ message: 'A problem has ocurred saving the user' }],
    });
  }
};

module.exports = {
  login,
};
