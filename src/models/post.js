import mongoose from 'mongoose';

const { Schema } = mongoose;
const Post = new Schema({
  community: {
    type: String,
    required: true,
  },
  account: {
    name: String,
    link: {
      type: Schema.Types.ObjectId,
      ref: 'account',
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  star: {
    type: Number,
    default: 0,
  },
  title: String,
  text: String,
  subPosts: [
    {
      account: {
        name: String,
        link: {
          type: Schema.Types.ObjectId,
          ref: 'account',
          required: true,
        },
      },
      date: {
        type: Date,
        required: true,
        default: new Date(),
      },
      text: String,
    },
  ],
});
const model = mongoose.model('post', Post);

export default model;
