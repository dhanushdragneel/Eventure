const Event = require("../models/event.model");
const User = require("../models/user.model"); // Import the User model
const Participant = require("../models/participants.model");
const { participants } = require("../models");
exports.createEvent = async (req, res) => {
  try {
    //to find users object id
    const user = await User.findOne({ username: req.body.userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const eventData = { ...req.body, userID: user._id };
    const event = new Event(eventData);
    await event.save();
    const eventID = event._id;
    const userID = user._id;
    const Role = "organizer";

    // Create a new participant instance
    const participant = new Participant({
      UserID: userID,
      EventID: eventID,
      Role: Role,
    });

    // Save the participant
    await participant.save();

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserEventsByUserID = async (req, res) => {
  try {
    
    const userId = req.params.userId; // Extract the user ID from the request parameters

    const events = await Event.find({ userID: userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateEventById = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEventById = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
