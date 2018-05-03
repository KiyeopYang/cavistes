import mongoose from 'mongoose';

const { Schema } = mongoose;
const sponsor = new Schema({
  account: Object,
  title: String,
  datetime: Date,
  text: String,
  images: [],
  numOfView: {
    type: Number,
    default: 0,
  },
});

const model = mongoose.model('sponsor', sponsor);

export default model;
