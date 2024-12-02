import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const moduleSchema = new mongoose.Schema({
  moduleName: { type: String, required: true },
  videos: [videoSchema],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  modules: [moduleSchema],
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
