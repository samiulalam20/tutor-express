import mongoose from 'mongoose'

const LessonSchema = new mongoose.Schema({
  
  
    
    house: {type: String,
      },
    
    street: {type: String,
      },

    city: {type: String,
      },

})
const Lesson = mongoose.model('Lesson', LessonSchema)
const TuitionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  studentClass: {
    type: String,
    required: "Mention the class of the student currently studying"
  },
  category: {
    type: String,
    required: "Category is required"
  },
  tutorGenderRequired: {
    type: String,
    required: "Tutor Gender selection is required"
  },
  subjects: {
    type: String,
    required: "Subjects is required"
  },
  location: {
    type: String,
    required: "Location of the tuition is required"
  },
  numberOfdays: {
    type: Number,
    required: "Number of days per week is required"
  },
  salary: {
      type: Number,
      required: "Salary is required"
  },
  guardian: {type: mongoose.Schema.ObjectId, ref: 'User'},
  posted: {
    type: Boolean,
    default: false
  },
  lessons: [LessonSchema]
})

export default mongoose.model('Tuition', TuitionSchema)
