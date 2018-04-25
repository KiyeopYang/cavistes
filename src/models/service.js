import mongoose from 'mongoose';

const { Schema } = mongoose;
const Service = new Schema({
  titleImages: {
    type: Array,
    default: [],
  },
  accountBank: String,
  accountNumber: String,
  accountName: String,
});

const model = mongoose.model('service', Service);

export default model;
