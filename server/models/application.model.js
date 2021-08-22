import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema({
  tuition: {type: mongoose.Schema.ObjectId, ref: 'Tuition'},
  updated: Date,
  applied: {
    type: Date,
    default: Date.now
  },
  tutorName: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  tutorLocation: {
    type: String,
    required: 'Present Location is required'
  },
  tutorPhoneNum: {
    type: String,
    trim: true,
    required: 'Contact number is required'
  },
  gender: {
    type: String,
    trim: true,
    required: 'Gender is required'
  },
  schoolCur: {
    type: String,
    trim: true,
    required: 'School Curriculam is required'
  },
  collegeCur: {
    type: String,
    trim: true,
    required: 'College curriculam is required'
  },
  studyBg: {
    type: String,
    trim: true,
    required: 'Background of study is required'
  },
  universityName: {
    type: String,
  },
  major: {
    type: String,
    trim: true,
  },
  tutor: {type: mongoose.Schema.ObjectId, ref: 'User'},
  lessonStatus: [{
      lesson: {type: mongoose.Schema.ObjectId, ref: 'Lesson'}, 
      complete: Boolean}],
  completed: Date
})

export default mongoose.model('Application', ApplicationSchema)
