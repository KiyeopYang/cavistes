import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const Account = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  birth: {
    type: Date,
  },
  level: {
    type: Number,
    default: 1,
  },
  type: String,
  token: String,
  memo: String,
  confirmed: {
    type: Boolean,
    default: false,
  },
  work: String,
  house: String,
});

Account.pre('validate', async function hashing(next) {
  if (!this.isModified('password')) {
    return next;
  }
  try {
    this.password = await bcrypt.hash(this.password, 8);
    return next();
  } catch (error) {
    return next(error);
  }
});

Account.methods.passwordIsValid = async function passwordIsValid(password){
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};
const model = mongoose.model('account', Account);

export default model;
