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
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: 'payment',
  },
  name: String,
  nameForPayment: String,
  phone: String,
  numOfPeople: {
    type: Number,
    default: 1,
  },
  datetime: Date,
  price: Number,
  status: String, //'입금대기', '결제완료', '취소'
  orderMethod: String,
});

const model = mongoose.model('attendance', Attendance);

export default model;
