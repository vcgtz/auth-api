const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'The lastname is required'],
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'STAFF_ROLE', 'USER_ROLE'],
    default: 'USER_ROLE',
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = model('User', userSchema);
