const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
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
