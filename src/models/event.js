import mongoose from 'mongoose';

const { Schema } = mongoose;
const Event = new Schema({
  title: String,
  price: Number,
  shop: {
    name: String,
    location: String,
    locationDetail: String,
    phone: String,
  },
  subTitle: String,
  maxPeople: Number,
  attendees: {
    type: Array,
    default: [],
  },
  datetimes: [Date],
  images: {
    type: Array,
    default: [{
      path: '/default/img1.jpg',
    }],
  },
  desc: String,
  sponsor: {
    id: String,
    name: String,
    phone: String,
    email: String,
  },
  level: Number,
  replyOn: Boolean,
  reply: Array,
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  refundRule: String,
});

const model = mongoose.model('event', Event);

export default model;
