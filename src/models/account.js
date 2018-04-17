import mongoose from 'mongoose';

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
  type: String,
  shop: {
    name: String,
    location: String,
    locationDetail: String,
    phone: String,
    accountBank: String,
    accountNumber: String,
    accountName: String,
  },
  token: String,
  confirmed: {
    type: Boolean,
    default: false,
  },
});

Account.pre('save', async function hashing(next) {
  return next();
  // if (!this.isModified('password')) {
  //   return next;
  // }
  // try {
  //   const hash = await bcrypt.hashAsync(this.password, 16.5);
  //   this.password = hash;
  //   return next();
  // } catch (error) {
  //   return next(error);
  // }
});
Account.methods.passwordIsValid = function passwordIsValid(password){
  return password === this.password;
  // try {
  //   return bcrypt.compareAsync(password, this.password);
  // } catch (err) {
  //   throw err;
  // }
};
const model = mongoose.model('account', Account);

export default model;
