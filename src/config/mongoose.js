const mongoose = require('mongoose');

const startDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Database Online');
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  startDbConnection,
};
