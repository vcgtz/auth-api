const User = require('../models/user');

const existsEmail = async (email, { req }) => {
  const userWithCurrentEmail = await User.findOne({ email }).exec();
  const { id } = req.params;

  if (userWithCurrentEmail && !id) {
    throw new Error('The email already exists');
  }

  if (id) {
    const currentUser = await User.findById(id);

    if (
      userWithCurrentEmail &&
      currentUser &&
      currentUser.id !== userWithCurrentEmail.id
    ) {
      throw new Error('The email already exists');
    }
  }
};

const existsId = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error('The user does not exist');
  }
};

module.exports = {
  existsEmail,
  existsId,
};
