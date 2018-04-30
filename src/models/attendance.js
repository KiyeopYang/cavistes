import mongoose from 'mongoose';

const { Schema } = mongoose;
const Attendance = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'account',
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'event',
  },
  datetime: Date,
  price: Number,
  status: String,
  orderMethod: String,
});

const model = mongoose.model('Attendance', Attendance);

export default model;
