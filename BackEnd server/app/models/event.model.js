// models/event.model.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventID: Number,
  title: String,
  description: String,
  date: Date,
  location: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participant" // Reference to the User model
  }
});

module.exports = mongoose.model("Event", eventSchema);
