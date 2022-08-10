const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const perPage = 10;

const index = async (req, res) => {
  const page = req.params.page || 1;

  const users = await User.find()
    .limit(perPage)
    .skip((page - 1) * perPage)
    .exec();
  const total = await User.countDocuments();

  return res.json({
    status: 'ok',
    total,
    totalInThisPage: users.length,
    page: +page,
    data: users,
  });
};

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
      errors: [{ message: 'A problem has ocurred saving the user' }],
    });
  }

  return res.json({
    status: 'ok',
    data: user,
  });
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.json({
      status: 'ok',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'err',
      errors: [{ message: 'A problem has ocurred saving the user' }],
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { password, _id, ...newData } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    newData.password = bcryptjs.hashSync(password, salt);
  }

  try {
    const user = await User.findByIdAndUpdate(id, newData, {
      returnDocument: 'after',
    });

    return res.json({
      status: 'ok',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'err',
      errors: [{ message: 'A problem has ocurred saving the user' }],
    });
  }
};

const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, {
      returnDocument: 'after',
    });

    return res.json({
      status: 'ok',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'err',
      errors: [{ message: 'A problem has ocurred saving the user' }],
    });
  }
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
