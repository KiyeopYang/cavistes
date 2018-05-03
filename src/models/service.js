import mongoose from 'mongoose';

const { Schema } = mongoose;
const Service = new Schema({
  titleImages: {
    type: Array,
    default: [],
  },
  bankAccount: {
    number: String,
    bank: String,
    bankCode: Number,
    name: String,
  },
});

const model = mongoose.model('service', Service);

export default model;
