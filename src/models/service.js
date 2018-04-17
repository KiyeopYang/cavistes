import mongoose from 'mongoose';

const { Schema } = mongoose;
const Service = new Schema({
  titleImages: Array,
});

const model = mongoose.model('service', Service);

export default model;
