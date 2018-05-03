import mongoose from 'mongoose';

const { Schema } = mongoose;
const Notice = new Schema({
  account: Object,
  title: String,
  datetime: Date,
  text: String,
  numOfView: {
    type: Number,
    default: 0,
  },
});

const model = mongoose.model('notice', Notice);

export default model;
