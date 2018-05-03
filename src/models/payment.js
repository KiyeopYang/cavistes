import mongoose from 'mongoose';

const { Schema } = mongoose;
const Payment = new Schema({
  bankCode: Number,
  bankName: String,
  bankAccount: String,
  nameForPayment: String,
  price: String,
  datetime: Date,
});

const model = mongoose.model('payment', Payment);

export default model;
