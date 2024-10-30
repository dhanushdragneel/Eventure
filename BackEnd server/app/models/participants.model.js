// models/participant.model.js
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Referencing the User model
  },
  EventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event" // Referencing the Event model
  },
  Role: String
});

module.exports = mongoose.model("Participant", participantSchema);