const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { formatEmail } = require('../utils/auth');

const findUserById = (id) => User.findById(id);

const findUserByEmail = (email) => User.findOne({ email: formatEmail(email) });

const addUser = async (email, password) => {
  const newUser = new User({ email, password });
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(newUser.password, salt);
  newUser.password = hash;
  const addedUser = await newUser.save();
  return addedUser;
};

module.exports = { findUserById, findUserByEmail, addUser };