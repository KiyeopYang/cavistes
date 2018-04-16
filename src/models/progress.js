import mongoose from 'mongoose';

const { Schema } = mongoose;
const Progress = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'account',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  size: {
    isInch: Boolean,
    length: Number,
    girth: Number,
  },
  routine: [{
    name: String,
    minutes: Number,
    set: Number,
  }],
});
const model = mongoose.model('progress', Progress);

export default model;
