const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const index = (req, res) =>
  res.json({
    status: 'ok',
    method: 'index',
  });

const store = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  const salt = bcryptjs.genSaltSync();
  const user = new User({
    name,
    lastName,
    email,
    password: bcryptjs.hashSync(password, salt),
  });

  try {
    await user.save();
  } catch (err) {
    return res.status(500).json({
      status: 'err',
      error: {
        message: 'A problem has ocurred saving the user',
      },
    });
  }

  return res.json({
    status: 'ok',
    data: user,
  });
};

const show = (req, res) =>
  res.json({
    status: 'ok',
    method: 'show',
  });

const update = (req, res) =>
  res.json({
    status: 'ok',
    method: 'update',
  });

const destroy = (req, res) =>
  res.json({
    status: 'ok',
    method: 'destroy',
  });

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
