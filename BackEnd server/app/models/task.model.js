// models/task.model.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: Date,
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event" // Referencing the Event model
  },
  assigneeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Referencing the User model
  }
});

module.exports = mongoose.model("Task", taskSchema);
