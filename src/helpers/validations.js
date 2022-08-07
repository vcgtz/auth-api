const User = require("../models/user");

const existsEmail = async (email) => {
  const user = await User.findOne({ email }).exec();

  if (user) {
    throw new Error('The email already exists');
  }
};

module.exports = {
  existsEmail,
};
