const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter task..'],
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please enter task date..'],
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

module.exports.model = mongoose.model('Task', TaskSchema, 'tasks')