const User = require("../models/user");

const existsEmail = async (email, { req }) => {
  const userWithCurrentEmail = await User.findOne({ email }).exec();
  const { id } = req.params;

  if (userWithCurrentEmail && !id) {
    throw new Error('The email already exists');
  }

  if (id) {
    const currentUser = await User.findById(id);

    if (userWithCurrentEmail && currentUser.id !== userWithCurrentEmail.id) {
      throw new Error('The email already exists');
    }
  }
};

module.exports = {
  existsEmail,
};
